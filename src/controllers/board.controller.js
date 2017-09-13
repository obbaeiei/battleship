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
  const board = req.board
  const body = req.body

  // get ship from type
  const ship = Utility.getShip(body.type)

  // check type ship should not more than 1x Battleship, 2x Cruisers, 3x Destroyers and 4x Submarines.
  const isNotLimitExeeded = Utility.checkLimitShipsInBoard(board.ships, ship.type)
  if (!isNotLimitExeeded) {
    res.json('illegal')
    return
  }

  // get all cors cells from start and l and direction
  const cors = Utility.getCors(body, ship)
  ship.cors = cors // set cors to ship

  // check ship over grid
  const isOver = Utility.isShipOverGrid(board.square_grid, ship.cors)
  if (isOver) {
    res.json('illegal')
    return
  }

  // check ship exists or adjacent cells
  const isAdjacent = Utility.isAdjacent(board.ships, ship.cors)
  if (isAdjacent) {
    res.json('illegal')
    return
  }

  // pass all cases
  board.ships.push(ship)

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
  const board = req.board
  const cell = req.body.fire
  // check pattern of cell
  const reg = new RegExp(/(\d+)x(\d+)/, 'g')
  if (!reg.test(cell)) {
    return next(new APIError('Bad request fire should be NUMBERxNUMBER', 400))
  }
  board.fired.push(cell)

  // Get result and set field in board object
  const result = Utility.fireAndGetSituation(board, cell)

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
