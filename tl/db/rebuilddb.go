package db

import (
	"github.com/jinzhu/gorm"

	"thirdlab/tl/cfg"
	"thirdlab/tl/comm"
	"thirdlab/tl/domain"
)

// 重建数据库
func RebuildDatabase(jsonConfig *cfg.JsonConfig) error {
	comm.Log.Info("准备删除可能存在的目标数据库：%v，并重新创建！", jsonConfig.DbName)

	// 准备无差别数据库连接
	user, pwd, host, port, dbName := jsonConfig.DbUser, jsonConfig.DbPassword, jsonConfig.DbHost, jsonConfig.DbPort, jsonConfig.DbName
	dbPrepareConn, prepareErr := InitMysqlConn(user, pwd, host, port, dbName)
	if prepareErr != nil {
		comm.Log.Error("无法连接到数据库：" + prepareErr.Error())
		return prepareErr
	}

	// 创建数据库
	dbPrepareConn.Exec("DROP DATABASE IF EXISTS " + dbName + " ;")
	dbPrepareConn.Exec("CREATE DATABASE IF NOT EXISTS " + dbName + " ;")

	comm.Log.Info("数据库删除完毕：%v，并且重新创建成功！", dbName)

	// 准备数据库连接
	targetDbConn, err := InitMysqlConn(user, pwd, host, port, dbName)
	if err != nil {
		// 无法连接数据库
		comm.Log.Error("无法连接到数据库：" + err.Error())
		return err
	}

	// 创建各个表，并插入初始数据
	createDbErr := createTables(targetDbConn)
	if createDbErr != nil {
		comm.Log.Info("建表失败了 !")
		return createDbErr
	}

	return nil
}

// 创建数据库
func createTables(dbConn *gorm.DB) error {
	dbConn.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4").CreateTable(&domain.Post{})
	dbConn.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4").CreateTable(&domain.PostTag{})
	dbConn.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4").CreateTable(&domain.Summary{})

	return nil
}
