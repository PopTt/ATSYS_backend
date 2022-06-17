var db = require('../../config/db.js');

module.exports = {
  createAttendance: (data, callBack) => {
    db.query(
      `INSERT INTO attendance (attendance_name, attendance_type, start_time, end_time, event_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.attendance_name,
        data.attendance_type,
        data.start_time,
        data.end_time,
        data.event_id,
        data.user_id,
      ],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getEventAttendances: (event_id, callBack) => {
    db.query(
      `SELECT * FROM attendance WHERE event_id = ?`,
      [event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getUsersEventAttendances: (attendance_id, callBack) => {
    db.query(
      `SELECT u.user_id, u.first_name, u.last_name, u.email, ua.attendance_status, ua.attendance_time FROM user u, user_attendance ua, attendance a WHERE u.user_id = ua.user_id AND ua.attendance_id = a.attendance_id AND ua.attendance_id = ?`,
      [attendance_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },
};
