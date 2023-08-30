const authSocket = require('./middleware/authSocket')
const newConnectionHandler = require('./socketHandlers/newConnectionHandler')
const disconnectHandler = require('./socketHandlers/disconnectHandler')


const serverStore = require('./serverStore')

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET','POST']
        }
    })

    serverStore.setSocketServerInstance(io)

    //เมื่อคอนเน็ก จะไปวาลิเดท โทเค้นก่อน
    io.use((socket , next)=> {
        // console.log(socket.user)
        authSocket(socket ,next)
    })

    //ถ้าผ่านจะไปคอนเน็ก
    io.on('connection', (socket)=>{
       
        console.log(socket.handshake.auth)
        //เวลาที่มี connect มาจะไปเพิ ่มเข้า store
        newConnectionHandler(socket , io)

        socket.on('disconnect',()=>{
            disconnectHandler(socket)
        })
    })
}

module.exports = {
    registerSocketServer,
}

