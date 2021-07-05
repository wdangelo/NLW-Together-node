import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    //Receber o token

    const authtoken = request.headers.authorization
    
    const [, token] = authtoken.split(" ")
    
    if(!authtoken){
        return response.status(401).end()
    }

    // Verificar se o token é valido
    try{
        const { sub } = verify(token, "fde00d9f2bd46e4d24353299efe276ff") as IPayload

    //Recuperar informações do usuário
        request.user_id = sub

        return next()

    }catch(err){
        return response.status(401).end()
    }



    

    }