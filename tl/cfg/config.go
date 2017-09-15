package cfg

import (
	"encoding/json"
	"io/ioutil"
	"thirdlab/th/comm"
)

// 配置文件
type JsonConfig struct {
	HttpPort    int    `json:"httpPort"`    // 端口号
	LogLv       string `json:"logLv"`       // 日志级别
	CreateTable int    `json:"createTable"` // 重建数据库
	GormLogLv   int    `json:"gormLogLv"`
	DbHost      string `json:"dbhost"`
	DbPort      int    `json:"dbport"`
	DbName      string `json:"dbname"`
	DbUser      string `json:"dbuser"`
	DbPassword  string `json:"dbpassword"`
}

func (this JsonConfig) ReadLogLv() string {
	return this.LogLv
}

// 初始化配置
func InitConfig() (*JsonConfig, error) {
	config, err := ioutil.ReadFile("cfg/config.json")
	if err != nil {
		comm.Log.Error("读取配置文件 config.json 失败")
		return nil, err
	}

	// 反序列化
	jsonConfig := &JsonConfig{}
	err = json.Unmarshal(config, jsonConfig)
	if err != nil {
		comm.Log.Error("解析配置文件 config.json 失败")
		return nil, err
	}

	comm.Log.Info("配置信息:%#v", jsonConfig)

	return jsonConfig, nil
}
