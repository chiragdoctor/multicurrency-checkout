module.exports = function(ngModule) {
    
  if (ON_TEST) {
    require('./checkout.test')(ngModule);
  }

  var conversion = require('../../services/conversion')();

  ngModule.directive('checkout', function() {
  	require('./checkout.less');
  	
    return {
      restrict: 'E',
      scope: {},
      template: require('./checkout.html'),
      controllerAs: 'checkout',
      controller: function($scope, $rootScope, $http){
        var checkout = this;
        $scope.amount = 0;
        $scope.exchangeRate = {};
        checkout.currentCurrency;

        $scope.showTotalAmount = true;


        $scope.data = {
		    currency: null,
		    availableCurrencies: []
   		};

   		$scope.selectedCurency = function(item){
   			checkout.currentCurrency = item;
        $scope.amount = ($scope.exchangeRate[item] * $scope.amount).toFixed(2);
      }

      $scope.$on("UPDATE_TOTAL", function(event, items){
          $scope.showTotalAmount = items.hasCheckedOut;
        
          if($scope.showTotalAmount)
            $scope.amount = calculateAmount(items.checkout_items).toFixed(2);
      });

      var calculateAmount = function(items) {
      	var amount = 0;
      	items.map(function(item){
      		return amount += item.price; 
      	});
      	return  $scope.exchangeRate[checkout.currentCurrency ? checkout.currentCurrency : "GBP"] * amount ;
      }

    	conversion.getExchangeRate($http)
			.then(function(response){
				$scope.exchangeRate = conversion.serializeQuotes(response.data);
		    	if ($scope.exchangeRate["GBP"]) {
		            var gbpQuote = $scope.exchangeRate["GBP"];
		            for(var quote in $scope.exchangeRate) {
		              $scope.exchangeRate[quote] = ($scope.exchangeRate[quote] / gbpQuote).toFixed(2);
		              $scope.data.availableCurrencies.push(
		                { 
		                  id : quote, 
		                  name:quote 
		                }
		              );
		              }

		              $scope.data.currency = $scope.data.availableCurrencies.filter(function(item){
		              return item.id === "GBP";
		            }).pop().id;
		            }
		        else {
		              return new Error('No Quotes found for GBP!!');  
		        }
			});

      }
    };
  });
};