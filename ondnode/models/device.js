var connection = require(__base + 'config/mysql');
function Flyers() {
    this.register = function(req, res) {
    	var deviceInfo = req.body;
        connection.acquire(function(err, con){
            con.query('insert into ond_device_register set ?', deviceInfo, function(err, result){
                con.release();
                res.json(result);
            });
        });
    }
    
    this.addRegions = function(req, res) {
    	var regionsInfo = req.body;
        connection.acquire(function(err, con){
            con.query('insert into ond_device_regions set ?', regionsInfo, function(err, result){
        		con.release();
        		res.json(result);
            });
        });
    }    
}
module.exports = new Flyers();