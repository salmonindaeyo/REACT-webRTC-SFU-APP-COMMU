const serverStore = require("../serverStore")
const friendsUpdate = require("../socketHandlers/updates/friends");

const newConnectionHandler = async (socket , io) => {
   const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId,

    })
    
    // Update friends invitation list
    friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);
    // Update friends list
    friendsUpdate.updateFriends(userDetails.userId);

}



module.exports = newConnectionHandler