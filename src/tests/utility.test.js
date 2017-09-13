const chai = require('chai')
const { expect } = require('chai')
const { describe, it } = require('mocha')
const Utility = require('../helpers/utility')

chai.config.includeStack = true
const board = {
  _id: '59b93d03192c6f05fb01e7fd',
  square_grid: 10,
  __v: 9,
  ships: [{
    type: 1,
    name: 'Battleship',
    l: 4,
    cors: {
      ['10x7']: false,
      ['10x8']: false,
      ['10x9']: false,
      ['10x10']: false
    },
    _id: '59b93d03192c6f05fb01e7fe',
    destroyed: false
  }],
  fired: [],
  state: 0,
  ship_destroyed: 0
}

describe('## Utility', () => {
  it('should has function _getXY', () => {
    expect(Utility._getXY).to.be.an.instanceof(Function)
  })

  it('should has function isAdjacent', () => {
    expect(Utility.isAdjacent).to.be.an.instanceof(Function)
  })

  it('should has function isShipOverGrid', () => {
    expect(Utility.isShipOverGrid).to.be.an.instanceof(Function)
  })

  it('should has function getCors', () => {
    expect(Utility.isShipOverGrid).to.be.an.instanceof(Function)
  })

  it('should has function checkLimitShipsInBoard', () => {
    expect(Utility.checkLimitShipsInBoard).to.be.an.instanceof(Function)
  })

  it('should has function getShip', () => {
    expect(Utility.getShip).to.be.an.instanceof(Function)
  })

  it('should has function _getSituation', () => {
    expect(Utility.getShip).to.be.an.instanceof(Function)
  })

  it('should has function fireAndGetSituation', () => {
    expect(Utility.fireAndGetSituation).to.be.an.instanceof(Function)
  })

  it('should return { x: 4, y: 5 }', () => {
    const { x, y } = Utility._getXY('4x5')
    expect(x).to.be.equal(4)
    expect(y).to.be.equal(5)
  })

  it('should return isAdjacent to true', () => {
    const _ship = {
      type: 4,
      name: 'Submarine',
      l: 1,
      cors: {
        ['9x6']: false
      }
    }
    const isAdjacent = Utility.isAdjacent(board.ships, _ship.cors)
    expect(isAdjacent).to.be.a.true
  })

  it('should return isAdjacent to false', () => {
    const _ship = {
      type: 4,
      name: 'Submarine',
      l: 1,
      cors: {
        ['8x6']: false
      }
    }
    const isAdjacent = Utility.isAdjacent(board.ships, _ship.cors)
    expect(isAdjacent).to.be.a.false
  })

  it('should return isShipOverGrid to false', () => {
    const _ship = {
      type: 4,
      name: 'Submarine',
      l: 1,
      cors: {
        ['8x6']: false
      }
    }
    const isShipOverGrid = Utility.isShipOverGrid(10, _ship.cors)
    expect(isShipOverGrid).to.be.a.false
  })

  it('should return isShipOverGrid to true', () => {
    const _ship = {
      type: 4,
      name: 'Submarine',
      l: 1,
      cors: {
        ['0x-1']: false
      }
    }
    const isShipOverGrid = Utility.isShipOverGrid(10, _ship.cors)
    expect(isShipOverGrid).to.be.a.true
  })

  it('should return isShipOverGrid to true', () => {
    const _ship = {
      type: 4,
      name: 'Submarine',
      l: 1,
      cors: {
        ['14x6']: false
      }
    }
    const isShipOverGrid = Utility.isShipOverGrid(10, _ship.cors)
    expect(isShipOverGrid).to.be.a.true
  })

  it('should return cors of battleship', () => {
    const _ship = {
      type: 1,
      name: 'Battleship',
      l: 4
    }
    const battleship = {
      direction: 'vertical',
      type: 1,
      at: '10x7'
    }
    const cors = Utility.getCors(battleship, _ship)
    const expected = {
      ['10x7']: false,
      ['10x8']: false,
      ['10x9']: false,
      ['10x10']: false
    }
    expect(cors).to.have.all.deep.keys(expected);
  })

  it('should return cors of battleship', () => {
    const _ship = {
      type: 1,
      name: 'Battleship',
      l: 4
    }
    const battleship = {
      direction: 'horizontal',
      type: 1,
      at: '1x7'
    }
    const cors = Utility.getCors(battleship, _ship)
    const expected = {
      ['1x7']: false,
      ['2x7']: false,
      ['3x7']: false,
      ['4x7']: false
    }
    expect(cors).to.have.all.deep.keys(expected);
  })
})
