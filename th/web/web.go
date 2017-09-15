package web

import (
	"encoding/gob"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"net/http"
	"strconv"
	"thirdlab/th/data"
)

func StartServer(port int) {
	go start(port)
}

func start(port int) {
	// 获取路由
	router := echo.New()

	router.Use(middleware.Recover())

	// session支持
	//store, _ := sessions.NewRedisStore(50, "tcp", "127.0.0.1:6379", "", []byte("secret"))
	//router.Use(sessions.Sessions("mysession", store))
	router.Use(Middleware(sessions.NewCookieStore([]byte("secret"))))

	gob.Register(&data.ThData{})

	// 静态目录
	router.Static("/static", "./static/react/static/dist/")

	router.GET("/", func(c echo.Context) error {
		c.Redirect(http.StatusMovedPermanently, "/static/")
		return nil
	})

	// 下面是功能的路由
	version1 := router.Group("/v1")
	yzgmapi := router.Group("")

	{
		// 创建gm账号
		//RegisterPost(version1, "/createAccount", mcontroller.NewAuthedActionDeal(new(maccount.CreateAccountDeal)))
	}

	// 运行服务器
	httpPortStr := ":" + strconv.Itoa(port)
	router.Start(httpPortStr)
}
