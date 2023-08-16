//CONECTAMOS CON DB
const db = require("../db/index.js");

const Class = require("../models/Class.model.js");

const classes = [
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "lunes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175406/fotos-de-clases/zumba_qe1kc9.jpg",
  },
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "martes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175406/fotos-de-clases/zumba_qe1kc9.jpg",
  },
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "miércoles",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175406/fotos-de-clases/zumba_qe1kc9.jpg",
  },
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "jueves",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175406/fotos-de-clases/zumba_qe1kc9.jpg",
  },
  {
    className: "Zumba",
    capacity: 15,
    weekDay: "viernes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175406/fotos-de-clases/zumba_qe1kc9.jpg",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "lunes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/anupam-mahapatra-Vz0RbclzG_w-unsplash_lmi2r2.jpg",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "martes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/anupam-mahapatra-Vz0RbclzG_w-unsplash_lmi2r2.jpg",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "miercoles",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/anupam-mahapatra-Vz0RbclzG_w-unsplash_lmi2r2.jpg",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "jueves",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/anupam-mahapatra-Vz0RbclzG_w-unsplash_lmi2r2.jpg",
  },
  {
    className: "Yoga",
    capacity: 10,
    weekDay: "viernes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/anupam-mahapatra-Vz0RbclzG_w-unsplash_lmi2r2.jpg",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "lunes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175408/fotos-de-clases/spinning_l4c1ay.jpg",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "martes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175408/fotos-de-clases/spinning_l4c1ay.jpg",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "miercoles",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175408/fotos-de-clases/spinning_l4c1ay.jpg",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "jueves",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175408/fotos-de-clases/spinning_l4c1ay.jpg",
  },
  {
    className: "Spinning",
    capacity: 20,
    weekDay: "viernes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175408/fotos-de-clases/spinning_l4c1ay.jpg",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "lunes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175416/fotos-de-clases/boxeo_boa6qa.jpg",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "martes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175416/fotos-de-clases/boxeo_boa6qa.jpg",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "miercoles",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175416/fotos-de-clases/boxeo_boa6qa.jpg",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "juves",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175416/fotos-de-clases/boxeo_boa6qa.jpg",
  },
  {
    className: "Boxeo",
    capacity: 6,
    weekDay: "viernes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175416/fotos-de-clases/boxeo_boa6qa.jpg",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "lunes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/sala-de-ma%CC%81quinas_oeugpb.jpg",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "martes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/sala-de-ma%CC%81quinas_oeugpb.jpg",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "miercoles",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/sala-de-ma%CC%81quinas_oeugpb.jpg",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "jueves",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/sala-de-ma%CC%81quinas_oeugpb.jpg",
  },
  {
    className: "Espacio de máquinas",
    capacity: 25,
    weekDay: "viernes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175413/fotos-de-clases/sala-de-ma%CC%81quinas_oeugpb.jpg",
  },
  {
    className: "Body Combat",
    capacity: 12,
    weekDay: "lunes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175399/fotos-de-clases/body_combat_wxu9k6.jpg",
  },
  {
    className: "Body Combat",
    capacity: 12,
    weekDay: "martes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175399/fotos-de-clases/body_combat_wxu9k6.jpg",
  },
  {
    className: "Body Combat",
    capacity: 12,
    weekDay: "miercoles",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175399/fotos-de-clases/body_combat_wxu9k6.jpg",
  },
  {
    className: "Body Combat",
    capacity: 12,
    weekDay: "jueves",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175399/fotos-de-clases/body_combat_wxu9k6.jpg",
  },
  {
    className: "Body Combat",
    capacity: 12,
    weekDay: "viernes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175399/fotos-de-clases/body_combat_wxu9k6.jpg",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "lunes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175407/fotos-de-clases/pilates_st4bvv.jpg",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "martes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175407/fotos-de-clases/pilates_st4bvv.jpg",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "miercoles",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175407/fotos-de-clases/pilates_st4bvv.jpg",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "jueves",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175407/fotos-de-clases/pilates_st4bvv.jpg",
  },
  {
    className: "Pilates",
    capacity: 10,
    weekDay: "viernes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175407/fotos-de-clases/pilates_st4bvv.jpg",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "lunes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175405/fotos-de-clases/entrenamiento-funcional_muevjv.jpg",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "martes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175405/fotos-de-clases/entrenamiento-funcional_muevjv.jpg",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "miercoles",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175405/fotos-de-clases/entrenamiento-funcional_muevjv.jpg",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "jueves",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175405/fotos-de-clases/entrenamiento-funcional_muevjv.jpg",
  },
  {
    className: "Entrenamiento Funcional",
    capacity: 8,
    weekDay: "viernes",
    classPic: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692175405/fotos-de-clases/entrenamiento-funcional_muevjv.jpg",
  },
];

Class.insertMany(classes)