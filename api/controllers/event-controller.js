const event_service = require('../services/event-service')

module.exports = {
    createEvent: (req, res) => {
        const body = req.body //only have 2 element - event_description and admin_id
        const invite_code = '00001A' //to do..
        const current_time = new Date()
        body["invite_code"] = invite_code
        body["established_time"] = current_time

        event_service.createEvent(body, (err, result) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Server connection failure",
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Event Create Successfully",
                data: result
            })
        })   
    },

    joinEvent: (req, res) => {
        const body = req.body //user_id and event_id
        const current_time = new Date()
        body["join_time"] = current_time
        event_service.joinEvent(body, (err, result) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Server connection failure",
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Event join Successfully",
                data: result
            })
        })
    }
}