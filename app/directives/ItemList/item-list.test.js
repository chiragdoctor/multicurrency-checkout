module.exports = function(ngModule){
	var chai = require('chai'), 
		spies = require('chai-spies'),
		expect = chai.expect,
		assert = chai.assert,
		element,
		scope, 
		should = chai.should(),
		rootScope;

	describe('item lists test', function() {
		beforeEach(window.module(ngModule.name));

		beforeEach(inject(function($compile, $rootScope) {
			rootScope = $rootScope;
	        element = angular.element("<item-list></item-list>");
	        $compile(element)(rootScope.$new());
	        controller = element.controller;
	        scope = element.isolateScope() || element.scope()
	        
	        chai.use(spies);
    	}))

    	it('should get atlest 4 items from json list', function(){
    		expect(scope.items.length).to.not.be.undefined;
			expect(scope.items.length).to.equal(4);
    	})

		it('should broadcast a add item when item is added to basket', function() {
			var spy = chai.spy.on(rootScope, '$broadcast');
			scope.addItem();
			scope.$digest();
			expect(spy).to.have.been.called;
		});
	});
}