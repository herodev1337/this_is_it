import { object, string, TypeOf} from "zod"

export const createUserSchema = object({
    body: object({
        username: string({required_error: "Username required!"}),
        password: string({required_error: "Password required!"}).min(8, "Password must be at least 8 characters long!"),
        passwordConfirm: string({required_error: "Password Confirmation required!"}),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords don't match!",
        path: ["passwordConfirm"]
    }),
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirm'>