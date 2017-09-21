package ctrl

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"net/http"
	"strconv"
	"thirdlab/tl/dao"
	"thirdlab/tl/db"
	"thirdlab/tl/rtcode"
	"thirdlab/tl/web/resp"
	"time"
)

type UpdatePostReq struct {
	ParentId int    `json:"parentId"`
	Title    string `json:"title"`
	PostText string `json:"postText"`
}

type UpdatePostResp struct {
	Id int `json:"id"`
}

// 更新post
type UpdatePostDeal struct {
}

func (this *UpdatePostDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	id, parseErr := strconv.Atoi(c.Param("id"))
	if parseErr != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_ERROR))
		return
	}

	req := &UpdatePostReq{}
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_JSON_CANT_PARSE))
		return
	}

	// 找到目标文章
	post := dao.FindPostById(db.DbConn, id)
	if post == nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.POST_NOT_FOUND))
		return
	}

	// 更新文章内容
	post.ParentId = req.ParentId
	post.Title = req.Title
	post.Post = req.PostText
	post.LastModifiedTime = time.Now()

	db.DbConn.Save(post)

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = &UpdatePostResp{
		Id: post.ID,
	}
	c.JSON(http.StatusOK, resp)
}
