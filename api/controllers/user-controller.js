const bcrypt = require('bcrypt');
const { sign, verify, decode } = require('jsonwebtoken');
const user_service = require('../services/user-service');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  register: (req, res) => {
    try {
      const body = req.body;
      user_service.getUserByUserEmail(body.email, (err, result) => {
        if (result) {
          return res.status(409).json({
            success: 0,
            message: 'User with this email already exists!',
            data: result,
          });
        } else {
          const salt = bcrypt.genSaltSync(10);
          body.password = bcrypt.hashSync(body.password, salt);
          user_service.createUser(body, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: 'Server connection failure',
              });
            }
            return res.status(201).json({
              success: 1,
              message: 'Register Successfully',
              data: result,
            });
          });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  login: (req, res) => {
    try {
      const body = req.body;

      user_service.login(body.email, (err, result) => {
        if (err) {
          console.log(err);
          throw new Error();
        }
        if (!result) {
          return res.status(401).json({
            success: 0,
            message: 'User does not exist',
          });
        }
        const login_result = bcrypt.compareSync(body.password, result.password);

        if (login_result) {
          result.password = undefined;

          const jsontoken = sign(
            { login_result: result },
            process.env.TOKEN_SECRET,
            {
              expiresIn: '1h',
            }
          );

          return res.status(200).json({
            success: 1,
            message: 'Login successfully',
            token: jsontoken,
            data: result,
          });
        } else {
          return res.status(401).json({
            success: 0,
            message: 'Invalid email or password',
          });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  logout: (req, res) => {
    res.status(200).json({
      success: 1,
      message: 'Logged out successfully',
    });
  },

  getUserByUID: (req, res) => {
    const user_id = req.params.user_id;
    user_service.getUserByUID(user_id, (err, result) => {
      if (err) {
        console.log(err);
        throw new Error();
      }
      if (!result) {
        return res.status(401).json({
          success: 0,
          message: 'User Not Found',
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },

  getInstructorsByAdminId: (req, res) => {
    try {
      const admin_id = req.params.admin_id;
      user_service.getInstructorsByAdminId(admin_id, (err, result) => {
        if (err) {
          console.log(err);
          throw new Error();
        }
        return res.status(200).json({
          success: 1,
          data: result,
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  getUser: (req, res) => {
    user_service.getUser((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          success: 0,
          message: 'No record',
        });
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },

  updateUser: (req, res) => {
    try {
      const body = req.body;

      const checker = new Promise((resolve, _) => {
        user_service.getUserByUID(body.user_id, async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: 'Database connection error',
            });
          }

          if (result.email == body.email) {
            resolve('true');
          } else {
            user_service.getUserByUserEmail(body.email, (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  message: 'Database connection error',
                });
              }

              if (result) {
                return res.status(409).json({
                  success: 0,
                  message: 'User with this email already exists!',
                  data: result,
                });
              } else {
                resolve('true');
              }
            });
          }
        });
      });

      checker.then((value) => {
        user_service.updateUserByUID(body, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: 'Database connection error',
            });
          }
          if (!result) {
            return res.json({
              success: 0,
              message: 'User Not Found',
            });
          }
          return res.json({
            success: 1,
            message: 'UPDATED successfully',
          });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  deleteUser: (req, res) => {
    try {
      const body = req.body;
      user_service.deleteUser(body, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!result) {
          return res.json({
            success: 0,
            message: 'User Not Found',
          });
        }
        return res.json({
          success: 1,
          message: 'DELETED successfully',
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },
};
