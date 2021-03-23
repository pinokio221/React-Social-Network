const io = require('socket.io')( {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

/*io.use(function(socket, next){
  sessionMiddleWare(socket.request, socket.request.res, next);
});*/

io.on('connection', socket => {
  socket.on('send-message', msg => {
    console.log(msg)
  })
})


module.exports = io;
