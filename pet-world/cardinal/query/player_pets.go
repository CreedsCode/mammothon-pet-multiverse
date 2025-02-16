package query

import (
	"fmt"

	"pkg.world.dev/world-engine/cardinal/filter"
	"pkg.world.dev/world-engine/cardinal/types"

	comp "pet-world/component"

	"pkg.world.dev/world-engine/cardinal"
)

type PlayerPetsRequest struct {
	PlayerID string
}

type PlayerPetsResponse struct {
	Pets []comp.Pet
}

func PlayerPets(world cardinal.WorldContext, req *PlayerPetsRequest) (*PlayerPetsResponse, error) {
	// Validate input
	if req.PlayerID == "" {
		return nil, fmt.Errorf("playerID cannot be empty")
	}

	foundPets := make([]comp.Pet, 0)
	var err error
	searchErr := cardinal.NewSearch().Entity(
		filter.Contains(filter.Component[comp.Pet]())).
		Each(world, func(id types.EntityID) bool {
			var pet *comp.Pet
			pet, err = cardinal.GetComponent[comp.Pet](world, id)
			if err != nil {
				err = fmt.Errorf("failed to get Pet component for entity %v: %w", id, err)
				return false
			}

			// Terminates the search if the player is found
			if pet.OwnerID == req.PlayerID {
				foundPets = append(foundPets, *pet)
			}

			// Continue searching if the player is not the target player
			return true
		})
	if searchErr != nil {
		return nil, fmt.Errorf("search failed: %w", searchErr)
	}
	if err != nil {
		return nil, fmt.Errorf("error during search: %w", err)
	}

	return &PlayerPetsResponse{Pets: foundPets}, nil
}
