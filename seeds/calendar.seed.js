const Week = require("../models/Week.model.js");

//CONECTAMOS CON DB
const db = require("../db/index.js");

const semana = {

    monday: { 
        at9: "64d794ce10ef937100a7b218",
        at12: "64d794ce10ef937100a7b218",
        at15: "64d794ce10ef937100a7b218",
        at18: "64d794ce10ef937100a7b218"
    
      },
      tuesday: {
        at9: "64d794ce10ef937100a7b218",
        at12: "64d794ce10ef937100a7b218",
        at15: "64d794ce10ef937100a7b218",
        at18: "64d794ce10ef937100a7b218"
      },
      wednesday: {
        at9: "64d794ce10ef937100a7b218",
        at12: "64d794ce10ef937100a7b218",
        at15: "64d794ce10ef937100a7b218",
        at18: "64d794ce10ef937100a7b218"
      },
      thursday: {
        at9: "64d794ce10ef937100a7b218",
        at12: "64d794ce10ef937100a7b218",
        at15: "64d794ce10ef937100a7b218",
        at18: "64d794ce10ef937100a7b218"
      },
      friday: {
        at9: "64d794ce10ef937100a7b218",
        at12: "64d794ce10ef937100a7b218",
        at15: "64d794ce10ef937100a7b218",
        at18: "64d794ce10ef937100a7b218"
      },
      
      

}

Week.insertMany(semana)