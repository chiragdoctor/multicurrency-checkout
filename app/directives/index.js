module.exports = function(ngModule){
	require('./itemList/item-list')(ngModule);
	require('./basket/basket')(ngModule);
	require('./checkout/checkout')(ngModule);
}