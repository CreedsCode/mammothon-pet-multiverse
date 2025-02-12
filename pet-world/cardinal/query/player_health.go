package query

import (
	"fmt"

	"pkg.world.dev/world-engine/cardinal/filter"
	"pkg.world.dev/world-engine/cardinal/types"

	comp "pet-world/component"

	"pkg.world.dev/world-engine/cardinal"
)

type PlayerHealthRequest struct {
	Nickname string
}

type PlayerHealthResponse struct {
	HP int
}

func PlayerHealth(world cardinal.WorldContext, req *PlayerHealthRequest) (*PlayerHealthResponse, error) {
	// Validate input
	if req.Nickname == "" {
		return nil, fmt.Errorf("nickname cannot be empty")
	}

	var playerHealth *comp.Health
	var err error
	searchErr := cardinal.NewSearch().Entity(
		filter.Contains(filter.Component[comp.Player](), filter.Component[comp.Health]())).
		Each(world, func(id types.EntityID) bool {
			var player *comp.Player
			player, err = cardinal.GetComponent[comp.Player](world, id)
			if err != nil {
				err = fmt.Errorf("failed to get Player component for entity %v: %w", id, err)
				return false
			}

			// Terminates the search if the player is found
			if player.Nickname == req.Nickname {
				playerHealth, err = cardinal.GetComponent[comp.Health](world, id)
				if err != nil {
					err = fmt.Errorf("failed to get Health component for entity %v: %w", id, err)
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

	if playerHealth == nil {
		return nil, fmt.Errorf("player with nickname '%s' not found", req.Nickname)
	}

	return &PlayerHealthResponse{HP: playerHealth.HP}, nil
}
