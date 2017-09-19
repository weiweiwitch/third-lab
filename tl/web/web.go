package web

import (
	"encoding/gob"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"net/http"
	"strconv"
	"thirdlab/tl/data"
	"thirdlab/tl/web/ctrl"
)

func StartServer(port int) {
	go start(port)
}

func start(port int) {
	// 获取路由
	router := echo.New()

	router.Use(middleware.Recover())

	// session支持
	router.Use(Middleware(sessions.NewCookieStore([]byte("secret"))))

	gob.Register(&data.ThData{})

	// 静态目录
	router.Static("/static", "./static/dist/")

	router.GET("/", func(c echo.Context) error {
		c.Redirect(http.StatusMovedPermanently, "/static/")
		return nil
	})

	// 下面是功能的路由
	api := router.Group("/api")

	{
		// 查询所有的post
		RegisterGet(api, "/posts", NewSessionActionDeal(new(ctrl.PostsDeal)))

		// 根据条件查询文章
		RegisterGet(api, "/whichpost", NewSessionActionDeal(new(ctrl.QuerySomePostDeal)))

		// 获取特定文章
		RegisterGet(api, "/posts/:id", NewSessionActionDeal(new(ctrl.QuerySpecPostDeal)))

		// 查询特定tag的文章
		RegisterGet(api, "/tags/:tagId/posts", NewSessionActionDeal(new(ctrl.QueryTagPostDeal)))

		// 添加post
		RegisterPost(api, "/posts", NewSessionActionDeal(new(ctrl.AddPostDeal)))

		// 更新post
		RegisterPut(api, "/posts/:id", NewSessionActionDeal(new(ctrl.UpdatePostDeal)))

		// 删除post
		RegisterDel(api, "/posts/:id", NewSessionActionDeal(new(ctrl.DelPostsDeal)))

		// 查询所有的tag
		RegisterGet(api, "/tags", NewSessionActionDeal(new(ctrl.PostTagsDeal)))
	}

	// 运行服务器
	httpPortStr := ":" + strconv.Itoa(port)
	router.Start(httpPortStr)
}
