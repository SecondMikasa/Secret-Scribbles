import { Message } from "./interfaces"

export interface ApiResponse{
    success: boolean,
    message: string,
    isAcceptingMessages?: boolean
    messages?: Array<Message>
}