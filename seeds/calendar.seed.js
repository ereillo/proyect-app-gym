const Week = require("../models/Week.model.js");

//CONECTAMOS CON DB
const db = require("../db/index.js");

const semana = {

    monday: { 
        at9: "64d6083fc5ec05db0c26a27f",
        at12: "64d6083fc5ec05db0c26a27f",
        at15: "64d6083fc5ec05db0c26a27f",
        at18: "64d6083fc5ec05db0c26a27f"
    
      },
      tuesday: {
        at9: "64d6083fc5ec05db0c26a27f",
        at12: "64d6083fc5ec05db0c26a27f",
        at15: "64d6083fc5ec05db0c26a27f",
        at18: "64d6083fc5ec05db0c26a27f"
      },
      wednesday: {
        at9: "64d6083fc5ec05db0c26a27f",
        at12: "64d6083fc5ec05db0c26a27f",
        at15: "64d6083fc5ec05db0c26a27f",
        at18: "64d6083fc5ec05db0c26a27f"
      },
      thursday: {
        at9: "64d6083fc5ec05db0c26a27f",
        at12: "64d6083fc5ec05db0c26a27f",
        at15: "64d6083fc5ec05db0c26a27f",
        at18: "64d6083fc5ec05db0c26a27f"
      },
      friday: {
        at9: "64d6083fc5ec05db0c26a27f",
        at12: "64d6083fc5ec05db0c26a27f",
        at15: "64d6083fc5ec05db0c26a27f",
        at18: "64d6083fc5ec05db0c26a27f"
      },
      
      

}

Week.insertMany(semana)