var db = require('../../config/db.js');

module.exports = {
  createAttendance: (data, callBack) => {
    db.query(
      `INSERT INTO attendance (attendance_name, start_time, end_time, event_id, creator_id) VALUES (?, ?, ?, ?, ?)`,
      [
        data.attendance_name,
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

  updateAttendanceByAttendanceID: (data, callBack) => {
    db.query(
      `UPDATE attendance SET attendance_name = ? WHERE attendance_id = ?`,
      [data.attendance_name, data.attendance_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getEventAttendances: (event_id, callBack) => {
    db.query(
      `SELECT * FROM attendance WHERE event_id = ? AND isDeleted = 0`,
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
      `SELECT u.user_id, u.first_name, u.last_name, u.email, ua.attendance_status, ua.ua_id, ua.attendance_time FROM user u, user_attendance ua, attendance a WHERE u.user_id = ua.user_id AND ua.attendance_id = a.attendance_id AND ua.attendance_id = ?`,
      [attendance_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getAttendanceByAID: (attendance_id, callBack) => {
    db.query(
      `SELECT attendance_id, attendance_name, start_time, end_time FROM attendance WHERE attendance_id = ?`,
      [attendance_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  createFlash: (data, callBack) => {
    db.query(
      `INSERT INTO flash (flash_question, flash_ans, creator_id, attendance_id) VALUES (?, ?, ?, ?)`,
      [
        data.flash_question,
        data.flash_ans,
        data.creator_id,
        data.attendance_id,
      ],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  updateFlash: (data, callBack) => {
    db.query(
      `UPDATE flash SET flash_question = ?, flash_ans = ? WHERE flash_id = ?`,
      [data.flash_question, data.flash_ans, data.flash_id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getFlashByAttendanceId: (attendance_id, callBack) => {
    db.query(
      `SELECT f.flash_id, f.flash_question, f.flash_ans, u.first_name, u.last_name FROM flash f, user u WHERE u.user_id = f.creator_id AND f.attendance_id = ?`,
      [attendance_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  checkFlashAns: (data, callBack) => {
    db.query(
      `SELECT flash_id FROM flash WHERE flash_id = ? AND flash_ans = ?`,
      [data.flash_id, data.ans],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  deleteFlash: (flash_id, callBack) => {
    db.query(
      `DELETE FROM flash WHERE flash_id = ?`,
      [flash_id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  insertUserAttendance: (data, callBack) => {
    db.query(
      `INSERT INTO user_attendance (user_id, attendance_id, attendance_status) VALUES (?, ?, ?)`,
      [data.user_id, data.attendance_id, data.attendance_status],
      (err, result) => {
        if (err) {
          console.log(`insertUserAttendance ${err}`);
        }
      }
    );
  },

  updateUserAttendance: (data, callBack) => {
    db.query(
      `UPDATE user_attendance SET attendance_status = ?, attendance_time = ? WHERE user_id = ? AND attendance_id = ?`,
      [
        data.attendance_status,
        data.attendance_time,
        data.user_id,
        data.attendance_id,
      ],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  updateUserAttendanceByUAId: (data, callBack) => {
    db.query(
      `UPDATE user_attendance SET attendance_status = ?, attendance_time = ? WHERE ua_id = ?`,
      [data.attendance_status, data.attendance_time, data.ua_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  deleteAttendance: (attendance_id, callBack) => {
    db.query(
      `UPDATE attendance SET isDeleted = 1 WHERE attendance_id = ?`,
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
