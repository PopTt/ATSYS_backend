const attendance_service = require('../services/attendance-service');
const event_service = require('../services/event-service');
const QRCode = require('qrcode');

module.exports = {
  createAttendance: (req, res) => {
    try {
      const body = req.body;
      attendance_service.createAttendance(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Server connection failure',
          });
        }
        return res.status(200).json({
          success: 1,
          message: 'Attendance Create Successfully',
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

  updateAttendance: (req, res) => {
    try {
      const body = req.body;
      attendance_service.getFlashByAttendanceId(body.attendance_id, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Server connection failure',
          });
        }
        if(result.length == 0 && body.attendance_type == '1'){
          return res.status(409).json({
            success: 0,
            message: 'Flash Question is empty! Attendance Type cannot be flash question type.',
          });
        }else {
          attendance_service.updateAttendanceByAttendanceID(body, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: 'Server connection failure',
              });
            }
            return res.status(200).json({
              success: 1,
              message: 'Attendance Update Successfully',
              data: result,
            });
          });
        }
      })
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  getAttendance: (req, res) => {
    try {
      const attendance_id = req.params.attendance_id;
      attendance_service.getAttendanceByAID(attendance_id, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Server connection failure',
          });
        }
        return res.status(200).json({
          success: 1,
          message: 'Get Attendance Success',
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

  getEventAttendances: (req, res) => {
    try {
      const event_id = req.params.event_id;
      const currentDate = new Date()

      attendance_service.getEventAttendances(event_id, (err, result) => {
        if (err) {
          throw new Error(err);
        }
        const attendances = result
        attendances.map((item) => {
          item["status"] = 'pending'
          if (
            currentDate > item.start_time &&
            currentDate < item.end_time
          ){
            item["status"] = 'active'
          }else if(currentDate > item.end_time){
            item["status"] = 'expired'
          }
        });
        return res.status(200).json({
          success: 1,
          message: 'Get Event Attendances Success',
          data: attendances,
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

  getUsersEventAttendances: (req, res) => {
    try {
      const attendace_id = req.params.attendance_id;

      attendance_service.getUsersEventAttendances(
        attendace_id,
        (err, result) => {
          if (err) {
            throw new Error(err);
          }

          return res.status(200).json({
            success: 1,
            message: 'Get Users Event Attendances Success',
            data: result,
          });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  getAttendanceQRCode: async (req, res) => {
    try {
      const attendace_id = req.params.attendance_id;

      QRCode.toDataURL(JSON.stringify(attendace_id), (err, src) => {
        if (err) res.send('Error Occured');

        return res.status(200).json({
          success: 1,
          message: 'QRCode genarate successfully',
          data: src,
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

  createFlash: (req, res) => {
    try {
      const body = req.body;

      attendance_service.createFlash(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Server connection failure',
          });
        }
        return res.status(200).json({
          success: 1,
          message: 'Flash Question Create Successfully',
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

  updateFlash: (req, res) => {
    try {
      const body = req.body;

      attendance_service.updateFlash(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Server connection failure',
          });
        }
        return res.status(200).json({
          success: 1,
          message: 'Flash Question Update Successfully',
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

  getAttendanceFlash: (req, res) => {
    try {
      const attendance_id = req.params.attendance_id;

      attendance_service.getFlashByAttendanceId(
        attendance_id,
        (err, result) => {
          if (err) {
            throw new Error(err);
          }

          return res.status(200).json({
            success: 1,
            message: 'Get Flash Question Attendances Success',
            data: result,
          });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  checkFlashAns: (req, res) => {
    try {
      const body = req.body;
      attendance_service.checkFlashAns(body, (err, result) => {
        if (result) {
          return res.status(200).json({
            success: 1,
            message: 'Correct Answer',
            data: result,
          });
        } else {
          return res.status(409).json({
            success: 0,
            message: 'Wrong Answer',
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

  assignUserAttendance: (req, res) => {
    try {
      const body = req.body;
      event_service.getUserByRoleByEventId(
        {
          event_id: body.event_id,
          permission_type: '2',
        },
        (err, result) => {
          if (result) {
            const users = result;
            users.map((item) => {
              attendance_service.insertUserAttendance({
                user_id: item.user_id,
                attendance_id: body.attendance_id,
                attendance_status: '0',
              });
            });
            return res.status(200).json({
              success: 1,
              message: 'Users Assignment Succesfully',
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  updateUserAttendanceStatus: (req, res) => {
    try {
      const body = req.body;
      const currentDate = new Date();
      body['attendance_time'] = currentDate;
      attendance_service.getAttendanceByAID(
        body.attendance_id,
        (err, result) => {
          if (err) {
            throw new Error(err);
          }
          if (
            currentDate > result.start_time &&
            currentDate < result.end_time
          ) {
            attendance_service.updateUserAttendance(body, (err, result) => {
              if (err) {
                throw new Error(err);
              }

              return res.status(200).json({
                success: 1,
                message: 'update User Attendance Status Successfully',
              });
            });
          } else {
            //console.log(currentDate)
            //console.log(result.start_time)
            //console.log(result.end_time)
            return res.status(409).json({
              success: 0,
              message: 'Not in valid datetime range',
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  updateUserAttendanceStatusManually: (req, res) => {
    try {
      const body = req.body;
      body['attendance_time'] = new Date();

      attendance_service.updateUserAttendanceByUAId(body, (err, result) => {
        if (err) {
          throw new Error(err);
        }

        return res.status(200).json({
          success: 1,
          message: 'update User Attendance Status Successfully',
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

  deleteAttendance: (req, res) => {
    try {
      const body = req.body;

      attendance_service.deleteAttendance(body.attendance_id, (err, result) => {
        if (err) {
          console.log(err);
          return;
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
