module.exports = function(ngModule){
	var chai = require('chai'), 
		spies = require('chai-spies'),
		expect = chai.expect,
		assert = chai.assert,
		element,
		scope, 
		should = chai.should(),
		rootScope,
		conversion = require('../../services/conversion');

	describe('checkout test', function() {
		var getExchangeRateSpy,
			exhcangeRateAPICallSpy,
			scopeOnSpy,
			mockResponse,
			mockItems,
			mockExchangeRate;

		mockResponse = {
		success: true,
		terms: "https://currencylayer.com/terms",
		privacy: "https://currencylayer.com/privacy",
		timestamp: 1472561707,
		source: "USD",
		quotes: {
			USDGBP: 0.763197,
			USDUSD: 1,
			USDAUD: 1.326297,
			USDCAD: 1.305301,
			USDPLN: 3.896201,
			USDMXN: 18.643601
			}
		};
		mockItems = require('../../data/items')
		mockExchangeRate = {GBP: 1.00, USD: 1.31, AUD: 1.74, CAD: 1.71, PLN: 5.12}

		beforeEach(window.module(ngModule.name));

		beforeEach(inject(function($compile, $rootScope, $httpBackend) {
			rootScope = $rootScope;
	        element = angular.element("<checkout></checkout>");
	        $compile(element)(rootScope.$new());
	        controller = element.controller;
	        scope = element.isolateScope() || element.scope()
	        
	        chai.use(spies);
	        $httpBackend.whenGET('http://apilayer.net/api/live?access_key=0978b5df440844908f7c3e081f7495bf&currencies=GBP,USD,AUD,CAD,PLN,MXN&format=1')
	        			.respond(200, mockResponse);

			getExchangeRate = chai.spy(conversion.getExchangeRate);
			scopeOnSpy = chai.spy.on(scope, '$on');
    		scope.exchangeRate = mockExchangeRate;

    	}))

    	it('should have checkout amount as 0 at init', function(){
    		expect(scope.amount).to.be.equal(0)
    	})

		it('should call to get exchange rate', function() {
			expect(getExchangeRate).to.have.been.called;
		});

		it('should update total in event of message subscribed', function() {
			rootScope.$broadcast("UPDATE_TOTAL", {hasCheckedOut: true, checkout_items: mockItems});
			scope.selectedCurency("GBP");
    		scope.$digest();
    		expect(getExchangeRate).to.have.been.called;
    		expect(scope.showTotalAmount).to.be.true;
    		expect(scope.amount).to.be.defined;
		});
	});
}