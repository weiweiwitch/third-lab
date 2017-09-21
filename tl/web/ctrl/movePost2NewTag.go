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
	"thirdlab/tl/domain"
)

type Move2NewTagResp struct {
	Id int `json:"id"`
}

// 更新post
type Move2NewTagDeal struct {
}

func (this *Move2NewTagDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	id, parseIdErr := strconv.Atoi(c.Param("id"))
	tagId, parseTagIdErr := strconv.Atoi(c.Param("tagId"))
	if parseIdErr != nil || parseTagIdErr != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_ERROR))
		return
	}


	if tagId != 0 {
		postTag := dao.FindPostTagById(db.DbConn, tagId)
		if postTag == nil {
			c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.POST_TAG_NOT_FOUND))
			return
		}
	}

	// 找到目标文章以及所有的子集文章
	post := dao.FindPostById(db.DbConn, id)
	if post == nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.POST_NOT_FOUND))
		return
	}

	// 更新
	post.TagId = tagId
	db.DbConn.Save(post)

	subPosts := make([]*domain.Post, 0)
	subPosts = searchPostAndSubPosts(subPosts, post.ID)
	for _, eachSubPost := range subPosts {
		eachSubPost.TagId = tagId
		db.DbConn.Save(eachSubPost)
	}

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = &UpdatePostResp{
		Id: post.ID,
	}
	c.JSON(http.StatusOK, resp)
}

func searchPostAndSubPosts(posts []*domain.Post, postId int) []*domain.Post {
	subPosts := dao.FindPostsByParentPostId(db.DbConn, postId)
	posts = append(posts, subPosts...)
	for _, eachSubPost:= range subPosts {
		posts = searchPostAndSubPosts(posts, eachSubPost.ID)
	}

	return posts
}