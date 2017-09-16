package ctrl

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"net/http"
	"thirdlab/tl/data"
	"thirdlab/tl/db"
	"thirdlab/tl/domain"
	"thirdlab/tl/rtcode"
	"thirdlab/tl/web/resp"
	"time"
)

type AddPostReq struct {
	ParentId int    `json:"parentId"`
	Title    string `json:"title"`
	PostText string `json:"postText"`
}

// 添加post
type AddPostDeal struct {
}

func (this *AddPostDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	req := &AddPostReq{}
	err := c.Bind(req)
	if err != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_JSON_CANT_PARSE))
		return
	}

	// 保存文章
	post := &domain.Post{
		ParentId:         req.ParentId,
		Title:            req.Title,
		Post:             req.PostText,
		CreateTime:       time.Now(),
		LastModifiedTime: time.Now(),
		Status:           data.PREPARE,
	}
	db.DbConn.Create(post)

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	c.JSON(http.StatusOK, resp)
}
