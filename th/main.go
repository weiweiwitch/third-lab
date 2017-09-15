package th

import (
	"thirdlab/th/cfg"
	"thirdlab/th/comm"
	"thirdlab/th/db"
	"thirdlab/th/web"
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

	// 初始化数据库
	errMySqlInit := db.InitMysqlConn(jsonConfig)
	if errMySqlInit != nil {
		comm.Log.Error("初始化MySQL失败: %s", errMySqlInit.Error())
		return
	}
	comm.Log.Info("数据库连接测试成功")

	// 启动http服务器
	web.StartServer(jsonConfig.HttpPort)
	comm.Log.Info("http服务启动完毕")
}
