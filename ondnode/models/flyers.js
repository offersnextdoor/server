/**
 * http://usejsdoc.org/
 */

var connection = require(__base + 'config/mysql');
function Flyers() {
    this.get = function(req, res) {
        connection.acquire(function(err, con){
            con.query('select * from ond_flyers', function(err, result){
                con.release();
                res.json(result);
            });
        });
    }
    
    this.create = function(req, res) {
    	var flyerInfo = req.body;
    	connection.acquire(function(err, con){
    		con.query('insert into ond_flyers set ?', flyerInfo, function(err, result){
                con.release();
                res.json(result);
            });
    	});
    }

}
module.exports = new Flyers();