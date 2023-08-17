const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
    },
    surname: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    }, 
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1692279121/fotos-de-clases/blank-profile-picture-973460_960_720_yjznxh.webp"
    },
    role: {
      type: String,
      enum: ["client", "admin", "teacher"],
      default: "client"
    },
    suscriptionActive: {
      type: Boolean,
      default: false
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
