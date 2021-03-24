const chatController = require('../controllers/chat.controller');
const Message = require('../models/Message');
const Dialog = require('../models/Dialog');
const User = require('../models/User');

const io = require('socket.io')( {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const sentMessage = async (msg) => {
  console.log(msg)
  try {
    Message.query().insert({
      author: msg.authorId,
      dialogId: msg.dialogId,
      content: msg.chatMessage
    }).then(async function(res){
      let dialogUser = await chatController.returnDialogUser(msg.authorId);
      res.authorData = dialogUser;
      return io.emit('output-chat-message', res)
    })
  } catch(err){
    console.error(err);
  }
}


io.on('connection', function(socket) {
  socket.on('input-chat-message', msg => {
      sentMessage(msg);
  })
})


module.exports = io;
