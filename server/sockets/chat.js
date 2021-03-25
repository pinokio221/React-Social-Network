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

const createNewDialog = async (msg) => {
  try {
    Dialog.query().insert({
      sendId: msg.authorId,
      receiveId: msg.receiveId,
      status: msg.status
    }).then(async function(res) {
      console.log(res)
      return io.emit('output-create-new-dialog', res)
    })

  } catch(err) {
    console.error(err);
  }
}


io.on('connection', function(socket) {
  socket.on('input-chat-message', msg => {
    sentMessage(msg);
  })
  socket.on('input-create-new-dialog', msg => {
    createNewDialog(msg);
  })
})


module.exports = io;
