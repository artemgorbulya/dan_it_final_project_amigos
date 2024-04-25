import mongoose from "mongoose";
import mongooseSeq from "mongoose-sequence";
import mongoosePaginate from 'mongoose-paginate-v2';

const autoIncrement = mongooseSeq(mongoose);

const eventSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    author: {
        type: Number,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        select: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        select: true
    },
    category: {
        type: Number,
        required: true,
        ref: "Category",
    },
    peopleWanted: {
        type: String,
        required: true,
        enum: ["girl", "boy", "company", "no matter"]
    },
    city: {
        type: Object,
        required: true,
    },
    address: {
        type: Object,
    },
    photo: {
        type: String,
        required: true,
    },
    photoPublicID: {
        type: String,
        required: true,
    },    
    applicants: [{
        type: Number,
        ref: "User"
    }],
    membersAllowed: [{
        type: Number,
        ref: "User"
    }],
    membersDenied: [{
        type: Number,
        ref: "User"
    }],
    dateStart: {
        type: Number,
        default: null,
    },
    dateEnd: {
        type: Number,
        default: null,
    },
    updateDate: Date,
}, {
    _id: false,
    timestamps: {
        createdAt: 'updateDate',
        updatedAt: "updateDate"
    }
});

eventSchema.plugin(autoIncrement, {
    id: 'eventsCounter'
});
eventSchema.plugin(mongoosePaginate);

export default mongoose.model('Event', eventSchema, "events");