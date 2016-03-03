/**
 * http://usejsdoc.org/
 */
var async = require('async');
var connection = require(__base + 'config/mysql');
var s3 = require('../utils/S3Client');
var queries = require('./queries');
var fs = require('fs');
var BUCKET = 'ondflyers';
var TABLES = {
		"OND_FLYERS" : "ond_flyers",
		"OND_FLYER_ASSETS":"ond_flyer_assets"
}
function Flyers() {
    this.get = function(req, res) {
		async.waterfall([
		    getFlyers,
		    getAssets
 		], function(err, result){
 			res.json(result);
 		});    	
    	
		function getFlyers(callback) {
	        connection.acquire(function(err, con){
	            con.query(queries.getSelectAllQuery(TABLES.OND_FLYERS), function(err, result){
	                con.release();
	                callback(null, result);
	            });
	        });
		}
		
		function getAssets(flyers, callback) {
			async.each(flyers, function(flyer, _callback) {
				connection.acquire(function(err, con){
		            con.query(queries.getAssetsOfFlyer(), [flyer.id], function(err, result){
		            	con.release();
		            	flyer.assets = result;
		                _callback();
		            });
		        });	
			}, function(err) {
				callback(null, flyers);
			});
		}
    };
    
    this.create = function(req, res) {
    	var flyerInfo = req.body;
    	connection.acquire(function(err, con){
    		con.query(queries.getInsertQuery(TABLES.OND_FLYERS), flyerInfo, function(err, result){
                con.release();
                res.json(result);
            });
    	});
    };
    
    this.upload = function(req, res) {
    	var file = req.file;
    	var assetInfo = req.body;
		async.waterfall([
		    async.apply(getFlyerInfo, file, assetInfo),
		    uploadFile,
		    createAsset
		], function(err, result){
			res.json(result);
		});
    	
    	function getFlyerInfo(file, assetInfo, callback){
    		connection.acquire(function(err, con){
    			con.query(queries.getFlyerBucketQuery(),  assetInfo.flyer_id, function(err, result){
    				assetInfo.account = result[0].account;
    				assetInfo.branch = result[0].branch;
    				assetInfo.flyer = result[0].flyer;
    				con.release();
    				callback(null, file, assetInfo);
    			});
    		});
    	}
    	
    	function uploadFile(file, assetInfo, callback) {
        	var params =  {
            		Bucket : BUCKET,
        			Key: assetInfo.account + '/' + assetInfo.branch + '/' + assetInfo.flyer + '/' + file.originalname,
        			Body: fs.createReadStream(file.path),
        			ACL:'public-read',
        			ContentType: file.mimetype
        		};
			s3.uploadFileStream(params, function(err, s3Url) {
				fs.unlink(file.path);
				file.s3Url = s3Url;
				callback(null, file, assetInfo);
			});
    	}
    	
    	function createAsset(file, assetInfo, callback) {
    		var asset = {};
    		asset.flyer_id = assetInfo.flyer_id;
    		asset.url = file.s3Url;
    		asset.tag = assetInfo.tag;
    		asset.title = assetInfo.title;
    		asset.description = assetInfo.description;
    		connection.acquire(function(err, con){
    			con.query(queries.getInsertQuery(TABLES.OND_FLYER_ASSETS), asset, function(err, result){
    				result.url = file.s3Url;
    				con.release();
    				callback(null, result);
    			});
    		});
    	}
    };
}
module.exports = new Flyers();