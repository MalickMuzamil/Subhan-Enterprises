
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(401);
                throw new Error("User not found");
            }

            next();
        }

        catch (error) {
            console.error("Token verification failed:", error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    else {
        console.log("No token found in header");
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export default protect;

