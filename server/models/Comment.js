const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: Schema.Types.String,
        required: true,
    },
    postId: {
        type: Schema.Types.String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.String,
        required: true,
    },
    createdOn: {
        type: Schema.Types.Date,
        default: Date.now,
    },
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
