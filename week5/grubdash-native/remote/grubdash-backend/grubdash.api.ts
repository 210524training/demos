import { Auth } from "aws-amplify";
import User from "../../models/user";
import grubdashClient from "./grubdash.client";

interface Error {
  message: string;
}
export const sendLogin = async (username: string, password: string): Promise<User> => {
  console.log(username, password);

  const session = await Auth.currentSession();

  const { data: user } = await grubdashClient.post<User>('/login', {
    username,
    password,
  }, {
    headers: {
      Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
    }
  });

  console.log(user);
  return user;
}

export const getAllUsers = async (): Promise<User[]> => {
  const { data: users } = await grubdashClient.get<User[]>('/api/v1/users');
  return users;

}