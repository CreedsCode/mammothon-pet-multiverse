package component

type PetsState struct {
	PetsInSlumberCount int `json:"petsInSlumberCount"`
}

func (PetsState) Name() string {
	return "PetsState"
}
