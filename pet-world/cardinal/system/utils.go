package system

import (
	"fmt"

	"pkg.world.dev/world-engine/cardinal"
	"pkg.world.dev/world-engine/cardinal/filter"
	"pkg.world.dev/world-engine/cardinal/types"

	comp "pet-world/component"
)

// queryTargetPlayer queries for the target player's entity ID and health component.
func queryTargetPlayer(world cardinal.WorldContext, targetNickname string) (types.EntityID, *comp.Health, error) {
	var playerID types.EntityID
	var playerHealth *comp.Health
	var err error
	searchErr := cardinal.NewSearch().Entity(
		filter.Exact(filter.Component[comp.Player](), filter.Component[comp.Health]())).Each(world,
		func(id types.EntityID) bool {
			var player *comp.Player
			player, err = cardinal.GetComponent[comp.Player](world, id)
			if err != nil {
				return false
			}

			// Terminates the search if the player is found
			if player.Nickname == targetNickname {
				playerID = id
				playerHealth, err = cardinal.GetComponent[comp.Health](world, id)
				if err != nil {
					return false
				}
				return false
			}

			// Continue searching if the player is not the target player
			return true
		})
	if searchErr != nil {
		return 0, nil, err
	}
	if err != nil {
		return 0, nil, err
	}
	if playerHealth == nil {
		return 0, nil, fmt.Errorf("player %q does not exist", targetNickname)
	}

	return playerID, playerHealth, err
}

// get all players
func getPlayers(world cardinal.WorldContext) ([]*comp.Player, error) {
	players := []*comp.Player{}
	var searchErr error
	err := cardinal.NewSearch().Entity(
		filter.Contains(filter.Component[comp.Player]())).Each(world, func(id types.EntityID) bool {
		player, err := cardinal.GetComponent[comp.Player](world, id)
		if err != nil {
			searchErr = err
			return false
		}
		players = append(players, player)
		return true
	})
	if err != nil {
		return nil, err
	}
	if searchErr != nil {
		return nil, searchErr
	}
	return players, nil
}

// get all pets
func getPets(world cardinal.WorldContext) ([]*comp.Pet, error) {
	pets := []*comp.Pet{}
	var searchErr error
	err := cardinal.NewSearch().Entity(
		filter.Contains(filter.Component[comp.Pet]())).Each(world, func(id types.EntityID) bool {
		pet, err := cardinal.GetComponent[comp.Pet](world, id)
		if err != nil {
			searchErr = err
			return false
		}
		pets = append(pets, pet)
		return true
	})
	if err != nil {
		return nil, err
	}
	if searchErr != nil {
		return nil, searchErr
	}
	return pets, nil
}
