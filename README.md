# battleship ![](https://circleci.com/gh/obbaeiei/battleship.png?circle-token=7bd0633335730249c71bdb0b851eb754f32ed17f) ![](https://circleci.com/gh/obbaeiei/battleship.svg?style=shield&circle-token=7bd0633335730249c71bdb0b851eb754f32ed17f)
Battleship game backend API by using NodeJS

### Installing

Please install NodeJS 8.4.0, NPM

```
cp .env.example .env
npm install
```

### Run

```
node index.js
```

## Endpoints

#### Baord game

* List of boards
    - **[<code>GET</code> http://localhost:4040/api/boards](#get-boards)**
* Create new boards
    - **[<code>POST</code> http://localhost:4040/api/boards](#post-boards)**
* Get board by :baordId
    - **[<code>GET</code> http://localhost:4040/api/boards/:boardId](#get-boardboardid)**
* Delete board by :baordId
    - **[<code>DELETE</code> http://localhost:4040/api/boards/:boardId](#delete-boardsboardid)**
* Place ship into board by :boardId
    - **[<code>POST</code> http://localhost:4040/api/boards/:boardId/_add_unit](#post-boardsboardid_add_unit)**
* Fire a ship by :boardId
    - **[<code>POST</code> http://localhost:4040/api/boards/:boardId/_fire](#post-boardsboardid_fire)**

## Guild Lines & Test game

* Game start with a fleet of ships
* 1x Battleship(type:1), 2x Cruisers(type:2), 3x Destroyers(type:3) and 4x Submarines(type:4)
* Start!! 
* First create a board then get id of baord from response body
```
POST http://localhost:4040/api/boards
  response_body: {
       "__v": 0,
       "square_grid": 10,
       "_id": "59b94f6c152ecf0b28f1fb81",
       "ships": [],
       "fired": [],
       "ship_destroyed": 0
   }
```

* Add ships into a board
```
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
     "direction": "vertical", // direction of ship
     "type": 1, // type of ships
     "at": "10x7" // start position to place ship. For this example x=10, y=7
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'horizontal',
      type: 2,
      at: '2x2'
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'horizontal',
      type: 2,
      at: '3x4'
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'horizontal',
      type: 3,
      at: '2x6'
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'vertical',
      type: 3,
      at: '7x2'
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'vertical',
      type: 3,
      at: '10x3'
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'vertical',
      type: 4,
      at: '1x4'
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'vertical',
      type: 4,
      at: '1x10'
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'vertical',
      type: 4,
      at: '5x6'
   }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_add_unit
 request_body: {
      direction: 'vertical',
      type: 4,
      at: '9x7'
   }
```

* Fire all ships
```
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '1x1',
   }
 response_body: { "message": "Miss" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '2x2'
   }
 response_body: { "message": "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '3x2'
   }
 response_body: { "message": "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '4x2'
   }
 response_body:{ "message":  "You just sank the Cruiser" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '3x4'
   }
 response_body:{ "message":  "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '5x4'
   }
 response_body:{ "message":  "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '4x4'
   }
 response_body:{ "message":  "You just sank the Cruiser" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '10x7'
   }
 response_body:{ "message":  "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '10x8'
   }
 response_body:{ "message":  "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '10x10'
   }
 response_body:{ "message":  "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '10x9'
   }
 response_body:{ "message":  "You just sank the Battleship" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '10x3'
   }
 response_body:{ "message":  "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '10x4'
   }
 response_body:{ "message":  "You just sank the Destroyer" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '7x2'
   }
 response_body:{ "message":  "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '7x3'
   }
 response_body:{ "message":  "You just sank the Destroyer" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '2x6'
   }
 response_body:{ "message":  "Hit" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '3x6'
   }
 response_body:{ "message":  "You just sank the Destroyer" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '1x4'
   }
 response_body:{ "message":  "You just sank the Submarine" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '5x6'
   }
 response_body:{ "message":  "You just sank the Submarine" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '1x10'
   }
 response_body:{ "message":  "You just sank the Submarine" }
POST http://localhost:4040/api/boards/59b94f6c152ecf0b28f1fb81/_fire
 request_body: {
      fire: '8x6'
   }
 response_body:{ "message":  "Win ! You completed the game in 21 moves" }
```

## Example endpoint

### GET /boards

Example: http://localhost:4040/api/boards

Response body:

    [{
       "_id": "59b818667ce528bf82fb6cc9",
       "square_grid": 10,
       "state": 0,
       "__v": 35,
       "ships": [{
         "type": 3,
         "name": "Destroyer",
         "l": 2,
         "cors": {
           "8x1": true,
           "7x1": true
         },
         "_id": "59b818b97ce528bf82fb6cca",
         "destroyed": true
       }, {
         "type": 3,
         "name": "Destroyer",
         "l": 2,
         "cors": {
           "5x1": true,
           "4x1": true
         },
         "_id": "59b818d27ce528bf82fb6ccb",
         "destroyed": true
       }, {
         "type": 3,
         "name": "Destroyer",
         "l": 2,
         "cors": {
           "2x1": true,
           "1x1": true
         },
         "_id": "59b818e17ce528bf82fb6ccc",
         "destroyed": true
       }, {
         "type": 1,
         "name": "Battleship",
         "l": 4,
         "cors": {
           "4x3": true,
           "3x3": true,
           "2x3": true,
           "1x3": true
         },
         "_id": "59b819117ce528bf82fb6ccd",
         "destroyed": true
       }, {
         "type": 2,
         "name": "Cruiser",
         "l": 3,
         "cors": {
           "6x5": true,
           "6x4": true,
           "6x3": true
         },
         "_id": "59b819407ce528bf82fb6cce",
         "destroyed": true
       }, {
         "type": 2,
         "name": "Cruiser",
         "l": 3,
         "cors": {
           "8x5": true,
           "8x4": true,
           "8x3": true
         },
         "_id": "59b8194c7ce528bf82fb6ccf",
         "destroyed": true
       }, {
         "type": 4,
         "name": "Submarine",
         "l": 1,
         "cors": {
           "10x10": true
         },
         "_id": "59b819677ce528bf82fb6cd0",
         "destroyed": true
       }, {
         "type": 4,
         "name": "Submarine",
         "l": 1,
         "cors": {
           "8x10": true
         },
         "_id": "59b8196e7ce528bf82fb6cd1",
         "destroyed": true
       }, {
         "type": 4,
         "name": "Submarine",
         "l": 1,
         "cors": {
           "6x10": true
         },
         "_id": "59b819727ce528bf82fb6cd2",
         "destroyed": true
       }, {
         "type": 4,
         "name": "Submarine",
         "l": 1,
         "cors": {
           "4x10": true
         },
         "_id": "59b819737ce528bf82fb6cd3",
         "destroyed": true
       }],
       "fired": [
         "9x10",
         "10x10",
         "8x10",
         "6x10",
         "5x10",
         "4x10",
         "3x10",
         "2x10",
         "8x3",
         "8x4",
         "8x5",
         "6x3",
         "6x4",
         "6x5",
         "1x3",
         "2x3",
         "3x3",
         "4x3",
         "7x1",
         "8x1",
         "4x1",
         "5x1",
         "1x1",
         "3x1",
         "2x1"
       ],
       "ship_destroyed": 10
     }]

### POST /boards

Example: http://localhost:4040/api/boards

Request body:

    {}

### GET /board/:boardId

Example: http://localhost:4040/api/boards/59b818667ce528bf82fb6cc9

Response body:

    {
      "_id": "59b818667ce528bf82fb6cc9",
      "square_grid": 10,
      "state": 0,
      "__v": 35,
      "ships": [{
        "type": 3,
        "name": "Destroyer",
        "l": 2,
        "cors": {
          "8x1": false,
          "7x1": false
        },
        "_id": "59b818b97ce528bf82fb6cca",
        "destroyed": false
      }, {
        "type": 3,
        "name": "Destroyer",
        "l": 2,
        "cors": {
          "5x1": true,
          "4x1": true
        },
        "_id": "59b818d27ce528bf82fb6ccb",
        "destroyed": true
      }, {
        "type": 3,
        "name": "Destroyer",
        "l": 2,
        "cors": {
          "2x1": true,
          "1x1": true
        },
        "_id": "59b818e17ce528bf82fb6ccc",
        "destroyed": true
      }, {
        "type": 1,
        "name": "Battleship",
        "l": 4,
        "cors": {
          "4x3": true,
          "3x3": true,
          "2x3": true,
          "1x3": true
        },
        "_id": "59b819117ce528bf82fb6ccd",
        "destroyed": true
      }, {
        "type": 2,
        "name": "Cruiser",
        "l": 3,
        "cors": {
          "6x5": true,
          "6x4": true,
          "6x3": true
        },
        "_id": "59b819407ce528bf82fb6cce",
        "destroyed": true
      }, {
        "type": 2,
        "name": "Cruiser",
        "l": 3,
        "cors": {
          "8x5": true,
          "8x4": true,
          "8x3": true
        },
        "_id": "59b8194c7ce528bf82fb6ccf",
        "destroyed": true
      }, {
        "type": 4,
        "name": "Submarine",
        "l": 1,
        "cors": {
          "10x10": true
        },
        "_id": "59b819677ce528bf82fb6cd0",
        "destroyed": true
      }, {
        "type": 4,
        "name": "Submarine",
        "l": 1,
        "cors": {
          "8x10": true
        },
        "_id": "59b8196e7ce528bf82fb6cd1",
        "destroyed": true
      }, {
        "type": 4,
        "name": "Submarine",
        "l": 1,
        "cors": {
          "6x10": true
        },
        "_id": "59b819727ce528bf82fb6cd2",
        "destroyed": true
      }, {
        "type": 4,
        "name": "Submarine",
        "l": 1,
        "cors": {
          "4x10": true
        },
        "_id": "59b819737ce528bf82fb6cd3",
        "destroyed": true
      }],
      "fired": [
        "9x10",
        "10x10",
        "8x10",
        "6x10",
        "5x10",
        "4x10",
        "3x10",
        "2x10",
        "8x3",
        "8x4",
        "8x5",
        "6x3",
        "6x4",
        "6x5",
        "1x3",
        "2x3",
        "3x3",
        "4x3",
        "4x1",
        "5x1",
        "1x1",
        "3x1",
        "2x1"
      ],
      "ship_destroyed": 10
    }

### GET /board/:boardId?type=attacker

type attacker will hide positions aren't fired.
Example: http://localhost:4040/api/boards/59b818667ce528bf82fb6cc9

Response body:

    {
      "_id": "59b818667ce528bf82fb6cc9",
      "square_grid": 10,
      "state": 0,
      "__v": 35,
      "ships": [{
        "type": 3,
        "name": "Destroyer",
        "l": 2,
        "cors": {
        },
        "_id": "59b818b97ce528bf82fb6cca",
        "destroyed": false
      }, {
        "type": 3,
        "name": "Destroyer",
        "l": 2,
        "cors": {
          "5x1": true,
          "4x1": true
        },
        "_id": "59b818d27ce528bf82fb6ccb",
        "destroyed": true
      }, {
        "type": 3,
        "name": "Destroyer",
        "l": 2,
        "cors": {
          "2x1": true,
          "1x1": true
        },
        "_id": "59b818e17ce528bf82fb6ccc",
        "destroyed": true
      }, {
        "type": 1,
        "name": "Battleship",
        "l": 4,
        "cors": {
          "4x3": true,
          "3x3": true,
          "2x3": true,
          "1x3": true
        },
        "_id": "59b819117ce528bf82fb6ccd",
        "destroyed": true
      }, {
        "type": 2,
        "name": "Cruiser",
        "l": 3,
        "cors": {
          "6x5": true,
          "6x4": true,
          "6x3": true
        },
        "_id": "59b819407ce528bf82fb6cce",
        "destroyed": true
      }, {
        "type": 2,
        "name": "Cruiser",
        "l": 3,
        "cors": {
          "8x5": true,
          "8x4": true,
          "8x3": true
        },
        "_id": "59b8194c7ce528bf82fb6ccf",
        "destroyed": true
      }, {
        "type": 4,
        "name": "Submarine",
        "l": 1,
        "cors": {
          "10x10": true
        },
        "_id": "59b819677ce528bf82fb6cd0",
        "destroyed": true
      }, {
        "type": 4,
        "name": "Submarine",
        "l": 1,
        "cors": {
          "8x10": true
        },
        "_id": "59b8196e7ce528bf82fb6cd1",
        "destroyed": true
      }, {
        "type": 4,
        "name": "Submarine",
        "l": 1,
        "cors": {
          "6x10": true
        },
        "_id": "59b819727ce528bf82fb6cd2",
        "destroyed": true
      }, {
        "type": 4,
        "name": "Submarine",
        "l": 1,
        "cors": {
          "4x10": true
        },
        "_id": "59b819737ce528bf82fb6cd3",
        "destroyed": true
      }],
      "fired": [
        "9x10",
        "10x10",
        "8x10",
        "6x10",
        "5x10",
        "4x10",
        "3x10",
        "2x10",
        "8x3",
        "8x4",
        "8x5",
        "6x3",
        "6x4",
        "6x5",
        "1x3",
        "2x3",
        "3x3",
        "4x3",
        "4x1",
        "5x1",
        "1x1",
        "3x1",
        "2x1"
      ],
      "ship_destroyed": 10
    }


### DELETE /boards/:boardId

Example: http://localhost:4040/api/boards/59b818667ce528bf82fb6cc9

Response body:

    {
        "_id": "59b818667ce528bf82fb6cc9",
        "square_grid": 10,
        "__v": 0,
        "ships": [],
        "fired": [],
        "ship_destroyed": 0
    }

### POST /boards/:boardId/_add_unit

Example: http://localhost:4040/api/boards/59b818667ce528bf82fb6cc9/_add_unit

Request body:

    {
      "direction": enum("vertical", "horizontal"),
      "type": enum(1, 2, 3, 4), // Battleship(type:1), Cruisers(type:2), Destroyers(type:3) and Submarines(type:4)
      "at": "2x10" // position x, y for example x = 2, y = 10
    }

Response body:

    {
      "message": "legal"
    }

### POST /boards/:boardId/_fire

Example: http://localhost:4040/api/boards/59b818667ce528bf82fb6cc9/_fire

Request body:

    {
      "fire":"1x1" // position x, y for example x = 1, y = 1
    }

Response body:
    
    {
      "message": "Miss"
    }
    

## Authors

* **Theerawit Akesiripong** - *Initial work* - [obbaeiei](https://github.com/obbaeiei)
