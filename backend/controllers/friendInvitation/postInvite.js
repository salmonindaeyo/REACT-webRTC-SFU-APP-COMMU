const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");

const postInvite = async (req, res) => {
    const { targetMailAddress } = req.body;
    const { userId , mail } = req.user;
    console.log(req.user)
    // check if friend that we would like to invite is not user

    if (mail.toLowerCase() === targetMailAddress.toLowerCase()){
        return res.status(409).send('Sorry you cant not become frinde with your self')
    }

    const targetUser = await User.findOne({
        mail: targetMailAddress.toLowerCase()
    })

    if (!targetUser) {
        return res
          .status(404)
          .send(
            `Friend of ${targetMailAddress} has not been found. Please check mail address.`
          );
      }

      // check if invitation has been already sent


   return res.send("controller is working")

}

module.exports = postInvite