package ctrl

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"net/http"
	"thirdlab/tl/dao"
	"thirdlab/tl/db"
	"thirdlab/tl/domain"
	"thirdlab/tl/rtcode"
	"thirdlab/tl/web/resp"
)

type AddTagReq struct {
	ParentTagId int    `json:"parentTagId"`
	Name        string `json:"name"`
}

// 添加标签
type AddTagDeal struct {
}

func (this *AddTagDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	req := &AddTagReq{}
	err := c.Bind(req)
	if err != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_JSON_CANT_PARSE))
		return
	}

	parentTagId := req.ParentTagId
	if parentTagId != 0 {
		parentTag := dao.FindPostTagById(db.DbConn, parentTagId)
		if parentTag == nil {
			c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.POST_TAG_NOT_FOUND))
			return
		}
	}

	// 保存标签
	postTag := &domain.PostTag{
		Tag:         req.Name,
		ParentTagId: parentTagId,
	}
	db.DbConn.Create(postTag)

	// 将只属于父标签的文章迁移到子标签中
	if parentTagId != 0 {
		newTagId := postTag.ID
		parentPosts := dao.FindPostsByTagId(db.DbConn, parentTagId)
		for _, eachParentPost := range parentPosts {
			eachParentPost.TagId = newTagId
			db.DbConn.Save(eachParentPost)
		}
	}

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	c.JSON(http.StatusOK, resp)
}
