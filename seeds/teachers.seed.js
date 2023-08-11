const User = require("../models/User.model.js")

//CONECTAMOS CON DB
const db = require("../db/index.js")


//Hacemos el seeding

const teachers = [

{
    name: "Biel",
    surname: "Pérez",
    email: "biel@biel.com",
    password: "123456789aA*",
    profilePic: "",
    role: "teacher",
},
{
    name: "Anabel",
    surname: "Rodríguez",
    email: "anabel@anabel.com",
    password: "123456789aA*",
    profilePic: "",
    role: "teacher",
},
{
    name: "María",
    surname: "Santana",
    email: "maria@maria.com",
    password: "123456789aA*",
    profilePic: "",
    role: "teacher",
},
{
    name: "José Alberto",
    surname: "López",
    email: "jalopez@lopez.com",
    password: "123456789aA*",
    profilePic: "",
    role: "teacher",
},
]

User.insertMany(teachers)