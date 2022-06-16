var db = require('../../config/db.js');

module.exports = {
  createEvent: (data, callBack) => {
    db.query(
      `INSERT INTO event (event_name, event_description, established_time, admin_id) VALUES (?, ?, ?, ?)`,
      [
        data.event_name,
        data.event_description,
        data.established_time,
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

  getEvent: (event_id, callBack) => {
    db.query(
      `SELECT * FROM event WHERE event_id = ?`,
      [event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getEvents: (admin_id, callBack) => {
    db.query(
      `SELECT event_id, event_name, event_description FROM event WHERE admin_id = ?`,
      [admin_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getEventByInviteCode: (invitation_code, callBack) => {
    db.query(
      `SELECT event_id, event_name, event_description, established_time, invitation_code, admin_id FROM event WHERE invitation_code = ?`,
      [invitation_code],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  joinEvent: (data, callBack) => {
    db.query(
      `INSERT INTO user_event (user_id, event_id, join_time) VALUES (?,?,?)`,
      [data.user_id, data.event_id, data.join_time],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  updateEvent: (data, callBack) => {
    db.query(
      `UPDATE event SET event_description = ? WHERE event_id = ?`,
      [data.event_description, data.event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  removeUserFromEvent: (data, callBack) => {
    db.query(
      `DELETE FROM user_event WHERE user_id = ? AND event_id = ?`,
      [data.user_id, data.event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  getUserByEID: (event_id, callBack) => {
    db.query(
      `SELECT user.first_name, user.last_name, user.permission_type user_event.join_time FROM user, user_event WHERE user_event.event_id = ? AND user.user_id = user_event.user_id`,
      [event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },
};
