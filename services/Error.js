class Error {
  constructor() {
    this.message = undefined;
    this.notSign = { status: 401, message: this.message || 'Incorrect username or password' };
    this.invalidToken = { status: 401, message: this.message || 'jwt malformed' };
    this.invalidEntries = { status: 400, message: this.message || 'Invalid entries. Try again.' };
  }
}

module.exports = Error;
