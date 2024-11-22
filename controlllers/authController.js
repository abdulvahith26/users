const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
     register: async(request,response) =>{
        try{
            const {name,email,password} = request.body
            const userExists = await User.findOne({email:email});

            //check user exists or not
            if(userExists) {
                return response.status(400).json({error: "user already exists"}) 
            }
          //encrypt password
           const encryptPassword = await bcrypt.hash(password, 10);

            //crt object
            const newUser = new User({
                name,
                email,
                password : encryptPassword,
            });
            //save user
            await newUser.save();
            return response.status(201).json({message : "new  user created"})

           //throw err msg
        } catch (error) {
            return response.status(500).json({error: error.message})

        }

    },
    login: async(request,response)=>{

        try{
                //get user details
            const {email,password} = request.body

            //check user exist 
            const user = await User.findOne({email});

            // if user doesn't exist
           if (!user) {
                return response.status(401).json({message: "user  doesn't exits"});
            }

            //check password
             const passwordIsValid = await bcrypt.compare(password, User.password);

             //if password is !correct

             if(!passwordIsValid){
                return response.status(401).json({message:"incorrect password"});         
             }

             //generate token

             const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

             //store the token in cookies

             response.cookie('token', token,{httpOnly: true });






        }catch(error){
            return response.status(500).json({message: error.message }) ;
        }

    },
    logout: async(request,response) =>{

    }


    }     
module.exports = authController;