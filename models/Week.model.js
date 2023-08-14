const { Schema, model } = require("mongoose");

const weekSchema = new Schema({
  monday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
      at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
  tuesday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
    at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
  wednesday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
      at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
  thursday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
      at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
  friday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
      at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
});

const Week = model("Week", weekSchema);

module.exports = Week;