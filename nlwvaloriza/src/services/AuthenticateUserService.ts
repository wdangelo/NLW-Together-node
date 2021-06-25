import { compare } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import { UserRespositories } from "../repositories/UserRepositories"
import { sign } from 'jsonwebtoken'



interface IAuthenticateRequest {
    email: string
    password: string
}

class AuthenticatorUserService {
    async execute({email, password}: IAuthenticateRequest){

        const userRepositories = getCustomRepository(UserRespositories)

        const user = await userRepositories.findOne({email})

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            email: user.email
        }, "fde00d9f2bd46e4d24353299efe276ff", {
            subject: user.id,
            expiresIn: "1d"
        })
        return token
    }
}

export { AuthenticatorUserService }