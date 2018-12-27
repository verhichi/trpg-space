import io from 'socket.io-client';
const host = 'http://localhost:3000';

class socketAPI {
  socket;

  connect() {
    this.socket = io(host);
  }

  disconnect() {
    this.socket.disconnect(() => {
      this.socket = null;
    });
  }

  emit(event, data) {
    if (!this.socket){
      console.log('No socket connection.');
    } else {
      this.socket.emit(event, data);
    }
  }

  on(event, fun) {
    if (!this.socket){
      console.log('No socket connection.');
    } else {
      this.socket.on(event, fun);
    }
  }
}

const socketClient = new socketAPI();
export default socketClient;
