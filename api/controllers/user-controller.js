const bcrypt = require('bcrypt');
const { sign, verify, decode } = require('jsonwebtoken')
const user_service = require('../services/user-service')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    register: (req, res) => {
        const body = req.body
        const salt = bcrypt.genSaltSync(10)
        body.password = bcrypt.hashSync(body.password, salt)
        
        user_service.getUserByUserEmail(body.email, (err, result) => {
            if(result) {
                return res.status(409).json({
                    success: 0,
                    message: "User with the email already exists!",
                    data: result
                })
            } else {
                user_service.createUser(body, (err, result) => {
                    if(err) {
                        console.log(err)
                        return res.status(500).json({
                            success: 0,
                            message: "Server connection failure",
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Register Successfully",
                        data: result
                    })
                })
            } 
        })
    },

    login: (req, res) => {
        const body = req.body
        user_service.getUserByUserEmail(body.email, (err, result) => {
            if(err) {
                console.log(err)
            } 
            if(!result) {
                return res.status(401).json({
                    success: 0,
                    message: "Email does not exist"
                })
            }
            const login_result = bcrypt.compareSync(body.password, result.password)

            if(login_result) {
                result.password = undefined

                const jsontoken = sign({ login_result: result }, process.env.TOKEN_SECRET, {
                    expiresIn: "30m"
                })

                return res
                    .status(200)
                    .json({
                        success: 1,
                        message: "Login successfully",
                        token: jsontoken,
                        data: result
                    })
            } else {
                return res.status(401).json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
        })
    },

    logout : (req, res) => {
        res.status(200).json({
            success: 1,
            message: "Logged out successfully"
        })
    },

    getUserByUID: (req, res) => {
        const user_id = req.params.user_id
        user_service.getUserByUID(user_id, (err, result) => {
            if(err) {
                console.log(err)
                return
            }
            if(!result) {
                return res.status(401).json({
                    success: 0,
                    message: "User Not Found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    },


    getUser: (req, res) => {
        user_service.getUser((err, result) => {
            if(err) {
                console.log(err)
                return
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "No record"
                })
            }
            return res.json({
                success: 1,
                data: result
            })
        })
    },

    updateUser: (req, res) => {
        const body = req.body
        const salt = bcrypt.genSaltSync(10)
        body.password = bcrypt.hashSync(body.password, salt)
        user_service.updateUserByUID(body, (err, result) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                })
            }
            if(!result) {
                return res.json ({
                    success: 0,
                    message: "User Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "UPDATED successfully"
            })
        })
    },

    deleteUser: (req, res) => {
        const body = req.body
        user_service.deleteUser(body, (err, result) => {
            if(err) {
                console.log(err)
                return
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "User Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "DELETED successfully"
            })
        })
    }
}