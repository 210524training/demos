import User from "../../models/user";
import grubdashClient from "./grubdash.client";

export const sendLogin = async (username: string, password: string): Promise<User | undefined> => {
  console.log(username, password);
  const { data: user } = await grubdashClient.post<User>('/login', {
    username,
    password,
  })
  console.log(user);
  return user;

}