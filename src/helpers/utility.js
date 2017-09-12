class Utility {

  /**
   * get ship
   * 
   * @param {number} type - type of ship
   * @returns {string} ship.name - name of ship
   *          {number} ship.length - length of ship
   */
  static getShip(type) {
    switch (type) {
      case 1:
        return {
          name: 'Battleship',
          length: 4
        }
      case 2:
        return {
          name: 'Cruisers',
          length: 3
        }
      case 3:
        return {
          name: 'Destroyers',
          length: 2
        }
      case 4:
        return {
          name: 'Submarines',
          length: 1
        }
    }
  }

  /**
   * private function get situations
   * 
   * @param {Number} num - number of situation
   * @param {string} x - name of ship or number of moves
   * @returns {string} text - situation after fired
   */
  static _getSituation(num, x) {
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

  /**
   * Use when player fire the ship
   * This function will get result as a text
   * case 0: miss
   *   set nothing
   *   return Miss
   * case 1: hit
   *   set ship.corrodinate that hit to true
   *   return Hit
   * case 2: sank a ship
   *   set ship.corrodinate that hit to true
   *   set ship.ship_destroyed + 1
   *   return You just sank the {name of ship}
   * case 3: all ships are sank
   *   set ship.corrodinate that hit to true
   *   set ship.ship_destroyed + 1
   *   return Win ! You completed the game in {number of moves} moves
   * 
   * @param {Object} board - The object of board model
   * @param {string} cellFired - cell fired
   * @returns {string} text - situation after fired from function _getSituations
   */
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
            return Utility._getSituation(1)
          }
        }
        ship.ship_destroyed += 1
        if (board.ship_destroyed === ships.length) {
          return Utility._getSituation(3, board.fired.length)
        }
        // SHIP Destroyed
        return Utility._getSituation(2, ship.name)
      }
    }
    return Utility._getSituation(0)
  }
}

module.exports = Utility
