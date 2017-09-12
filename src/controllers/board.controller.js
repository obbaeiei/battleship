const APIError = require('../helpers/APIError')
const Board = require('../models/board.model')
const Utility = require('../helpers/utility')

/**
 * Load board and append to req.
 */
function load(req, res, next, id) {
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
function get(req, res) {
  return res.json(req.board)
}

/**
 * Create new board
 * @property {string} req.body.boardname - The boardname of board.
 * @property {string} req.body.mobileNumber - The mobileNumber of board.
 * @returns {Board}
 */
function create(req, res, next) {
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
function update(req, res, next) {
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
function list(req, res, next) {
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
function remove(req, res, next) {
  const board = req.board
  board.remove()
    .then(deletedBoard => res.json(deletedBoard))
    .catch(e => next(new APIError(e)))
}

/**
 * add unit
 * @returns {Board}
 */
function addUnit(req, res, next) {
  // @TODO check type ship should not more than 1x Battleship, 2x Cruisers, 3x Destroyers and 4x Submarines.
  // @TODO get all cells from start and length ship
  // @TODO check ship over grid
  // @TODO check ship exists cell
  // @TODO insert ship into board
  // @TODO return success
  const board = req.board
  res.json('')
}

/**
 * Attacker fire the ship.
 * @returns {Promise<String, APIError>} text - 
 */
async function fire(req, res, next) {
  const board = req.board
  const x = req.body.x
  const y = req.body.y
  const cell = `${x}x${y}`
  board.fired.push(cell)
  console.log('board = ', JSON.stringify(board, null, 2));

  // Get result and set field in board object
  const result = Utility.fireAndGetSituation(board, cell)

  try {
    await board.save()
  } catch (e) {
    next(new APIError(e))
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
