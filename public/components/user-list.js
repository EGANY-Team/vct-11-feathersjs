Vue.component('user-list', {
  data: function() {
    return {
      users: []
    };
  },
  created: function() {
    const UserService = FJSClient.service('users');

    // get user list
    UserService.find({
      query: {
        $sort: {
          createdAt: -1
        }
      }
    })
      .then(paginatedUser => {
        this.users = paginatedUser.data;
      })
      .catch(console.log);
    // subscribe to created event
    UserService.on('created', newUser => {
      this.users = [newUser, ...this.users];
    });
  },
  template: `
    <ol>
      <li v-for="user in users">{{ user.email }}</li>
    </ol>
  `
});
