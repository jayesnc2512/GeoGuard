import { hashPassword , comparePassword} from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';


const registerController = async (req, res) => {
    try {
        const { name,
            contactNo,
            emergencyContactName,
            emergencyContactNo,
            aadhaarNumber,
            email,
            password, } = req.body;
        //validation
        if (!name||!email||!password) {
            return res.send({error:' This field is required'})
        }

        //check for uniqueness email
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(300).send({
                success: true,
                message:"Already registered please login"
            })
        }

        //Regiter User
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name, email,
            password: hashedPassword,
            phone:contactNo
        }).save();
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" });
        res.status(201).send({
            success: true,
            message: "user Registration successfully",
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
    
};
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        //await console.log(req.body);
        if (!email || !password) {
            console.log('empty creds')
            return res.status(404).send({
                success: false,
                message: "Empty field email or password"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'email is not registered. Please Sign Up!'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            console.log('invalid password')
            return res.status(404).send({
                success: false,
                message: "Invalid password"
            })
        }
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:"30m"});
        res.status(200).send({
            success: true,
            message: "Logged in",
            user,
            token,
    })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in login"
        })
    }
}
const testController = (req, res) => {
    res.send({
        message: "protected"
    })
    //console.log(res.data);
}
export { registerController, loginController, testController };

