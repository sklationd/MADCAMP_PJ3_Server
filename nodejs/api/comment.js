var express  = require('express');
var router   = express.Router();
var User     = require('../models/User');
var util     = require('../util');
var Comment  = require('../models/Comment');

/****************************************************
    <post comment>
    USAGE: URL~/api/comment/USERNAME
    HEADER: TOKEN
    BODY:
    {
        "videoId":"d6KcPeGfufs",
        "comment":"노래 좋네요!"
    }
****************************************************/
router.post('/:username', util.isLoggedin, checkPermission, function(req,res,next){
  var newComment = new Comment(req.body);
  console.log(newComment);
  newComment.username = req.params.username;
  newComment.save(function(err,comment){
    res.json(err||!comment? util.successFalse(err): util.successTrue(comment));
  });
});

/****************************************************
    <get comment by video id>
    USAGE: URL~/api/comment/
    HEADER: TOKEN
    BODY: 
    {
        "videoId":"adfadsfasdf"
    }

****************************************************/
router.get('/', util.isLoggedin, function(req,res,next){
  Comment.find({videoId:req.body.videoId})
  .sort({createdAt:1}) //가장 최근에 작성한게 먼저 나옴
  .exec(function(err,comment){
    res.json(err||!comment? util.successFalse(err): util.successTrue(comment));
  });
});

module.exports = router;

// private functions
function checkPermission(req,res,next){
  User.findOne({username:req.params.username}, function(err,user){
    if(err||!user) return res.json(util.successFalse(err));
    else if(!req.decoded || user._id != req.decoded._id)
      return res.json(util.successFalse(null,'You don\'t have permission'));
    else next();
  });
}
