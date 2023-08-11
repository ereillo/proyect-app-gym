const Class = require("../models/Class.model.js");

//CONECTAMOS CON DB
const db = require("../db/index.js");

const classes = [
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "lunes",
    classPic: "",
  },
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "martes",
    classPic: "",
  },
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "miércoles",
    classPic: "",
  },
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "jueves",
    classPic: "",
  },
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "viernes",
    classPic: "",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "lunes",
    classPic: "",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "martes",
    classPic: "",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "miercoles",
    classPic: "",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "jueves",
    classPic: "",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "viernes",
    classPic: "",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "lunes",
    classPic: "",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "martes",
    classPic: "",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "miercoles",
    classPic: "",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "jueves",
    classPic: "",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "viernes",
    classPic: "",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "lunes",
    classPic: "",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "martes",
    classPic: "",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "miercoles",
    classPic: "",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "juves",
    classPic: "",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "viernes",
    classPic: "",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "lunes",
    classPic: "",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "martes",
    classPic: "",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "miercoles",
    classPic: "",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "jueves",
    classPic: "",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "viernes",
    classPic: "",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "viernes",
    classPic: "",
  },
  {
    className: "Body Combact",
    capacity: 12,
    weekDay: "lunes",
    classPic: "",
  },
  {
    className: "Body Combact",
    capacity: 12,
    weekDay: "martes",
    classPic: "",
  },
  {
    className: "Body Combact",
    capacity: 12,
    weekDay: "miercoles",
    classPic: "",
  },
  {
    className: "Body Combact",
    capacity: 12,
    weekDay: "jueves",
    classPic: "",
  },
  {
    className: "Body Combact",
    capacity: 12,
    weekDay: "viernes",
    classPic: "",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "lunes",
    classPic: "",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "martes",
    classPic: "",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "miercoles",
    classPic: "",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "jueves",
    classPic: "",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "viernes",
    classPic: "",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "lunes",
    classPic: "",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "martes",
    classPic: "",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "miercoles",
    classPic: "",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "jueves",
    classPic: "",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "viernes",
    classPic: "",
  },
];

Class.insertMany(classes)