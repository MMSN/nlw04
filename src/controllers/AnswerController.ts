import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppErrors'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

class AnswerController {

    //http://localhost:3333/answers/4?u=a5841755-cb47-4072-b816-53a7b4d454ee

    async execute(request: Request, response: Response) {
        const { value } = request.params
        const { u } = request.query

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser) {
            throw new AppError("Survey user does not exists!")
        }

        surveyUser.value = Number(value) 

        await surveysUsersRepository.save(surveyUser)

        return response.status(200).json(surveyUser)
    }
}

export { AnswerController }