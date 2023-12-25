const app = require('./config/appConfig');
const http= require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io= new Server(server);
const dbConnect = require('./config/dbconfig');
const {URL,PORT} = require('./config/envConfig');
const  mongoose= require('mongoose');
const Chat = require('./models/chatModel')

io.on('connection',(socket)=>{
   
   socket.on('msg',async(data)=>{
      const sender = new mongoose.Types.ObjectId((data.sender.split('-'))[0]);
      const reciver = new mongoose.Types.ObjectId((data.reciver.split('-'))[0]);
      const content= data.msg;
      const newChat = {
          sender,
          reciver,content
      }
      console.log("a msg come...")
      const response = await Chat.create(newChat);
      io.to(data.reciver).to(data.sender).emit('msgToMe',data)
      
      
   })
   socket.on('joinRoom',(roomid)=>{
      socket.join(roomid);
   })

   
   socket.on('sendAllMsg',async(data)=>{
      const sender = new mongoose.Types.ObjectId((data.sender.split('-'))[0]);
      const reciver = new mongoose.Types.ObjectId((data.reciver.split('-'))[0]);

      const allChats= await Chat.find({sender:{$in:[sender,reciver]},reciver:{$in:[sender,reciver]}}).populate({path:'sender',select:{'_id':1,'username':1}})
      .populate({path:'reciver',select:{'_id':1,'username':1}}).exec();
       //console.log(allChats)
      io.to(data.sender).emit(("getAllChats"+data.reciver),allChats)
   })

})





server.listen((PORT),async()=>{
    await dbConnect(URL)
    console.log("http://localhost:3000")
    

})