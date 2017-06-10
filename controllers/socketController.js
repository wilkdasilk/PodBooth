var controllers = require('../controllers');

var numClients ={};

function connect (io, socket) {
  socket.chunks = [];
  socket.on('room', function(room){
    socket.room = room;
    socket.join(room);
    if (numClients[room] == undefined) {
      numClients[room] =1;
    } else {
      numClients[room]++;
    }
    io.sockets.in(room).emit('stats', { numClients: numClients[room] });
    console.log(`connection in room ${room}!`);
    console.log('Connected clients:', numClients[room]);
    socket.broadcast.to(socket.room).emit('announcements', { message: 'A new user has joined!' });
  });

  socket.on('event', function(data){
    console.log('A client sent us this message:', data.message);
    controllers.comments.create(data.message)
      .then(function(comment) {
        comment
          .populate('_owner', function(err, doc){
            if (err){
              console.log("error populating comment", err);
              socket.broadcast.to(socket.room).emit('message', { message: comment });
              socket.emit('message', { message: comment });
            } else {
              socket.broadcast.to(socket.room).emit('message', { message: doc });
              socket.emit('message', { message: doc });
            }
          });
      });
  });

  socket.on('upvote', function(data){
    console.log('A client sent us this upvote:', data.upvote);
    controllers.comments.upvote(data.upvote)
      .then(function(upvote) {
        console.log(upvote);
        socket.broadcast.to(socket.room).emit('upvote', { upvote: upvote });
        socket.emit('upvote', { upvote: upvote } );
      });
  });
  socket.on('unvote', function(data){
    console.log('A client sent us this unvote:', data.unvote);
    controllers.comments.unvote(data.unvote)
      .then(function(comment) {
        console.log(comment);
        socket.broadcast.to(socket.room).emit('unvote', { unvote: comment });
        socket.emit('unvote', { unvote: comment } );
      });
  });
  socket.on('streamSource', function(data) {
    socket.broadcast.to(socket.room).emit('liveStream', { liveStream: data });
    socket.emit('liveStream', { liveStream: data });
  });

  socket.on('disconnect', function(){
    socket.leave(socket.room);
    numClients[socket.room]--;
    io.sockets.in(socket.room).emit('stats', { numClients: numClients[socket.room] });
    console.log('Connected clients:', numClients[socket.room]);
  });

}

module.exports = {
  connect: connect
};
