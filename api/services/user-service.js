var db = require('../../config/db.js');

module.exports = {
  createUser: (data, callBack) => {
    db.query(
      `INSERT INTO user (first_name, last_name, email, password, permission_type, admin_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.permission_type,
        data.admin_id,
      ],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getUser: (callBack) => {
    db.query(
      `SELECT user_id, first_name, last_name, email, permission_type FROM user WHERE status = 0`,
      [],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getUserByUID: (user_id, callBack) => {
    db.query(
      `SELECT first_name, last_name, email, permission_type FROM user WHERE user_id = ? AND status = 0`,
      [user_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  getInstructorsByAdminId: (admin_id, callBack) => {
    db.query(
      `SELECT user_id, first_name, last_name, email, permission_type, admin_id FROM user WHERE admin_id = ? AND status = 0`,
      [admin_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  updateUserByUID: (data, callBack) => {
    db.query(
      `UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.user_id,
      ],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  deleteUser: (data, callBack) => {
    db.query(
      `UPDATE user SET status = 2 WHERE user_id = ?`,
      [data.user_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  getUserByUserEmail: (email, callBack) => {
    db.query(
      `SELECT user_id, first_name, last_name, email, password, permission_type FROM user WHERE email = ? AND status = 0`,
      [email],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },
};
