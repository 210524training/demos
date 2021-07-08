import express from 'express';
import User from '../../models/user';

declare module 'express-session' {
  interface SessionData {
    user: User;
  }

  interface Session {
    isLoggedIn: boolean = false;
  }
}
