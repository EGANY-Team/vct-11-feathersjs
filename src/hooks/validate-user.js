const { BadRequest } = require('@feathersjs/errors');
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const {
      data: { email, password }
    } = context;

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      throw BadRequest('Email must be non-empty string');
    }
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
      throw BadRequest('Password must be non-empty string');
    }

    context.data = {
      email: email.trim().toLowerCase(),
      password
    };

    return context;
  };
};
