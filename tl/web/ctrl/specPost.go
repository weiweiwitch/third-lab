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

	Tags []*PostDetailTagResp `json:"tags"`
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
		Tags:     make([]*PostDetailTagResp, 0),
	}

	relations := dao.FindPostTagRelationByPostId(db.DbConn, id)
	tagIds := make([]int, 0, len(relations))
	for _, eachRelation := range relations {
		tagIds = append(tagIds, eachRelation.TagId)
	}
	if len(tagIds) > 0 {
		tags := dao.FindPostTagByTagIds(db.DbConn, tagIds)
		if len(tags) > 0 {
			for _, eachPostTag := range tags {
				tagResp := &PostDetailTagResp{
					Id:      eachPostTag.ID,
					TagName: eachPostTag.Tag,
				}
				detail.Tags = append(detail.Tags, tagResp)
			}
		}
	}

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = detail

	c.JSON(http.StatusOK, resp)
}
