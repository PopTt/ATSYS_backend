const event_service = require('../services/event-service');

function generateInvitationCode(event_id) {
  let secret = event_id.toString();
  let position = Math.floor(Math.random() * 2 + 1);
  const randomAlphabet = (
    len,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  ) =>
    [...Array(len)]
      .map(() =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      )
      .join('');
  let frontRandom = randomAlphabet(position);
  let backRandom = randomAlphabet(position);
  let invitation_code = frontRandom + secret + backRandom + position;

  return invitation_code;
}

function convertBackEventId(invitation_code) {
  let target = invitation_code.slice(-1);
  let backTrash = parseInt(target) + 1;
  let half = invitation_code.slice(0, -backTrash);
  let orginal_code = half.substring(parseInt(target));

  return orginal_code;
}

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

  updateEvent: (req, res) => {
    try {
      const body = req.body;

      event_service.updateEvent(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Server connection failure',
          });
        }
        return res.status(200).json({
          success: 1,
          message: 'Event Update Successfully',
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
    try {
      const body = req.body;
      event_service.getEventIdByInvitationCode(
        body.invitation_code,
        (err, result) => {
          if (!result) {
            return res.status(409).json({
              success: 0,
              message: 'Invalid invitation code',
            });
          } else {
            const eventID = result.event_id;
            event_service.checkJoinEvent(
              {
                user_id: body.user_id,
                event_id: result.event_id,
              },
              (err, result) => {
                if (result) {
                  return res.status(409).json({
                    success: 0,
                    message: 'Event already exists!',
                    data: result,
                  });
                } else {
                  event_service.joinEvent(
                    {
                      event_id: eventID,
                      user_id: body.user_id,
                      join_time: new Date(),
                    },
                    (err, result) => {
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
                      });
                    }
                  );
                }
              }
            );
          }
        }
      );
    } catch (error) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
  },

  removeEventMember: (req, res) => {
    try {
      const body = req.body;
      event_service.removeEventMember(body, (err, _) => {
        if (err) {
          throw new Error(err);
        }

        return res.status(200).json({
          success: 1,
          message: 'Remove event member successfully',
        });
      });
    } catch (error) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error',
      });
    }
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

  getUserEvents: (req, res) => {
    try {
      const user_id = req.params.user_id;

      event_service.getUserEvents(user_id, (err, result) => {
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

  getInvitationCode: (req, res) => {
    try {
      const event_id = req.params.event_id;

      event_service.getEventInvitationCode(event_id, async (err, result) => {
        if (err) {
          throw new Error(err);
        }

        if (
          result[0].invitation_code === null ||
          result[0].invitation_code === undefined ||
          result[0].invitation_code === ''
        ) {
          let temp = generateInvitationCode(event_id);
          await event_service.updateInvitationCode(event_id, temp);
          result[0].invitation_code = temp;
        }

        return res.status(200).json({
          success: 1,
          message: 'Get Invitation Code Success',
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
