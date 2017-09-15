package web

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"thirdlab/th/comm"
)

type BaseAction interface {
	DealReq(c echo.Context) error
}

type SessionAction interface {
	DealReqWithSession(session *sessions.Session, c echo.Context)
}

type SessionActionDeal struct {
	sessionAction SessionAction
}

func NewSessionActionDeal(sessionAction SessionAction) *SessionActionDeal {
	deal := &SessionActionDeal{
		sessionAction: sessionAction,
	}
	return deal
}

func (this *SessionActionDeal) DealReq(c echo.Context) error {
	sess, _ := Get("session", c)
	comm.Log.Debug("session - %v", sess)

	this.sessionAction.DealReqWithSession(sess, c)

	return nil
}

func RegisterGet(routerGroup *echo.Group, path string, dealReq BaseAction) {
	routerGroup.GET(path, dealReq.DealReq)
}

func RegisterPost(routerGroup *echo.Group, path string, dealReq BaseAction) {
	routerGroup.POST(path, dealReq.DealReq)
}
