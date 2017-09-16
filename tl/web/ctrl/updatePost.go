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

type UpdatePostReq struct {
	ParentId int      `json:"parentId"`
	Title    string   `json:"title"`
	PostText string   `json:"postText"`
	Tags     []string `json:"tags"`
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

	// 更新tag
	postTags := dao.FindPostTags(db.DbConn)
	existTagStrMap := make(map[string]*domain.PostTag)
	existTagIdMap := make(map[int]*domain.PostTag)
	for _, eachPostTag := range postTags {
		existTagStrMap[eachPostTag.Tag] = eachPostTag
		existTagIdMap[eachPostTag.ID] = eachPostTag
	}

	tagByPostIdMap := make(map[int]*domain.PostTag)
	for _, eachTagStr := range req.Tags {
		existTag, tagExist := existTagStrMap[eachTagStr]
		if !tagExist {
			existTag := &domain.PostTag{
				Tag:         eachTagStr,
				ParentTagId: 0,
			}
			db.DbConn.Create(existTag)

			existTagStrMap[existTag.Tag] = existTag
			existTagIdMap[existTag.ID] = existTag
		}
		tagByPostIdMap[existTag.ID] = existTag
	}

	// 更新关系
	ownTagRelationMap := make(map[int]*domain.PostTagRelation)
	existRelations := dao.FindPostTagRelationByPostId(db.DbConn, id)
	for _, eachRelation := range existRelations {
		ownTagId := eachRelation.TagId
		_, tagExist := tagByPostIdMap[ownTagId]
		if !tagExist {
			db.DbConn.Delete(eachRelation)
		} else {
			ownTagRelationMap[ownTagId] = eachRelation
		}
	}
	for _, ownTag := range tagByPostIdMap {
		existRelation, relationExist := ownTagRelationMap[ownTag.ID]
		if relationExist {
			continue
		}

		existRelation = &domain.PostTagRelation{
			PostId: id,
			TagId:  ownTag.ID,
		}
		db.DbConn.Create(existRelation)
		ownTagRelationMap[ownTag.ID] = existRelation
	}

	if len(ownTagRelationMap) == 0 {
		post.NoTags = 0
	} else {
		post.NoTags = 1
	}
	db.DbConn.Save(post)

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = &UpdatePostResp{
		Id: post.ID,
	}
	c.JSON(http.StatusOK, resp)
}
