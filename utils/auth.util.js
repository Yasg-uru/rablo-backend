import jwt from "jsonwebtoken";

export const getToken=(user)=>{
    const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );
      return token;
}