package system

import (
	"time"

	"pkg.world.dev/world-engine/cardinal"

	comp "pet-world/component"
)

// ComunalPetSpawnerSystem spawns one pet that is shared by all players.
func ComunalPetSpawnerSystem(world cardinal.WorldContext) error {
	players, err := getPlayers(world)
	if err != nil {
		return err
	}

	_, err = cardinal.Create(world,
		comp.Pet{
			ID:        1,
			PetName:   "our-pet",
			Health:    100,
			Hunger:    100,
			Hygiene:   100,
			Happiness: 100,
			IsSlumber: false,
			HatchDate: time.Now().Unix(),
			DNA:       "1234567890",
			ParentIDs: []int{},
			OwnerID:   players[0].ID,
			SitterIDs: func() []string {
				ids := make([]string, len(players))
				for i, player := range players {
					ids[i] = player.ID
				}
				return ids
			}(),
		},
	)
	if err != nil {
		return err
	}
	return nil
}
