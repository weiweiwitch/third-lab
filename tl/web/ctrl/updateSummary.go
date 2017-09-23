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

type UpdateSummaryReq struct {
	Summary string `json:"summary"`
}

type UpdateSummaryResp struct {
	Id int `json:"id"`
}

// 更新post
type UpdateSummaryDeal struct {
}

func (this *UpdateSummaryDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {

	req := &UpdateSummaryReq{}
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.PARAM_JSON_CANT_PARSE))
		return
	}

	// 找到Summary
	summary := dao.FindSummary(db.DbConn)
	if summary == nil {
		c.JSON(http.StatusOK, resp.NewTlBaseResp(rtcode.SUMMARY_NOT_FOUND))
		return
	}

	// 更新Summary
	summary.Summary = req.Summary
	db.DbConn.Save(summary)

	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = &UpdateSummaryResp{
		Id: summary.ID,
	}
	c.JSON(http.StatusOK, resp)
}
