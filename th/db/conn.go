package db

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"thirdlab/th/cfg"
	"thirdlab/th/comm"
)

// 初始化数据库连接
func InitMysqlConn(jsonConfig *cfg.JsonConfig) (err error) {
	dbUrl := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		jsonConfig.DbUser,
		jsonConfig.DbPassword,
		jsonConfig.DbHost,
		jsonConfig.DbPort,
		jsonConfig.DbName,
	)
	comm.Log.Debug("数据库连接：%s", dbUrl)

	dbConn, err := gorm.Open("mysql", dbUrl)
	if err != nil {
		return err
	}

	dbConn.DB().SetMaxIdleConns(10)
	dbConn.DB().SetMaxOpenConns(100)

	return nil
}
