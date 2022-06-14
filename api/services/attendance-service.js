var db = require('../../config/db.js')

module.exports = {
    createAttendance: (data, callBack) => {
        db.query(
            `INSERT INTO attendance (attendance_description, attendance_type, start_time, due_time, event_id, instructor_id) VALUES (?,?,?,?,?,?)`, 
            [
                data.attendance_description,
                data.attendance_type, 
                data.start_time, 
                data.due_time,
                data.event_id,
                data.instructor_id
            ],
            (err, result) => {
                if(err) {
                   return callBack(err)
                }
                return callBack(null, result)
            })
    }

}