import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../helper/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { email, password, name, phone, address,answer } = req.body;
        if (!name) {
            res.send({ message: "Name is required" });
        }
        if (!email) {
            res.send({ message: "Email is required" });
        }
        if (!password) {
            res.send({ message: "Password is required" });
        }
        if (!phone) {
            res.send({ message: "Phone Number is required" });
        }
        if (!address) {
            res.send({ message: "Address is required" });
        }
        if (!answer) {
            res.send({ message: "Answer is required" });
        }
        //check user
        const existinguser = await userModel.findOne({ email });
        // check for existing user
        if (existinguser) {
            return res.staus(200).send({
                success: false,
                message: "Already register please login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword,answer }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in the registeration",
            err

        })
    }
}

export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user is not found"
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }

        //Token

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).send({
            success: true,
            message: "user login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            err
        })
    }
}

//test Controller

export const testController = async (req, res) => {
    res.send("Protected routes");
}
//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        if (!answer) {
            res.status(400).send({
                success: false,
                message: "Answer is required"
            })
        }
        if (!newPassword) {
            res.status(400).send({
                success: false,
                message: "newPassword is required"
            })
        }

        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: "Something went wrong",
                error

            }
        )
    }
}
