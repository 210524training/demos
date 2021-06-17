import React, { ChangeEvent, FormEvent, useState } from 'react';
import User from '../../../models/user';
import grubdashClient from '../../../remote/grubdash-backend/grubdash.client';

const LoginPage: React.FC<unknown> = (props) => {

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send an Axios Request

    const response = await grubdashClient.post<User>('/login', {
      username,
      password,
    });

    console.log(response.data);
  }

  return (
    <div className='container' id='register-form'>
      <form onSubmit={handleFormSubmit} >
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="usernameInput"
            onChange={handleUsernameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordInput"
            onChange={handlePasswordChange} />
        </div>
        <input type="submit" className="btn btn-primary" value='Submit' />
      </form>
    </div>
  );
};

export default LoginPage;