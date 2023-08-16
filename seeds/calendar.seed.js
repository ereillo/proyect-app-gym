const Week = require("../models/Week.model.js");

//CONECTAMOS CON DB
const db = require("../db/index.js");

const semana = {

    monday: { 
        at9: "64dc94d1a8821965bbaba2d1",
        at12: "64dc94d1a8821965bbaba2d1",
        at15: "64dc94d1a8821965bbaba2d1",
        at18: "64dc94d1a8821965bbaba2d1"
    
      },
      tuesday: {
        at9: "64dc94d1a8821965bbaba2d1",
        at12: "64dc94d1a8821965bbaba2d1",
        at15: "64dc94d1a8821965bbaba2d1",
        at18: "64dc94d1a8821965bbaba2d1"
      },
      wednesday: {
        at9: "64dc94d1a8821965bbaba2d1",
        at12: "64dc94d1a8821965bbaba2d1",
        at15: "64dc94d1a8821965bbaba2d1",
        at18: "64dc94d1a8821965bbaba2d1"
      },
      thursday: {
        at9: "64dc94d1a8821965bbaba2d1",
        at12: "64dc94d1a8821965bbaba2d1",
        at15: "64dc94d1a8821965bbaba2d1",
        at18: "64dc94d1a8821965bbaba2d1"
      },
      friday: {
        at9: "64dc94d1a8821965bbaba2d1",
        at12: "64dc94d1a8821965bbaba2d1",
        at15: "64dc94d1a8821965bbaba2d1",
        at18: "64dc94d1a8821965bbaba2d1"
      },
      
      

}

Week.insertMany(semana)