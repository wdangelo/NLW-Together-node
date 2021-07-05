import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { classToPlain  } from "class-transformer"



class ListUserService {
    async execute() {
        const userRepositories = await getCustomRepository(UserRepositories)

        const users = await userRepositories.find()

        return classToPlain(users)
    }
}

export { ListUserService } 