import mongoose from "mongoose";
import mongooseSeq from "mongoose-sequence";

const autoIncrement = mongooseSeq(mongoose);

const categorySchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: [true, 'Category name is required'],
        select: true
    },
    title: {
        type: String,
        required: [true, 'Category title is required'],
        select: true
    },
    icon: {
        type: String
    },
    background: {
        type: String
    },
    createDate: Date,
    updateDate: Date
}, {
    _id: false,
    timestamps: { createdAt: 'createDate', updatedAt: "updateDate" }
});

categorySchema.plugin(autoIncrement, {id: 'categoryCounter'});

export default mongoose.model('Category', categorySchema, "categories");