package db

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"thirdlab/tl/cfg"
	"thirdlab/tl/comm"
)

var DbConn *gorm.DB

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

	DbConn, err = gorm.Open("mysql", dbUrl)
	if err != nil {
		return err
	}

	DbConn.DB().SetMaxIdleConns(10)
	DbConn.DB().SetMaxOpenConns(100)

	return nil
}