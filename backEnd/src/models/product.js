const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true,
    },
    quantity:{
        type:Number,
        require:true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    offers: {
        type: Number,
    },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String,
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require:true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User',require:true  },
    updatedAt: Date,


}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);