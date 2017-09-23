package ctrl

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"net/http"
	"thirdlab/tl/dao"
	"thirdlab/tl/db"
	"thirdlab/tl/rtcode"
	"thirdlab/tl/web/resp"
)

type PostResp struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	ParentId int    `json:"parentId"`
	Status   int    `json:"status"`
	TagId    int    `json:"tagId"`
}

// 查询所有的post
type PostsDeal struct {
}

func (this *PostsDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	posts := dao.FindPosts(db.DbConn)

	postResps := make([]*PostResp, 0, len(posts))
	for _, eachPost := range posts {
		postResp := &PostResp{
			Id:       eachPost.ID,
			Title:    eachPost.Title,
			ParentId: eachPost.ParentId,
			Status:   eachPost.Status,
			TagId:    eachPost.TagId,
		}
		postResps = append(postResps, postResp)
	}

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = postResps

	c.JSON(http.StatusOK, resp)
}
