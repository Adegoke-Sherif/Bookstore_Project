import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    trim: true
  },
  confirmPassword: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  }
}, {
  timestamps: true
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})

const User = mongoose.model("User", userSchema);

export default User;
