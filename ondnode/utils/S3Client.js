var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAICLH7UMGZCZTN22A',
  secretAccessKey: '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'
});

var s3 = new AWS.S3();

exports.listBuckets = function(callback) {
  s3.listBuckets(function(err, data) {
    if (err){
      console.log(err, err.stack);
      callback(err);
    }  
    else{
      console.log(data);
      callback(null,data);
    }  
  });
}


exports.uploadFileStream = function(params, callback) {
  s3.upload(params, function(err, data) {
      if (err){
        console.log("An error occurred", err);
        callback(err);
      } else{
        console.log("Uploaded the file at", data.Location);
        callback(null, data.Location);
      }
  });
}

exports.getPresignedUrl = function(params, callback) {
  s3.getSignedUrl('putObject', params, function(err, url) {
    if (err){
      console.log("An error occurred", err);
      callback(err);
    } else {
      console.log("Got signed url ", url);
      callback(null, url);
    }
  });
}


exports.getFile = function(params, callback) {
  callback(s3.getObject(params));
}

exports.client = s3;
