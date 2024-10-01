import mongoose, { Schema } from "mongoose";
import crypto from "crypto"
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email should be unique"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ], // Regex to validate email format
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters long"],
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation date
    },
   
    resetpasswordToken: {
      type: String,
    },
    resetPasswordTokenExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.getResetPasswordToken=function(){
const resetToken=crypto.randomBytes(20).toString('hex');
this.resetpasswordToken=resetToken;

this.resetPasswordTokenExpire=Date.now()+360000;
return resetToken;

}
export default mongoose.model("User", userSchema);
