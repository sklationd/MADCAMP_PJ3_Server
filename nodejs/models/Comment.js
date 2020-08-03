var mongoose = require('mongoose');
// schema
var commentSchema = mongoose.Schema({
    username: {type:String, required:true},                     //작성자
    videoId: {type:String, required:true},                      //댓글 달린 동영상 id
    comment: {type:String, required:true},                      //댓글 내용
    createdAt: {type:Date, default:Date.now}                    //작성 시간
});

// model & export
var Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;

