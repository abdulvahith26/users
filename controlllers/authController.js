const User = require('../models/user');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
require('dotenv').config();
const  cookie = require('cookie-parser');

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
            const {email,password} = request.body;
             
            //check user exist 
            const user = await User.findOne({email});

            // if user doesn't exist
           if (!user) {
                return response.status(401).json({message: "user  doesn't exits"});
            }

            //check password
             const passwordIsValid = await bcrypt.compare(password, user.password);

             //if password is !correct

             if(!passwordIsValid){
                return response.status(401).json({message:"incorrect password"});         
             }

             //generate token

             const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
             

             //store the token in cookies

             response.cookie('token', token,{httpOnly: true }); 
             

             //response

             return response.status(200).json({message:"login successfull"})




        }catch(error){
            return response.status(500).json({message: error.message }) ;
        }

    },
    logout: async(request,response) =>{
        try{ 
            // clr the saved token
            response.clearCookie('token');


            //success response

            return response.status(200).json({message : "logout successfully"})

        }catch(error){
            return response.status(500).json({message : error.message})
        }
    },
    me : async(request,response) =>{
        try{
            // get user id frm the req
            const   userId  = request.userId

            //find the  user id
            const  user = await User.findById(userId).select('-password')
            
            return response.status(200).json({user});
            
        }catch(error){
            return response.status(500).json({message: error.message})
        }

    }

    }     
module.exports = authController;