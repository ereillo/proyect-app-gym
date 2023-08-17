const Week = require("../models/Week.model.js");

//weekId Eve: 64da46b6f1fd57abc7f34356
//weekId Lucas: 64da35b47a1247b56b3042b4


function getWeekDetails() {

   return Week.findById(
    "64da35b47a1247b56b3042b4"
  ).populate({
    path: "monday tuesday wednesday thursday friday",
    populate: {
      path: "at9 at12 at15 at18",
      model: "Class",
      populate: {
        path: "teacher students",
        model: "User",
      },
    },
  });

}


// const  weekFunction = Week.findById(
//     "64da35b47a1247b56b3042b4"
//   ).populate({
//     path: "monday tuesday wednesday thursday friday",
//     populate: {
//       path: "at9 at12 at15 at18",
//       model: "Class",
//       populate: {
//         path: "teacher students",
//         model: "User",
//       },
//     },
//   });

  module.exports = getWeekDetails