import mongoose from "mongoose";
import mongooseSeq from "mongoose-sequence";
import mongoosePaginate from 'mongoose-paginate-v2';
import {languages} from "../../constants/index";

const autoIncrement = mongooseSeq(mongoose);

const userSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        select: true,
        immutable: true,
    },
    password: {
        type: String,
        required: true,
        select: true,
    },
    firstName: {
        type: String,
        select: true,
        minLength: 2,
        maxLength: 20,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    birthday: {
        type: Number,
        required: true,
    },
    country: { 
        type: String,
        required: true,
    },
    city: {
        type: String,
        select: true,
        validate: [/\D/, 'Only letters can be in city field'],
        required: true,
    },
    mobile: {
        type: String,
        required: true,  
    },
    about: String,
    languages: [{
        type: String,
        enum: languages,
    }],
    registrationDate: Date,
    updateDate: Date,
    photos: [{
        photoURL: String,
        photoID: String,
    }],
    events: [{ 
        type: Number, 
        ref: 'Event',
    }],
    sentEvents: [{
        type: Number,
        ref: "Event",
    }],
    appliedEvents: [{
        type: Number,
        ref: "Event",
    }],
    deniedEvents: [{
        type: Number,
        ref: "Event",
    }],
    chatrooms: [{
        type: String,
        ref: "Chatroom"
    }],
    lastSeen: Number,
}, {
    _id: false,
    timestamps: { createdAt: 'registrationDate', updatedAt: 'updateDate' }
});

userSchema.plugin(autoIncrement, {id: 'usersCounter'});
userSchema.plugin(mongoosePaginate);

export default mongoose.model('User', userSchema, "users");