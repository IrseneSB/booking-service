import { BaseService } from "./BaseService";
import { UserSchema } from "../models/schemas/UserSchema";
import type { UserEntity, CreateUserForm } from "../forms/user";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserSchema);
  }

  async signup(data: CreateUserForm): Promise<UserEntity | null> {
    const existing = await this.findByField("email", data.email.toLowerCase());
    if (existing) {
      return null;
    }

  const password_hash = await Bun.password.hash(data.password, {
    algorithm: "bcrypt",
    cost: Number(process.env.BCRYPT_COST) || 10,
  });

    const user = await this.create({ email: data.email.toLowerCase(), password_hash });
    return user;
  }

  async signin(data: { email: string; password: string }): Promise<UserEntity | null> {
    const user = await this.findByField("email", data.email);
    if (!user) {
      return null;
    }

    const isValid = await Bun.password.verify(data.password, user.password_hash);
    if (!isValid) {
      return null;
    }

    return user;
  }
}