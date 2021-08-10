import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}
class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    //Verificar se Email Existe
    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password Incorrect, Please Verify!");
    }
    // Verificiar se senha esta correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password Incorrect, Please Verify!");
    }
    // Gerar Token
    const token = sign(
      { email: user.email },
      "bb202fb78b3a8f3f2f0a4eb002fb1cea",
      { subject: user.id, expiresIn: "1d" }
    );
    return token;
  }
}

export { AuthenticateUserService };
