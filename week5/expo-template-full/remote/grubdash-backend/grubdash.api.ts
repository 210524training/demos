import User from "../../models/user";
import grubdashClient from "./grubdash.client";

interface Error {
  message: string;
}
export const sendLogin = async (username: string, password: string): Promise<User | undefined> => {
  console.log(username, password);
  const { data: user } = await grubdashClient.post<User>('/login', {
    username,
    password,
  })
  console.log(user);
  return user;

}

export const getAllUsers = async (): Promise<User[]> => {
  const { data: users } = await grubdashClient.get<User[]>('/api/v1/users');
  return users;

}