class Utility {
  static getSituation(num, x) {
    switch (num) {
      case 0:
        return 'Miss'
      case 1:
        return 'Hit'
      case 2:
        return `You just sank the ${x}`
      case 3:
        return `Win ! You completed the game in ${x} moves`
    }
  }

  static fireAndGetSituation(board, cellFired) {
    const ships = board.ships
    for (let i = 0; i < ships.length; i++) {
      const ship = ships[i]
      // if ship destroyed continue to next ship
      if (ship.destroyed) {
        continue
      }
      // if matched cors key in ship (it HITS)
      if (ship.cors[cellFired] !== undefined) {
        ship.cors[cellFired] = true
        // checking Is this ship destroyed?
        const keys = Object.keys(ship.cors)
        ship.destroyed = true
        // if all cell of ship are false
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j]
          if (!ship.cors[key]) {
            ship.destroyed = false
            // JUST hit not destroyed
            return Utility.getSituation(1)
          }
        }
        ship.ship_destroyed += 1
        if (board.ship_destroyed === ships.length) {
          return Utility.getSituation(3, board.fired.length)
        }
        // SHIP Destroyed
        return Utility.getSituation(2, ship.name)
      }
    }
    return Utility.getSituation(0)
  }
}

module.exports = Utility
