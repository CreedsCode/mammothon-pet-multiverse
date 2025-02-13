package query

import (
	"fmt"

	"pkg.world.dev/world-engine/cardinal/filter"
	"pkg.world.dev/world-engine/cardinal/types"

	comp "pet-world/component"

	"pkg.world.dev/world-engine/cardinal"
)

type PlayerInfoRequest struct {
	Nickname string
}

type PlayerInfoResponse struct {
	PetsInSlumberCount int
}

func PlayerInfo(world cardinal.WorldContext, req *PlayerInfoRequest) (*PlayerInfoResponse, error) {
	// Validate input
	if req.Nickname == "" {
		return nil, fmt.Errorf("nickname cannot be empty")
	}

	var playerPetState *comp.PetsState
	var err error
	searchErr := cardinal.NewSearch().Entity(
		filter.Contains(filter.Component[comp.Player](), filter.Component[comp.PetsState]())).
		Each(world, func(id types.EntityID) bool {
			var player *comp.Player
			player, err = cardinal.GetComponent[comp.Player](world, id)
			if err != nil {
				err = fmt.Errorf("failed to get Player component for entity %v: %w", id, err)
				return false
			}

			// Terminates the search if the player is found
			if player.Nickname == req.Nickname {
				playerPetState, err = cardinal.GetComponent[comp.PetsState](world, id)
				if err != nil {
					err = fmt.Errorf("failed to get PetsState component for entity %v: %w", id, err)
					return false
				}
				return false
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

	if playerPetState == nil {
		return nil, fmt.Errorf("player with nickname '%s' not found", req.Nickname)
	}

	return &PlayerInfoResponse{PetsInSlumberCount: playerPetState.PetsInSlumberCount}, nil
}
