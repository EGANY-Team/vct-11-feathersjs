Vue.component('user-form', {
  data: function() {
    return {
      email: '',
      password: '',
      mode: 'register',
      loading: false,
      error: ''
    };
  },
  methods: {
    handleSubmit: function() {
      this.loading = true;
      this.error = '';

      if (this.mode === 'register') {
        this.register();
      } else {
        this.login();
      }
    },
    login: function() {
      return FJSClient.authenticate({
        email: this.email,
        password: this.password,
        strategy: 'local'
      })

        .then(auth => this.$emit('login', auth))
        .catch(error => {
          this.error = error.message || 'Có lỗi xảy ra';
          this.loading = false;
        });
    },
    register: function() {
      return FJSClient.service('users')
        .create({
          email: this.email,
          password: this.password
        })
        .then(() => this.login())
        .catch(error => {
          this.error = error.message || 'Có lỗi xảy ra';
          this.loading = false;
        });
    },
    switchMode: function() {
      if (this.mode === 'register') {
        this.mode = 'login';
      } else {
        this.mode = 'register';
      }
    }
  },
  computed: {
    labels: function() {
      const formTitle = `${this.mode} form`;

      return {
        title: formTitle[0].toUpperCase() + formTitle.substring(1),
        main: this.mode.toUpperCase(),
        sub: `Switch to ${this.mode === 'register' ? 'Login' : 'Register'}`
      };
    }
  },
  template: `
    <form @submit.prevent="handleSubmit">
      <h3>{{labels.title}}</h3>
      <input
        type="email"
        required="true"
        placeholder="Enter your email"
        v-model="email"
        :disabled="loading"
      >
      <input
        type="password"
        required="true"
        placeholder="Enter your password"
        v-model="password"
        :disabled="loading"
      >
      <em v-if="error">{{ error }}</em>
      <button
        type="submit"
        :disabled="loading"
      >
        {{ labels.main }}
      </button>
      <button
        type="button"
        class="ghost"
        @click="switchMode"
        :disabled="loading"
      >
        {{ labels.sub }}
      </button>
    </form>
  `
});
