import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken";

export const verifyJWT = asyncHandler(async(req,res,next) => {
    try {
        const accessToken = req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer ","");
        console.log("Token",accessToken);
    
        if(!accessToken)
        {
            throw new ApiError(401,"Unauthorized request");
        }
        const decodedToken = JWT.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user)
        {
            // Discuss about frontend
            throw new ApiError(401,"Invalid access token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid token");
    }
})