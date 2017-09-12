/* global describe it after */
const mongoose = require('mongoose')
const request = require('supertest-as-promised')
const httpStatus = require('http-status')
const chai = require('chai')
const expect = require('chai').expect
const app = require('../../index')

chai.config.includeStack = true

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

describe('## Board APIs', () => {
  let board = null

  describe('# POST /api/boards', () => {
    it('should create a new board', (done) => {
      request(app)
        .post('/api/boards')
        .send(board)
        .expect(httpStatus.OK)
        .then((res) => {
          console.log('res.body = ', JSON.stringify(res.body, null, 2));
          expect(res.body.square_grid).to.equal(10)
          board = res.body
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/boards/:boardId', () => {
    it('should get board details', (done) => {
      request(app)
        .get(`/api/boards/${board._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          console.log('res.body = ', JSON.stringify(res.body, null, 2));
          expect(res.body.square_grid).to.equal(10)
          done()
        })
        .catch(done)
    })

    it('should report error with message - Not found, when board does not exists', (done) => {
      request(app)
        .get('/api/boards/56c787ccc67fc16ccc1a5e92')
        .then((res) => {
          expect(res.body.message).to.equal('Not Found')
          done()
        })
        .catch(done)
    })
  })

  describe('# POST /api/baords/:boardId/_add_unit', () => {
    describe('# Battleship', () => {
      it('should add battleship into the board', (done) => {
        let battleship = {
          direction: 'horizontal',
          type: 3,
          at: '7x1'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(battleship)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Submarines into the board', (done) => {
        let submarine = {
          direction: 'horizontal',
          type: 4,
          at: '5x1'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body).to.equal('legal')
            done()
          })
          .catch(done)
      })
    })
  })

  describe('# POST /api/baords/:boardId/_fire', () => {
    it('should get *Miss* when fire missed', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          x: 10,
          y: 10
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.equal('Miss')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          x: 7,
          y: 1
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the ${x}* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          x: 5,
          y: 1
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.equal('You just sank the Submarine')
          done()
        })
        .catch(done)
    })

    it('should get *Win ! You completed the game in ${x} moves* when all ships down', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          x: 8,
          y: 1
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.equal('Win ! You completed the game in 4 moves')
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/boards/', () => {
    it('should get all boards', (done) => {
      request(app)
        .get('/api/boards')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array')
          done()
        })
        .catch(done)
    })

    it('should get all boards (with limit and skip)', (done) => {
      request(app)
        .get('/api/boards')
        .query({
          limit: 10,
          skip: 1
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array')
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/boards/', () => {
    it('should delete board', (done) => {
      request(app)
        .delete(`/api/boards/${board._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.square_grid).to.equal(10)
          done()
        })
        .catch(done)
    })
  })
})
