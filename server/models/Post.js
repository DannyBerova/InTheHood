const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    content: {
        type: Schema.Types.String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdOn: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    imageUrl: {
        type: Schema.Types.String, 
        default: "https://www.union.edu/files/union-marketing-layer/201803/picture.jpg"
    },
    stars: [{type: Schema.Types.String}],
    //category: {type: mongoose.Schema.Types.String},
    category: {type: Schema.Types.String, default: 'info'},
});

postSchema.path('title').validate(function () {
    return this.title.length >= 3 && this.title.length <= 30;
}, 'Name must be between 3 and 30 symbols!');
postSchema.path('content').validate(function () {
    return this.content.length >= 3 && this.content.length <= 10240;
}, 'Description must be between 3 and 1024 symbols!');

const Post = mongoose.model('Post', postSchema);
module.exports = Post;