package ctrl

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"net/http"
	"strconv"
	"thirdlab/tl/dao"
	"thirdlab/tl/db"
	"thirdlab/tl/domain"
	"thirdlab/tl/rtcode"
	"thirdlab/tl/web/resp"
)

type SpecTagPostsResp struct {
	TagId int            `json:"tagId"`
	Posts []*TagPostResp `json:"posts"`
}

type TagPostResp struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	ParentId int    `json:"parentId"`
	Status   int    `json:"status"`
}

// 查询所有的post
type QueryTagPostDeal struct {
}

func (this *QueryTagPostDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	tagId, parseErr := strconv.Atoi(c.Param("tagId"))
	if parseErr != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_ERROR))
		return
	}

	posts := make([]*domain.Post, 0)
	if tagId != 0 {
		// 找到这个tag的所有关系，从中提取出post的id
		relations := dao.FindPostTagRelationByTagId(db.DbConn, tagId)
		postIds := make([]int, 0)
		for _, eachRelation := range relations {
			postIds = append(postIds, eachRelation.PostId)
		}

		// 查询出所有的post
		posts = dao.FindPostsByIds(db.DbConn, postIds)

	} else {
		posts = dao.FindPostsUntagged(db.DbConn)
	}

	specTagPostsResp := &SpecTagPostsResp{
		TagId: tagId,
		Posts: make([]*TagPostResp, 0),
	}
	for _, eachPost := range posts {
		tagPostResp := &TagPostResp{
			Id:       eachPost.ID,
			Title:    eachPost.Title,
			ParentId: eachPost.ParentId,
			Status:   eachPost.Status,
		}
		specTagPostsResp.Posts = append(specTagPostsResp.Posts, tagPostResp)
	}

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = specTagPostsResp

	c.JSON(http.StatusOK, resp)
}
