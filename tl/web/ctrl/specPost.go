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
)

type PostDetailResp struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	PostText string `json:"postText"`

	ParentId int `json:"parentId"`
	Status   int `json:"status"`
	TagId    int `json:"tagId"`
}

type PostDetailTagResp struct {
	Id      int    `json:"id"`
	TagName string `json:"tagName"`
}

// 查询所有的post
type QuerySpecPostDeal struct {
}

func (this *QuerySpecPostDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	id, parseErr := strconv.Atoi(c.Param("id"))
	if parseErr != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_ERROR))
		return
	}

	post := dao.FindPostById(db.DbConn, id)
	if post == nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.POST_NOT_FOUND))
		return
	}

	detail := &PostDetailResp{
		Id:       post.ID,
		Title:    post.Title,
		PostText: post.Post,
		ParentId: post.ParentId,
		Status:   post.Status,
		TagId:    post.TagId,
	}

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = detail

	c.JSON(http.StatusOK, resp)
}
