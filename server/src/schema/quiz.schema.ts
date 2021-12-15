import { array, boolean, object, string } from "zod"

export const createQuizSchema = object({
    body: object({
        name: string(),
        instructions: string(),
        isEnabled: boolean(),
        questions: array(object({
            question: string(),
            answers: array(object({
                answer: string(),
                correct: boolean()
            })),
            isEnabled: boolean(),
            explanation: string()
        }))
    })
})
