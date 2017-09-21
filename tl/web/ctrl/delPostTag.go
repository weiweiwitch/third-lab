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

// 删除post
type DelPostTagDeal struct {
}

func (this *DelPostTagDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	id, parseErr := strconv.Atoi(c.Param("id"))
	if parseErr != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_ERROR))
		return
	}

	// 找到目标标签
	postTag := dao.FindPostTagById(db.DbConn, id)
	if postTag == nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.POST_TAG_NOT_FOUND))
		return
	}

	// 目标标签必须没有子标签
	subTags := dao.FindPostTagsByParentTagId(db.DbConn, id)
	if len(subTags) > 0 {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.CANT_DEL_PARENT_TAG))
		return
	}

	// 目标标签必须没有文章
	posts := dao.FindPostsByTagId(db.DbConn, id)
	if len(posts) > 0 {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.CANT_DEL_NO_EMPTY_TAG))
		return
	}

	// 删除
	db.DbConn.Delete(postTag)

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	c.JSON(http.StatusOK, resp)
}
