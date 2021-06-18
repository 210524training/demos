import User from "../../models/user";
import grubdashClient from "./grubdash.client";

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await grubdashClient.post<User>('/login', {
    username,
    password,
  });

  return user;
}