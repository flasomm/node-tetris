function gameSocket() {
  var socket = io.connect('http://localhost:3000');
  
  this.test = function(){
    socket.on('game', function (data) {
      console.log(data.length);
      socket.emit('my other event', { my: 'data' });
    });    
  }
}

var gameSocket = new gameSocket();
gameSocket.test();