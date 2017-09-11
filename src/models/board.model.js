const mongoose = require('mongoose')
const httpStatus = require('http-status')
const Schema = mongoose.Schema
const APIError = require('../helpers/APIError')

/**
 * Board Schema
 */
const BoardSchema = new mongoose.Schema({
  // size of square grid
  square_grid: {
    type: Number,
    required: true
  },
  /*
   * number of ship destroyed
   */
  ship_destroyed: {
    type: Number,
    default: 0
  },
  /*
   * state of board as a number
   * 0 is initial (no ships)
   * 1 is inprogress (defender put their ships but not complate)
   * 2 is ready (defender places thier ship complately)
   */
  state: {
    type: Number,
    required: true
  },
  /*
   * cell that fired
   */
  fired: {
    type: Array,
    default: []
  },
  /*
   * Array of secret ship in this board
   */
  ships: [{
    /*
     * The objectId of ship.
     */
    id: Schema.Types.ObjectId,
    /*
     * status of the ship
     */
    destroyed: {
      type: Boolean,
      default: false
    },
    /*
     * corrodinates of the ship
     */
    cors: Schema.Types.Mixed
  }]
})

/**
 * Statics
 */
BoardSchema.statics = {
  /**
   * Get board
   * @param {ObjectId} id - The objectId of board.
   * @returns {Promise<Board, APIError>}
   */
  async get(id) {
    const board = await this.findById(id).exec()
    if (board) {
      return board
    }
    const err = new APIError('No such a board exists!', httpStatus.NOT_FOUND)
    throw err
  },

  /**
   * fire the ship!
   * @param {ObjectId} id - The objectId of board.
   * @param {string} cell - corrodinate when shoot torpedo
   * @returns {Promise<String, APIError>} text - 
   */
  async fire(id, cell) {
    const update = {
      $push: {
        fired: cell
      }
    }
    const resp = await this.update(id, update).exec()
    console.log('resp = ', JSON.stringify(resp, null, 2))
  }
}

/**
 * @typedef Board
 */
module.exports = mongoose.model('Board', BoardSchema)
