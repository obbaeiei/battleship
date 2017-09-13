# battleship ![](https://circleci.com/gh/obbaeiei/battleship.png?circle-token=7bd0633335730249c71bdb0b851eb754f32ed17f) ![](https://circleci.com/gh/obbaeiei/battleship.svg?style=shield&circle-token=7bd0633335730249c71bdb0b851eb754f32ed17f)
Battleship game backend API by using NodeJS

### Installing

Please install NodeJS 8.4.0, NPM

```
cp .env.example .env
npm install
```

## Endpoints

#### Baord game

* List of boards
- **[<code>GET</code> http://localhost:4040/api/boards](#get-boards)**
* Create new boards
- **[<code>POST</code> http://localhost:4040/api/boards](#post-boards)**
* Get board by :baordId
- **[<code>GET</code> http://localhost:4040/api/boards/:boardId](#get-board)**
* Delete board by :baordId
- **[<code>DELETE</code> http://localhost:4040/api/boards/:boardId](#delete-board)**
* Place ship into board by :boardId
- **[<code>POST</code> http://localhost:4040/api/boards/:boardId/_add_unit](#add-unit)**
* Fire a ship by :boardId
- **[<code>POST</code> http://localhost:4040/api/boards/:boardId/_fire](#fire)**

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
      "direction": "vertical",
      "type": 4,
      "at": "2x10"
    }

Response body:
    'legal'

### POST /boards/:boardId/_fire

Example: http://localhost:4040/api/boards/59b818667ce528bf82fb6cc9/_fire

Request body:
    {
      "fire":"1x1"
    }

Response body:
    'Miss'

## Authors

* **Theerawit Akesiripong** - *Initial work* - [obbaeiei](https://github.com/obbaeiei)
