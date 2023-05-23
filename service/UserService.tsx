import { User } from "next-auth";
export interface UserService {
  signInCredentials(email: string, password: string): Promise<User> | User;
}