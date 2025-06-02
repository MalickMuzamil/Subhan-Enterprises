import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import AuthController from "./AuthController.js";

import User from "../Modals/UserModel.js";
import RoleModel from "../Modals/RoleModel.js";

class AccessController extends AuthController {
    static ApiWorking = asyncHandler(async (req, res) => {
        try {
            res.status(200).json(this.generateResponse(200, "Api Working"));
        } catch (error) {
            res.status(400);
            throw new Error("Api not working");
        }
    });

    static validate = asyncHandler(async (req, res) => {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                res.status(200).json(this.generateResponse(200, "Validated", decoded, token));
            }
            catch (error) {
                res.status(401);
                throw new Error("Authorization Token Not Valid");
            }
        }
        if (!token) {
            res.status(401);
            throw new Error("Authorization Token Not Present");
        }
    });

    static signup = asyncHandler(async (req, res) => {
        try {
            const { firstname, lastname, email, password, role } = req.body;

            if (!email || !password || !firstname || !lastname) {
                res.status(400);
                throw new Error(
                    "Email, password, First name and Last name are required"
                );
            }

            const DefaultRole = role && role.trim() !== "" ? role : "user";

            const userExists = await User.findOne({
                email: email.toLowerCase(),
                is_deleted: false,
            });

            if (userExists) {
                res.status(400);
                throw new Error("User already exists with this email");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                firstname,
                lastname,
                email: email.toLowerCase(),
                password: hashedPassword,
            });

            try {
                await RoleModel.create({
                    userId: newUser._id,
                    role: DefaultRole,
                });
            } catch (err) {
                res.status(500);
                throw new Error("Failed to assign role");
            }

            const token = this.generateToken(newUser._id);

            const response = this.generateResponse(
                201,
                "Signup successful",
                {
                    ...newUser.toObject(),
                    role: DefaultRole,
                },
                token
            );

            return res.status(201).json(response);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    });

    static login = asyncHandler(async (req, res) => {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({
                email: email.toLowerCase(),
                is_deleted: false,
            });

            if (!user) {
                res.status(404);
                throw new Error("User not found or has been deleted");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(403);
                throw new Error("Invalid password");
            }

            let role = await RoleModel.findOne({ userId: user._id });

            const token = this.generateToken(user._id);

            const response = this.generateResponse(
                200,
                "Login successful",
                {
                    ...user.toObject(),
                    role: role.role,
                },
                token
            );
            return res.status(200).json(response);
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    });
}

export default AccessController;
