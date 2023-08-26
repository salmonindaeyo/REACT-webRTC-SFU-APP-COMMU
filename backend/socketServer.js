const authSocket = require('./middleware/authSocket')
const newConnectionHandler = require('./socketHandlers/newConnectionHandler')
const disconnectHandler = require('./socketHandlers/disconnectHandler')


const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET','POST']
        }
    })

    //เมื่อคอนเน็ก จะไปวาลิเดท โทเค้นก่อน
    io.use((socket , next)=> {
        authSocket(socket ,next)
    })

    //ถ้าผ่านจะไปคอนเน็ก
    io.on('connection', (socket)=>{
        // console.log('user connected');
        // console.log(socket.id)

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