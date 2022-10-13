import mongoose, {Schema, Types} from 'mongoose'

interface IPost {
    title: string,
    excerpt: string,
    _html: string,
    author: Types.ObjectId,
    comments?: {
        user: string,
        content: string,
        date: Date
    }[],
    likes: number,
    tags: string[]
}

const PostSchema = new Schema<IPost>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        index: true,
        unique: true,
        maxLength: [140, 'Title shouldn\'t exceed 140 chars!'],
        trim: true
    },
    excerpt: {
        type: String,
    },
    _html: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            content: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true,
                default: Date.now()
            }
        }
    ]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})


exports.Post = mongoose.model<IPost>('Post', PostSchema)