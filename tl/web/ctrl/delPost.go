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
type DelPostsDeal struct {
}

func (this *DelPostsDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	// 解析参数
	id, parseErr := strconv.Atoi(c.Param("id"))
	if parseErr != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_ERROR))
		return
	}

	// 找到目标文章
	post := dao.FindPostById(db.DbConn, id)
	if post == nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.POST_NOT_FOUND))
		return
	}

	// 删除
	db.DbConn.Delete(post)

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	c.JSON(http.StatusOK, resp)
}
