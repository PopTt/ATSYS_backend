var db = require('../../config/db.js');

module.exports = {
  addEventInstructor: (data, callBack) => {
    db.query(
      `INSERT INTO user_event (event_id, user_id, join_time) VALUES (?, ?, ?)`,
      [data.event_id, data.user_id, data.join_time],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  createEvent: (data, callBack) => {
    db.query(
      `INSERT INTO event (event_name, event_description, event_type, established_time, start_date, end_date, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.event_name,
        data.event_description,
        data.event_type,
        data.established_time,
        data.start_date,
        data.end_date,
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
      `SELECT event_id, event_name, event_description, event_type, established_time, start_date, end_date, admin_id FROM event WHERE event_id = ?`,
      [event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getEventInvitationCode: (event_id, callBack) => {
    db.query(
      `SELECT invitation_code FROM event WHERE event_id = ?`,
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
      `SELECT event_id, event_name, event_description, event_type, start_date, end_date FROM event WHERE admin_id = ?`,
      [admin_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getUserEvents: (user_id, callBack) => {
    db.query(
      `SELECT e.event_id, e.event_name, e.event_description, e.event_type, e.established_time, e.start_date, e.end_date, e.admin_id FROM user u, user_event ue, event e WHERE u.user_id = ue.user_id AND ue.event_id = e.event_id AND ue.user_id = ?`,
      [user_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getEventMembers: (event_id, callBack) => {
    db.query(
      `SELECT ue.ue_id, u.user_id, u.first_name, u.last_name, u.email, u.permission_type FROM user_event ue, user u, event e WHERE e.event_id = ue.event_id AND u.user_id = ue.user_id AND u.status = 0 AND e.event_id = ?`,
      [event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getEventIdByInvitationCode: (invitation_code, callBack) => {
    db.query(
      `SELECT event_id FROM event WHERE invitation_code = ?`,
      [invitation_code],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  checkJoinEvent: (data, callBack) => {
    db.query(
      `SELECT ue_id FROM user_event WHERE user_id = ? AND event_id = ?`,
      [data.user_id, data.event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  checkJoinEventByEmails: (data, callBack) => {
    db.query(
      `SELECT user.user_id FROM user WHERE user.email IN (?) AND NOT EXISTS (SELECT user_event.user_id FROM user_event WHERE user_event.user_id = user.user_id AND user.status = 0 AND user_event.event_id = ?)`,
      [data.emails, data.event_id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  getNotInEventInstructors: (admin_id, event_id, callBack) => {
    db.query(
      `SELECT DISTINCT user.user_id, user.first_name, user.last_name, user.email FROM user LEFT JOIN user_event ON user.user_id = user_event.user_id
      WHERE user.admin_id = ? AND user.status = 0 AND (user_event.event_id != ? OR user_event.event_id IS NULL)`,
      [admin_id, event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
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

  removeEventMember: (data, callBack) => {
    db.query(
      `DELETE FROM user_event WHERE user_id = ? AND event_id = ?`,
      [data.user_id, data.event_id],
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
      `UPDATE event SET event_name = ?, event_description = ?, event_type = ?, start_date = ?, end_date = ? WHERE event_id = ?`,
      [
        data.event_name,
        data.event_description,
        data.event_type,
        data.start_date,
        data.end_date,
        data.event_id,
      ],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },

  updateInvitationCode: (event_id, invitation_code) => {
    db.query(
      `UPDATE event SET invitation_code = ? WHERE event_id = ?`,
      [invitation_code, event_id],
      (err, result) => {
        if (err) {
          return err;
        }
        return result;
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
      `SELECT user.first_name, user.last_name, user.permission_type user_event.join_time FROM user, user_event WHERE user_event.event_id = ? AND user.user_id = user_event.user_id AND user.status = 0`,
      [event_id],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result[0]);
      }
    );
  },

  getUserByRoleByEventId: (data, callBack) => {
    db.query(
      `SELECT u.user_id, u.first_name, u.last_name, u.email FROM user u, user_event ue WHERE ue.event_id = ? AND ue.user_id = u.user_id AND u.permission_type = ?`,
      [data.event_id, data.permission_type],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, result);
      }
    );
  },
};
