import mongoose, {Model, Schema} from 'mongoose'
const bcrypt = require('bcrypt')

interface IUser {
    name: string,
    email: string,
    password: string,
    permission: 'user' | 'author' | 'admin',
    favourites: Array<string | undefined>
}

interface IUserMethods {
    comparePassword(password: string): Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        default: 'Anonymous Hiddener',
        index: true,
        validate: {
            validator: (v: string) => /\w*\s\w*/i.test(v),
            message: 'Please enter full name!'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (e: string) => /^\S+@\S+\.\S+$/i.test(e),
            message: 'Enter valid email!'
        }
    },
    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 chars long!'],
        required: [true, 'Password is required!'],
    },
    permission: {
        type: String,
        enum: ['user', 'author', 'admin'],
        default: 'user'
    },
    favourites: {
        type: [Schema.Types.ObjectId],
        ref: 'Post'
    }
})

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    }catch (err: any) {
        return next(err)
    }
})

UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model<IUser, UserModel>('User', UserSchema)
