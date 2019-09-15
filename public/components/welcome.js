Vue.component('welcome', {
  props: ['user'],
  methods: {
    logout: function() {
      FJSClient.logout()
        .then(() => this.$emit('logout'))
        .catch(console.log);
    }
  },
  computed: {
    username: function() {
      const email = this.user.email;
      return email.substr(0, email.indexOf('@'));
    }
  },
  template: `
    <h3>Welcome, {{ username }} <button class="ghost" @click="logout">Logout</button></h3>
  `
});
