const { Notification } = require("../models/notification");

class NotificationController {

    async getNotify(req, res) {
    const { _id } = req.user;

    try {
      const data = await Notification.find({ reciever_id: _id }).sort({
        createdAt: -1,
      });

      if (data.length === 0) {
        return res.status(404).json({ message: "No notifications found." });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Something went wrong :(",
          error: error.message || error,
        });
    }
  }

  async updateNotify (req,res){
    const {id} = req.params;
    const { view } = req.body;
    try {
        const data = await Notification.findByIdAndUpdate(id, {view: view});

        if(!data){
            return res.status(404).json({message: "Couldn't access the otification"})
        }

        return res.status(200).json({message: "Marked as viewed :) "})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong :( ", error: error.message || error})
    }
   


  }
}

module.exports = { NotificationController };
