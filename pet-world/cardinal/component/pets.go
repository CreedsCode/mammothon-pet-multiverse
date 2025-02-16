package component

type Pet struct {
	ID        int      `json:"id"`
	PetName   string   `json:"petName"`
	Health    int      `json:"health"`    // 0-100
	Hunger    float64  `json:"hunger"`    // 0-100
	Hygiene   float64  `json:"hygiene"`   // 0-100
	Happiness float64  `json:"happiness"` // 0-100
	IsSlumber bool     `json:"isSlumber"`
	HatchDate int64    `json:"hatchDate"` // Unix timestamp
	DNA       string   `json:"dna"`
	ParentIDs []int    `json:"parentIds"`
	OwnerID   string   `json:"ownerId"`   // Reference to the owner
	SitterIDs []string `json:"sitterIds"` // Optional pet sitter reference
}

func (Pet) Name() string {
	return "Pet"
}
