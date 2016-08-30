module.exports = function(ngModule){
	var chai = require('chai'), 
		spies = require('chai-spies'),
		expect = chai.expect,
		assert = chai.assert,
		element,
		scope, 
		should = chai.should(),
		rootScope,
		mockItems = require('../../data/items.js');;

	describe('Basket ', function() {
		beforeEach(window.module(ngModule.name));

		beforeEach(inject(function($compile, $rootScope) {
			rootScope = $rootScope;
	        element = angular.element("<basket></basket>");
	        $compile(element)(rootScope.$new());
	        controller = element.controller;
	        scope = element.isolateScope() || element.scope()
	        chai.use(spies);
    	}))

     	it('should receive ADD_ITEM message when item is added to basket', function() {
    		rootScope.$broadcast("ADD_ITEM", mockItems[1]);
    		scope.$digest();

    		var spy = chai.spy.on(scope, '$on'); 
    	});

    	it('should publish update total message after item added', function() {
    		rootScope.$broadcast("ADD_ITEM", {});
    		var spy = chai.spy.on(rootScope, '$broadcast');
    		scope.$digest();
    		expect(spy).to.have.been.called;
    	});

    	it('should remove item from the basket', function() {
    		scope.items = mockItems;
    		var itemsLength = scope.items.length;
    		scope.removeItem(mockItems[0]);
    		expect(scope.items.length).to.equal(itemsLength - 1);
    	});

    	it('should publish update total message after item is removed', function() {
    		scope.items = mockItems;
    		var itemsLength = scope.items.length;
    		var spy = chai.spy.on(rootScope, '$broadcast');

    		scope.removeItem(mockItems[0]);	
    		scope.$digest();    		
    		expect(spy).to.have.been.called;
    	});

    	it('should set the value of hasCheckedOut to true once user clicks on checkout', function() {
    		scope.checkout(mockItems);
    		expect(scope.hasCheckedOut).to.be.true;
    	});

    	it('should publish update total message after user clicks on checkout', function() {
    		var spy = chai.spy.on(rootScope, '$broadcast');
    		scope.checkout(mockItems);

    		scope.$digest();
    		expect(spy).to.have.been.called;
    	});

	});
}