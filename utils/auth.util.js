import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
export const getToken=(newUser)=>{
    const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );
      return token;
}
export const isCorrectPassword=async (password,hashedpassword)=>{
const isCorrect=await bcrypt.compare(password,hashedpassword);
return isCorrect;


}