const connectedUsers = new Map();

const addNewConnectedUser = ({ socketId, userId}) => {
    connectedUsers.set(socketId , {userId})
    console.log('new connect users')
    console.log(connectedUsers)
}

const removeConnectedUser = (socketId)=>{
    if(connectedUsers.has(socketId)){
        connectedUsers.delete(socketId);
        console.log('users disconnect')
        console.log(connectedUsers)

    }
}
module.exports = {
    addNewConnectedUser,
    removeConnectedUser
}