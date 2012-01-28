function gameSocket() {
  var socket = io.connect('http://localhost:3000');
  
  this.test = function(){
    socket.on('game', function (data) {
      console.log("data:"+data.player);
      socket.emit('my other event', { my: 'data' });
    });    
  }
}

var gameSocket = new gameSocket();
gameSocket.test();