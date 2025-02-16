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
	PlayerID string
}

func PlayerInfo(world cardinal.WorldContext, req *PlayerInfoRequest) (*PlayerInfoResponse, error) {
	// Validate input
	if req.Nickname == "" {
		return nil, fmt.Errorf("nickname cannot be empty")
	}

	var playerInfo *comp.Player
	var err error
	searchErr := cardinal.NewSearch().Entity(
		filter.Contains(filter.Component[comp.Player]())).
		Each(world, func(id types.EntityID) bool {
			var player *comp.Player
			player, err = cardinal.GetComponent[comp.Player](world, id)
			if err != nil {
				err = fmt.Errorf("failed to get Player component for entity %v: %w", id, err)
				return false
			}

			// Terminates the search if the player is found
			if player.Nickname == req.Nickname {
				playerInfo, err = cardinal.GetComponent[comp.Player](world, id)
				if err != nil {
					err = fmt.Errorf("failed to get Player component for entity %v: %w", id, err)
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

	if playerInfo == nil {
		return nil, fmt.Errorf("player with nickname '%s' not found", req.Nickname)
	}

	return &PlayerInfoResponse{PlayerID: playerInfo.ID}, nil
}
