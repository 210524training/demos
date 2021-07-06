/* eslint-disable max-classes-per-file */

export class NoUserFoundError extends Error {
  constructor(m?: string) {
    super(m);

    // Must set the prototype explicitly
    Object.setPrototypeOf(this, NoUserFoundError.prototype);
  }
}

export class NoUserMatchesUsernameError extends NoUserFoundError {
  constructor(m?: string) {
    super(m);

    // Must set the prototype explicitly
    Object.setPrototypeOf(this, NoUserMatchesUsernameError.prototype);
  }
}

export class AuthenticationError extends Error {
  constructor(m?: string) {
    super(m);

    // Must set the prototype explicitly
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class PasswordNotMatchesError extends AuthenticationError {
  constructor(m?: string) {
    super(m);

    // Must set the prototype explicitly
    Object.setPrototypeOf(this, PasswordNotMatchesError.prototype);
  }
}
