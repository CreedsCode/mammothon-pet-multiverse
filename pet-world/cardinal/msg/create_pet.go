package msg

type CreatePetMsg struct {
	InitiatorPlayerID string `json:"initiatorPlayerId"`
	EggTheme          string `json:"eggTheme"`
}

type CreatePetMsgResult struct {
	Success bool   `json:"success"`
	PetID   int    `json:"petId"`
	PetName string `json:"petName"`
}
