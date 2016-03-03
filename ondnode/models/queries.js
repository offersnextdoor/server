/**
 * http://usejsdoc.org/
 */
exports.getFlyerBucketQuery = function() {
	return "select a.id 'account', b.id 'branch', f.id 'flyer' " +
	"from ond_accounts a, ond_account_branches b, ond_flyers f " +
	"where f.applicable_id = b.id and b.account_id = a.id " +
	"and f.applicable_type = 'branch' "+
	"and f.id = ?"; 
}

exports.getInsertQuery = function(table){
	return "insert into " + table + " set ?";
}

exports.getSelectAllQuery = function(table){
	return "select * from " + table;
}

exports.getAssetsOfFlyer = function() {
	return "select * from ond_flyer_assets where flyer_id = ?";
}

exports.getSelectFlyersQuery = function(){
	return "select flyers.*, assets.* " +
		"from ond_flyers flyers, ond_flyer_assets assets " +
		"where flyers.id = assets.flyer_id ";
}
