package comm

import (
	"github.com/Sirupsen/logrus"
	"os"
	"strconv"
)

// 日志
var Log = &LogStd{
	logEntry: logrus.WithFields(logrus.Fields{}),

	ignoreFile:   true,
	fileLogEntry: logrus.New().WithFields(logrus.Fields{}),
}

type LogStd struct {
	lv logrus.Level // 当前的日志等级

	logEntry *logrus.Entry

	ignoreFile   bool
	fileLogEntry *logrus.Entry
}

// 初始化日志
func (logStd *LogStd) InitLog() {
	logrus.SetLevel(logrus.DebugLevel)
	logStd.fileLogEntry.Logger.Level = logrus.DebugLevel
	logStd.lv = logrus.DebugLevel
}

// 获取日志等级的接口
type LogLvReader interface {
	ReadLogLv() string
}

// 调整日志等级
func (logStd *LogStd) ChgLogLv(logLvReader LogLvReader) {
	logLv := logLvReader.ReadLogLv()
	if logLv == "DEBUG" {
		logrus.SetLevel(logrus.DebugLevel)
		logStd.fileLogEntry.Logger.Level = logrus.DebugLevel
		logStd.lv = logrus.DebugLevel
	} else if logLv == "INFO" {
		logrus.SetLevel(logrus.InfoLevel)
		logStd.fileLogEntry.Logger.Level = logrus.InfoLevel
		logStd.lv = logrus.InfoLevel
	} else if logLv == "WARN" {
		logrus.SetLevel(logrus.WarnLevel)
		logStd.fileLogEntry.Logger.Level = logrus.WarnLevel
		logStd.lv = logrus.WarnLevel
	} else if logLv == "ERROR" {
		logrus.SetLevel(logrus.ErrorLevel)
		logStd.fileLogEntry.Logger.Level = logrus.ErrorLevel
		logStd.lv = logrus.ErrorLevel
	} else if logLv == "FATEL" {
		logrus.SetLevel(logrus.FatalLevel)
		logStd.fileLogEntry.Logger.Level = logrus.FatalLevel
		logStd.lv = logrus.FatalLevel
	}

	// 日志级别变更提示信息
	Log.Info("日志级别被设置为：%s", logLv)
}

// 日志输出到文件
func (logStd *LogStd) Output2File(suffix int) {
	filename := "log/log_" + strconv.Itoa(suffix) + ".log"
	f, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		Log.Error("日志重定向到文件 失败：%s", err.Error())
		return
	}

	logStd.fileLogEntry.Logger.Out = f
	logStd.ignoreFile = false

	Log.Info("日志重定向到文件 成功：%s", filename)
}

func (this *LogStd) GetLv() logrus.Level {
	return this.lv
}

func (this *LogStd) Debug(format string, args ...interface{}) {
	if this.lv < logrus.DebugLevel {
		return
	}

	this.logEntry.Debugf(format, args...)
	if this.ignoreFile == false {
		this.fileLogEntry.Debugf(format, args...)
	}
}

func (this *LogStd) Info(format string, args ...interface{}) {
	if this.lv < logrus.InfoLevel {
		return
	}

	this.logEntry.Infof(format, args...)
	if this.ignoreFile == false {
		this.fileLogEntry.Infof(format, args...)
	}
}

func (this *LogStd) Warning(format string, args ...interface{}) {
	if this.lv < logrus.WarnLevel {
		return
	}

	this.logEntry.Warnf(format, args...)
	if this.ignoreFile == false {
		this.fileLogEntry.Warnf(format, args...)
	}
}

func (this *LogStd) Error(format string, args ...interface{}) {
	if this.lv < logrus.ErrorLevel {
		return
	}

	this.logEntry.Errorf(format, args...)
	if this.ignoreFile == false {
		this.fileLogEntry.Errorf(format, args...)
	}
}

func (this *LogStd) Fatal(format string, args ...interface{}) {
	if this.lv < logrus.FatalLevel {
		return
	}

	this.logEntry.Fatalf(format, args...)
	if this.ignoreFile == false {
		this.fileLogEntry.Fatalf(format, args...)
	}
}
