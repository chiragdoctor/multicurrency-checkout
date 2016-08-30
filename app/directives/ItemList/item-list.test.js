module.exports = function(ngModule){

	describe('item lists test', function() {
		beforeEach(window.module(ngModule.name));

		it('should test properly', function() {
			expect(true).to.be.true;
		});
	});
}