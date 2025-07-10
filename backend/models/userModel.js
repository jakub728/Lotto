import { Schema, model } from "mongoose";

const required = true
const unique = true
const trim = true


const userSchema = new Schema({
    email: {type: String, required, unique, trim},
    password: {type: String, required},
    verified: {type: Boolean, default: false}
})

userSchema.methods.toJSON = function() {
  const user = this.toObject()
  delete user.password
  delete user.__v
  return user
}


export const UserModel = model("User", userSchema)

