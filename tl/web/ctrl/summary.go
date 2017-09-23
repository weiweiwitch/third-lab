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

type SummaryResp struct {
	Id      int    `json:"id"`
	Summary string `json:"summary"`
}

// 查询summary
type SummaryDeal struct {
}

func (this *SummaryDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	summary := dao.FindSummary(db.DbConn)
	if summary == nil {
		summary = &domain.Summary{Summary: "## SUMMARY"}
		db.DbConn.Create(summary)
	}

	summaryResp := &SummaryResp{
		Id:      summary.ID,
		Summary: summary.Summary,
	}
	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = summaryResp

	c.JSON(http.StatusOK, resp)
}
