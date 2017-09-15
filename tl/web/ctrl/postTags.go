package ctrl

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"net/http"
	"sort"
	"strings"
	"thirdlab/tl/dao"
	"thirdlab/tl/db"
	"thirdlab/tl/rtcode"
	"thirdlab/tl/web/resp"
)

type PostTagResp struct {
	Id      int    `json:"id"`
	TagName string `json:"tagName"`
	Num     int    `json:"num"`

	ParentTagId int `json:"parentTagId"`

	Nodes []*PostTagResp `json:"nodes"`
}

type PostTagContainer struct {
	Tree []*PostTagResp
	List []*PostTagResp
}

// 查询所有的tag
type PostTagsDeal struct {
}

func (this *PostTagsDeal) DealReqWithSession(session *sessions.Session, c echo.Context) {
	postTags := dao.FindPostTags(db.DbConn)

	// 建立临时表
	tmps := make([]*PostTagResp, 0)
	tmpMap := make(map[int]*PostTagResp)
	for _, eachPostTag := range postTags {
		postTagResp := &PostTagResp{
			Id:          eachPostTag.ID,
			TagName:     eachPostTag.Tag,
			ParentTagId: eachPostTag.ParentTagId,
			Nodes:       make([]*PostTagResp, 0),
		}
		tmps = append(tmps, postTagResp)
		tmpMap[eachPostTag.ID] = postTagResp
	}

	// 整理出根元素
	roots := make([]*PostTagResp, 0)
	for _, eachResp := range tmps {
		parentResp, parentExist := tmpMap[eachResp.ParentTagId]
		if eachResp.ParentTagId == 0 {
			roots = append(roots, eachResp)
		} else if !parentExist {
			roots = append(roots, eachResp)
		} else {
			parentResp.Nodes = append(parentResp.Nodes, eachResp)
		}
	}

	// 对最上层排序
	sort.Slice(roots, func(a, b int) bool {
		aResp := roots[a]
		bResp := roots[b]
		if strings.Compare(aResp.TagName, bResp.TagName) < 0 {
			return false
		} else {
			return true
		}
	})

	container := &PostTagContainer{
		Tree: roots,
		List: tmps,
	}
	resp := resp.NewTlBaseResp(rtcode.SUCCESS)
	resp.Data = container
	c.JSON(http.StatusOK, resp)
}
