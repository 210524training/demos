export default interface User {
  username: string,
  password: string,
  role: Role,
  address: string ,
  phoneNumber: string,
  id: string,

}

export type Role = 'Customer' | 'Admin';