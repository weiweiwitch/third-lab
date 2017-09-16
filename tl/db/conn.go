package db

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"thirdlab/tl/comm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DbConn *gorm.DB

// 初始化数据库连接
func InitMysqlConn(user, password, host string, port int, dbName string) (*gorm.DB, error) {
	dbUrl := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user,
		password,
		host,
		port,
		dbName,
	)
	comm.Log.Debug("数据库连接：%s", dbUrl)

	dbConn, err := gorm.Open("mysql", dbUrl)
	if err != nil {
		return nil, err
	}

	dbConn.DB().SetMaxIdleConns(10)
	dbConn.DB().SetMaxOpenConns(100)

	return dbConn, nil
}
