const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryNames = ['info', 'event', 'gossip', 'fun', 'education', 'jobs', 'adminSays', 'other'];

const categorySchema = new Schema({
    name: {
        type: Schema.Types.String,
        enum: ['info', 'event', 'gossip', 'fun', 'education', 'jobs', 'adminSays', 'other'],
        default: 'info'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
});


const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
module.exports.seedCategory = () => {
    Category.find({}).then(categories => {
        if (categories.length > 0) return

        // let salt = encryption.generateSalt()
        // let password = encryption.generateHashedPassword(salt, '123456')

        Category.create({
            name: 'info',
            posts: []
        })
        Category.create({
            name: 'adminSays',
            posts: []
        })
        Category.create({
            name: 'gossip',
            posts: []
        })
        Category.create({
            name: 'event',
            posts: []
        })
        Category.create({
            name: 'fun',
            posts: []
        })
        Category.create({
            name: 'education',
            posts: []
        })
        Category.create({
            name: 'other',
            posts: []
        })
    })
}