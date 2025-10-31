import mongoose , {Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
       username: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
       },
        email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
       },
       fullname: {
         type: String,
         required: true,
         trim: true,
       },
       avatar: {
         type: String,   //cloudinary url
         required: true,
       },
       coverimage: {
         type: String   //cloudinary url
       },
       watchHistory: [
          {
            type: Schema.Types.ObjectId,
            ref: "Video "
          }
       ],
       password: {
         type: String,   //password can't be in plain text but if it is in encrypted then how can we compare it with the user input 
         required: [true,"password is required"]
       },
       refreshToken: {
         type: String
       }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})  //this is a hook which is like a middle ware where it just before saving the data encrpt it .



userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
//will check if the user input password is correct 

userSchema.methods.generateAccessToken = function(){
    return JsonWebTokenError.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return JsonWebTokenError.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)