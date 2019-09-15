// init socket.io connection
const socket = io();
// init feathersjs client
const FJSClient = feathers();

// connect to realtime api
FJSClient.configure(feathers.socketio(socket));
// register authentication methods
FJSClient.configure(feathers.authentication());

const app = new Vue({
  el: '#root',
  data: {
    auth: null
  },
  methods: {
    login: function(authObj) {
      this.auth = authObj;
    },
    logout: function() {
      this.auth = null;
    }
  },
  created: function() {
    // authenticate with default token (in localstorage)
    FJSClient.authenticate()
      .then(authObj => {
        this.auth = authObj;
      })
      .catch(console.log);
  }
});
