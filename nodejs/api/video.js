var express  = require('express');
var router   = express.Router();
var User     = require('../models/User');
var util     = require('../util');
var Video  = require('../models/Video');

/****************************************************
    <create video>
    USAGE: URL~/api/video
    HEADER: TOKEN
    BODY:
    {
        "username":"skla",
        "videoId":"d6KcPeGfufs",
        "genre":3,
        "description":"Diamonds 노래 좋음"
    }
****************************************************/
router.post('/', util.isLoggedin, function(req,res,next){
  var newVideo = new Video(req.body);
  //console.log(newVideo);
  newVideo.save(function(err,video){
    res.json(err||!video? util.successFalse(err): util.successTrue(video));
  });
});

/****************************************************
    <get by genre>
    USAGE: URL~/api/video/GENRE
    HEADER: TOKEN
****************************************************/
router.get('/:genre', util.isLoggedin, function(req,res,next){
  Video.find({genre:req.params.genre})
  .sort({createdAt:-1})
  .exec(function(err,video){
    res.json(err||!video? util.successFalse(err): util.successTrue(video));
  });
});

/**************************************************** 
    <get all video>
    USAGE: URL~/api/video
    HEADER: TOKEN
****************************************************/
router.get('/', util.isLoggedin, function(req,res,next){
    Video.find()
    .sort({genre:1, createdAt:-1})
    .exec(function(err,video){
      res.json(err||!video? util.successFalse(err): util.successTrue(video));
    });
  });

/**************************************************** 
    <delete video by id>
    USAGE: URL~/api/video/USERNAME
    HEADER: TOKEN
    BODY:
    {
        "videoId":~
    }
****************************************************/
 router.delete('/:username', util.isLoggedin, checkPermission, function(req,res,next){
    Comment.remove({videoId:req.params.videoId},(err, data) => function(err, data){
        if(err) throw err;
        console.log("delete all comment");
    });
  Video.findOneAndRemove({username:req.params.username, name:req.body.videoId})
  .exec(function(err,video){
    res.json(err||!user? util.successFalse(err): util.successTrue(video));
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
