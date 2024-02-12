import { ITokens } from "./tokens.interface"

export interface AuthResult {
    user: {
        email: string
    },
    tokens: ITokens
}

