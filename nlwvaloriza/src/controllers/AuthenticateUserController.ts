import {Request, Response} from 'express'
import { AuthenticatorUserService } from '../services/AuthenticateUserService'


class AuthenticateUserController {
    async handle(request: Request, response: Response){

        const { email, password} = request.body

        const authenticate = new AuthenticatorUserService()

        const token = await authenticate.execute({email, password})

        return response.json(token)

    }
}

export { AuthenticateUserController }