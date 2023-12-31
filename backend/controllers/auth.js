import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const {
            firstName,
            lastName,
            email,
            password,
            // picturePath,
            location
        } = req.body;
        console.log(firstName)
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            // picturePath,
            location
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("email",email);
        const user = await User.findOne({ email: email});
        if(!user) return res.status(400).json({error: "User does not exist"});

        const pass_match = await bcrypt.compare(password, user.password);
        if(!pass_match) res.status(400).json({error: "Wrong password"});

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};