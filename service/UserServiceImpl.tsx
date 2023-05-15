import UserModel from '../models/user.model';
import { User } from "next-auth";
import { UserService } from "./UserService";

export class UserServiceImpl implements UserService {
  async signInCredentials(email: string, password: string): Promise<User> {
    const user = await UserModel.findOne({ email });
    
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }

    return user as User;
  }
}

export const userService = new UserServiceImpl();
