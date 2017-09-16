package main

import (
	"thirdlab/tl/cfg"
	"thirdlab/tl/comm"
	"thirdlab/tl/db"
	"thirdlab/tl/web"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	// 初始化日志，默认是DEBUG级别，这样方便输出
	// 下面加载完配置后，会立即变更！
	comm.Log.InitLog()

	// 初始化配置
	jsonConfig, cfgErr := cfg.InitConfig()
	if cfgErr != nil {
		comm.Log.Fatal("配置加载失败", cfgErr)
		return
	}

	// 调整日志等级
	comm.Log.ChgLogLv(jsonConfig)

	// 如果需要，重建数据库结构
	if jsonConfig.CreateTable != 0 {
		createDbErr := db.RebuildDatabase(jsonConfig)
		if createDbErr != nil {
			comm.Log.Fatal("数据库重建失败", cfgErr)
			return
		}

		comm.Log.Info("数据库重建模式, 已完成, 退出")
		return
	}

	// 初始化数据库
	user, pwd, host, port, dbName := jsonConfig.DbUser, jsonConfig.DbPassword, jsonConfig.DbHost, jsonConfig.DbPort, jsonConfig.DbName
	dbConn, errMySqlInit := db.InitMysqlConn(user, pwd, host, port, dbName)
	if errMySqlInit != nil {
		comm.Log.Error("初始化MySQL失败: %s", errMySqlInit.Error())
		return
	}
	db.DbConn = dbConn
	comm.Log.Info("数据库连接成功")

	// 启动http服务器
	web.StartServer(jsonConfig.HttpPort)
	comm.Log.Info("http服务启动完毕")

	termWait := make(chan int, 1)
	go waitSignal(termWait)

	// 等待进程的退出
	mustExist := false
	for {
		if mustExist {
			break
		}

		select {
		case <-termWait:
			comm.Log.Info("开始退出主协程：因接收到退出信号")
			mustExist = true
		}
	}
}

func waitSignal(termWait chan int) {
	comm.Log.Info("等待接收终止程序信号中 >>>>>> ")

	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, os.Interrupt, os.Kill, syscall.SIGTERM)

	//等待退出程序的信号
	sig := <-sigs
	comm.Log.Info("接收到终止程序的信号 '%s' .", sig)

	// 发送退出标记
	termWait <- 1
}

