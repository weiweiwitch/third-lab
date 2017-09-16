package resp

type TlBaseResp struct {
	Rt int `json:"rt"`

	Data interface{} `json:"data"`
}

func NewTlBaseResp(rt int) *TlBaseResp {
	resp := &TlBaseResp{
		Rt: rt,
	}

	return resp
}
