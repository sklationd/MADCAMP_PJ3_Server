var mongoose = require('mongoose');
// schema
var videoSchema = mongoose.Schema({
    username: {type:String, required:true},
    videoId: {type:String, required:true, unique: true},
    genre: {type: Number,
            required:true,
            enum: [0,1,2,3,4,5,6,7]}, //hiphop:0, girls:1, locking:2, poppin:3, waacking:4, urban: 5, house: 6, krump : 7
    description: {type:String},
    createdAt: {type:Date, default:Date.now}
});

// model & export
var Video = mongoose.model('video',videoSchema);
module.exports = Video;

