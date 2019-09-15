// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { result: { email, verificationCode }} = context;

    // Implement send email here
    console.log(`Email sent to ${email}. Verification code: ${verificationCode}`);

    return context;
  };
};
