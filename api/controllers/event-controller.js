const event_service = require('../services/event-service');

module.exports = {
  addEventInstructors: (req, res) => {
    try {
      const body = req.body;

      body.instructor_ids.map((instructor_id) => {
        event_service.addEventInstructor(
          {
            event_id: body.event_id,
            user_id: instructor_id,
            join_time: new Date(),
          },
          (err) => {
            if (err) {
              console.log(err);
              throw new Error();
            }
          }
        );
      });

      return res.status(200).json({
        success: 1,
        message: 'Event Instructors Added Successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  createEvent: (req, res) => {
    try {
      const body = req.body;
      body['established_time'] = new Date();

      event_service.createEvent(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Server connection failure',
          });
        }
        return res.status(200).json({
          success: 1,
          message: 'Event Create Successfully',
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

  joinEvent: (req, res) => {
    const body = req.body; //user_id and event_id
    const current_time = new Date();
    body['join_time'] = current_time;
    event_service.joinEvent(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Server connection failure',
        });
      }
      return res.status(200).json({
        success: 1,
        message: 'Event join Successfully',
        data: result,
      });
    });
  },

  getEvent: (req, res) => {
    try {
      const event_id = req.params.event_id;

      event_service.getEvent(event_id, (err, result) => {
        if (err) {
          throw new Error(err);
        }

        return res.status(200).json({
          success: 1,
          message: 'Get Event Success',
          data: result[0],
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

  getEvents: (req, res) => {
    try {
      const admin_id = req.params.admin_id;

      event_service.getEvents(admin_id, (err, result) => {
        if (err) {
          throw new Error(err);
        }

        return res.status(200).json({
          success: 1,
          message: 'Get Events Success',
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

  getEventMembers: (req, res) => {
    try {
      const event_id = req.params.event_id;

      event_service.getEventMembers(event_id, (err, result) => {
        if (err) {
          throw new Error(err);
        }

        return res.status(200).json({
          success: 1,
          message: 'Get Event Members Success',
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

  getNotInEventInstructors: (req, res) => {
    try {
      const admin_id = req.params.admin_id;
      const event_id = req.params.event_id;

      event_service.getNotInEventInstructors(
        admin_id,
        event_id,
        (err, result) => {
          if (err) {
            throw new Error(err);
          }

          return res.status(200).json({
            success: 1,
            message: 'Get Not In Event Instructors Success',
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
};
