package resp

type TlBaseResp struct {
	Rt int

	Data interface{}
}

func NewTlBaseResp(rt int) *TlBaseResp {
	resp := &TlBaseResp{
		Rt: rt,
	}

	return resp
}
