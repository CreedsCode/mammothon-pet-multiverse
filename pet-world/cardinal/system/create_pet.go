package system

import (
	"fmt"
	"time"

	"pkg.world.dev/world-engine/cardinal"

	comp "pet-world/component"
	"pet-world/msg"
)

// CreatePetSystem handles pet creation requests
func CreatePetSystem(world cardinal.WorldContext) error {
	return cardinal.EachMessage[msg.CreatePetMsg, msg.CreatePetMsgResult](
		world,
		func(tx cardinal.TxData[msg.CreatePetMsg]) (msg.CreatePetMsgResult, error) {
			// get all pets to find the next ID
			pets, err := getPets(world)
			if err != nil {
				return msg.CreatePetMsgResult{}, fmt.Errorf("failed to get pets: %w", err)
			}

			nextID := len(pets) + 1

			// Create the pet entity
			_, err = cardinal.Create(world,
				comp.Pet{
					ID:        nextID,
					PetName:   fmt.Sprintf("pet-%s-%d", tx.Msg.EggTheme, nextID),
					Health:    100,
					Hunger:    100.0,
					Hygiene:   100.0,
					Happiness: 100.0,
					IsSlumber: false,
					HatchDate: time.Now().Unix(),
					DNA:       "1234567890",
					ParentIDs: []int{},
					OwnerID:   tx.Msg.InitiatorPlayerID,
					SitterIDs: []string{},
				},
			)
			if err != nil {
				return msg.CreatePetMsgResult{}, fmt.Errorf("failed to create pet: %w", err)
			}

			return msg.CreatePetMsgResult{PetID: nextID, PetName: fmt.Sprintf("pet-%s-%d", tx.Msg.EggTheme, nextID), Success: true}, nil
		})
}
