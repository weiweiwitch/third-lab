package ctrl

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"net/http"
	"strings"
	"thirdlab/tl/dao"
	"thirdlab/tl/db"
	"thirdlab/tl/rtcode"
	"thirdlab/tl/web/resp"
)

type PostPositionResp struct {
	PostInfos []*PostInfoResp `json:"postInfos"`
}

type PostInfoResp struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
}

// 查询所有的post
type QuerySomePostDeal struct {
}

func (this *QuerySomePostDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	postParam := c.QueryParam("postParam")
	if strings.TrimSpace(postParam) == "" {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_ERROR))
		return
	}

	posts := dao.FindPostsByTitle(db.DbConn, postParam)

	postPositionResp := &PostPositionResp{
		PostInfos: make([]*PostInfoResp, 0),
	}
	for _, eachPost := range posts {
		postInfo := &PostInfoResp{
			Id:    eachPost.ID,
			Title: eachPost.Title,
		}
		postPositionResp.PostInfos = append(postPositionResp.PostInfos, postInfo)
	}

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = postPositionResp

	c.JSON(http.StatusOK, resp)
}
