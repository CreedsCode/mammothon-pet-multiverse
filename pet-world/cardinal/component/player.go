package component

type Player struct {
	Nickname string `json:"nickname"`
	ID       string `json:"id"`
}

func (Player) Name() string {
	return "Player"
}
