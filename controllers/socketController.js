var numClients ={};

function connect (io, socket) {
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
    socket.broadcast.to(socket.room).emit('message', { message: data.message });
    socket.emit('message', {message: `You said... ${data.message}`} );
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
