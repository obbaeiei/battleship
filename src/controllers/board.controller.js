const APIError = require('../helpers/APIError')
const Board = require('../models/board.model')
const Utility = require('../helpers/utility')

/**
 * Load board and append to req.
 */
function load (req, res, next, id) {
  Board.get(id)
    .then((board) => {
      req.board = board
      return next()
    })
    .catch(e => next(new APIError(e)))
}

/**
 * Get board
 * @returns {Board}
 */
function get (req, res) {
  return res.json(req.board)
}

/**
 * Create new board
 * @property {string} req.body.boardname - The boardname of board.
 * @property {string} req.body.mobileNumber - The mobileNumber of board.
 * @returns {Board}
 */
function create (req, res, next) {
  const squreGrid = 10 // default grid 10x10
  const board = new Board({
    square_grid: squreGrid
  })

  board.save()
    .then(savedBoard => res.json(savedBoard))
    .catch(e => next(new APIError(e)))
}

/**
 * Update existing board
 * @property {string} req.body.boardname - The boardname of board.
 * @property {string} req.body.mobileNumber - The mobileNumber of board.
 * @returns {Board}
 */
function update (req, res, next) {
  const board = req.board
  board.boardname = req.body.boardname
  board.mobileNumber = req.body.mobileNumber

  board.save()
    .then(savedBoard => res.json(savedBoard))
    .catch(e => next(new APIError(e)))
}

/**
 * Get board list.
 * @property {number} req.query.skip - Number of boards to be skipped.
 * @property {number} req.query.limit - Limit number of boards to be returned.
 * @returns {Board[]}
 */
function list (req, res, next) {
  const { limit = 50, skip = 0 } = req.query
  Board.list({
    limit,
    skip
  })
    .then(boards => res.json(boards))
    .catch(e => next(new APIError(e)))
}

/**
 * Delete board.
 * @returns {Board}
 */
function remove (req, res, next) {
  const board = req.board
  board.remove()
    .then(deletedBoard => res.json(deletedBoard))
    .catch(e => next(new APIError(e)))
}

/**
 * add unit
 * @returns {Board}
 */
async function addUnit (req, res, next) {
  // @DONE @TODO get ship from type
  // @DONE @TODO check type ship should not more than 1x Battleship, 2x Cruisers, 3x Destroyers and 4x Submarines.
  // @DONE @TODO get all cors cells from start and l and direction
  // @DONE @TODO check ship over grid
  // @DONE @TODO check ship exists or adjacent cells
  // @DONE @TODO insert ship into board
  // @DONE @TODO return success
  const board = req.board
  const body = req.body
  console.log('body = ', JSON.stringify(body, null, 2))

  // get ship from type
  const ship = Utility.getShip(body.type)
  console.log('ship = ', JSON.stringify(ship, null, 2))
  console.log('board = ', JSON.stringify(board, null, 2))

  // check type ship should not more than 1x Battleship, 2x Cruisers, 3x Destroyers and 4x Submarines.
  const isNotLimitExeeded = Utility.checkLimitShipsInBoard(board.ships, ship.type)
  console.log('isNotLimitExeeded = ', isNotLimitExeeded)
  if (!isNotLimitExeeded) {
    res.json('illegal')
    return
  }

  // get all cors cells from start and l and direction
  const cors = Utility.getCors(body, ship)
  console.log('cors = ', JSON.stringify(cors, null, 2))
  ship.cors = cors // set cors to ship
  console.log('board = ', JSON.stringify(board, null, 2))
  console.log('ship = ', JSON.stringify(ship, null, 2))

  // check ship over grid
  const isOver = Utility.isShipOverGrid(board.square_grid, ship.cors)
  console.log('isOver = ', isOver)
  if (isOver) {
    res.json('illegal')
    return
  }

  // check ship exists or adjacent cells
  const isAdjacent = Utility.isAdjacent(board.ships, ship.cors)
  console.log('isAdjacent = ', isAdjacent)
  if (isAdjacent) {
    res.json('illegal')
    return
  }

  // pass all cases
  board.ships.push(ship)
  console.log('board = ', JSON.stringify(board, null, 2))
  // @TODO update state if all of ships are place

  try {
    await board.save()
  } catch (e) {
    return next(new APIError(e))
  }

  res.json('legal')
}

/**
 * Attacker fire the ship.
 * @returns {Promise<String, APIError>} text -
 */
async function fire (req, res, next) {
  // @TODO check if state not ready (put more ships please) cannot fire
  const board = req.board
  const x = req.body.x
  const y = req.body.y
  const cell = `${x}x${y}`
  board.fired.push(cell)
  // console.log('board = ', JSON.stringify(board, null, 2));

  // Get result and set field in board object
  const result = Utility.fireAndGetSituation(board, cell)

  console.log('board = ', JSON.stringify(board, null, 2))
  try {
    board.markModified('ships') // update mixed type in mongoose
    await board.save()
  } catch (e) {
    return next(new APIError(e))
  }

  return res.json(result)
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
  addUnit,
  fire
}
