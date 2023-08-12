const Calendar = require("../models/Calendar.model.js");

//CONECTAMOS CON DB
const db = require("../db/index.js");

const calendario = {

    monday: {
        at9: [],
        at12: [],
        at15: [],
        at18:[],
      },
      tuesday: {
        at9: [],
        at12: [],
        at15: [],
        at18:[],
      },
      wednesday: {
        at9: [],
        at12: [],
        at15: [],
        at18:[],
      },
      thursday: {
        at9: [],
        at12: [],
        at15: [],
        at18:[],
      },
      friday: {
        at9: [],
        at12: [],
        at15: [],
        at18:[],
      },
      
      

}

Calendar.insertMany(calendario)