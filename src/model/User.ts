import mongoose, { Schema, Document, model } from 'mongoose'

export interface Message extends Document{
    content: string,
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export interface User extends Document{
    username: String,
    email: String,
    password: String,
    verifyToken: String,
    verifyTokenExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyToken: {
        type: String,
        required: [true, "Verify token is required"]
    },
    verifyTokenExpiry: {
        type: Date,
        required: [true, "Verify token expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema)

export default UserModel