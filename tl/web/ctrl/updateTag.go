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

type UpdateTagReq struct {
	ParentTagId int    `json:"parentTagId"`
	Name        string `json:"name"`
}

type UpdateTagResp struct {
	Id int `json:"id"`
}

// 更新tag
type UpdateTagDeal struct {
}

func (this *UpdateTagDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	id, parseErr := strconv.Atoi(c.Param("id"))
	if parseErr != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_ERROR))
		return
	}

	req := &UpdateTagReq{}
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_JSON_CANT_PARSE))
		return
	}

	// 找到目标文章
	tag := dao.FindPostTagById(db.DbConn, id)
	if tag == nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.POST_TAG_NOT_FOUND))
		return
	}

	// 更新Tag
	tag.ParentTagId = req.ParentTagId
	tag.Tag = req.Name

	db.DbConn.Save(tag)

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = &UpdateTagResp{
		Id: tag.ID,
	}
	c.JSON(http.StatusOK, resp)
}
