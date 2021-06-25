import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UserRespositories } from "../repositories/UserRepositories"

interface IComlimentRequest{
    tag_id: string
    user_sender: string
    user_receiver: string
    message: string
}

class CreateComplimentService {
    async execute({tag_id, user_sender, user_receiver, message}: IComlimentRequest){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const userRepository = getCustomRepository(UserRespositories)

        if(user_sender === user_receiver){
            throw new Error(" The User receiver cannot send messages to yourself")
        }

        const userReceiverExists = await userRepository.findOne({ id: user_receiver })

        if(!userReceiverExists){
            throw new Error("User Receiver does not exists")
        }

        const compliment = complimentsRepositories.create({tag_id, user_sender, user_receiver, message})

        await complimentsRepositories.save(compliment)

        return compliment
    }
}

export { CreateComplimentService }