import io from 'socket.io-client';
// const host = 'http://localhost:3000';
// const host = 'https://6c8a8534.ngrok.io';

class socketAPI {
  socket;

  connect() {
    // this.socket = io(host); // Specfifying host url when using local environment causes error on smart devices.
    this.socket = io();
  }

  disconnect() {
    this.socket.disconnect();
  }

  isConnected() {
    return this.socket.connected;
  }

  emit(event, ...data) {
    if (!this.socket){
      console.log('No socket connection.');
    } else {
      return new Promise((resolve, reject) => {
        this.socket.emit(event, ...data);
        resolve();
      });
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
