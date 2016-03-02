var async = require('async');
var connection = require(__base + 'config/mysql');
function Account() {
    this.create = function(req, res) {
    	this.accountInfo = req.body;
    	var _self = this;
    	connection.acquire(function(err, con){
    		async.waterfall([
    		    async.apply(_self._doCreateAccount, _self.accountInfo, con),
    		    _self._doCreateAdminUser
    		], function(err, result){
    			console.log('4');
    			con.release();
    			res.json(result);
    		});
    	});
    	
        this._doCreateAccount= function(accountInfo, con, callback) {
        	console.log('1');
        	var account = {};
        	account.name = accountInfo.name ? accountInfo.name : null;
        	account.logo = accountInfo.logo ? accountInfo.logo : null;
        	account.link = accountInfo.link ? accountInfo.link : null;
        	con.query('insert into ond_accounts set ?', account, function(err, result){
        		if (err) {
        		      // handle error
        		      console.log(err);
        		      return;  
    		    }
        		accountInfo.account_id = result.insertId;
        		console.log('2');
                callback(null, accountInfo, con);
            });
        }
        
        this._doCreateAdminUser = function(accountInfo, con, callback){
        	console.log('3');
        	var user = {};
        	user.account_id = accountInfo.account_id ? accountInfo.account_id : null;
        	user.first_name = accountInfo.first_name ? accountInfo.first_name : null;
        	user.last_name = accountInfo.last_name ? accountInfo.last_name : null;
        	user.login_id = accountInfo.login_id ? accountInfo.login_id : null;
        	user.password = accountInfo.password ? accountInfo.password : null;
        	user.phone_no = accountInfo.phone_no ? accountInfo.phone_no : null;
        	console.log(user);
        	con.query('insert into ond_account_users set ?', user, function(err, result){
        		if (err) {
        		      // handle error
        		      console.log(err);
        		      return;  
    		    }
        		callback(null, result);
        	});
        }
    }
    
    this.createBranch = function(req, res) {
    	var branchInfo = req.body;
    	connection.acquire(function(err, con){
            con.query('insert into ond_account_branches set ?', branchInfo, function(err, result){
                con.release();
                res.json(result);
            });
        });
    }
}
module.exports = new Account();