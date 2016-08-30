
module.exports = function(ngModule) {
    
  if (ON_TEST) {
    require('./basket.test')(ngModule);
  }

  ngModule.directive('basket', function() {
  	 require('./basket.less');
    return {
      restrict: 'E',
      scope: {},
      template: require('./basket.html'),
      controllerAs: 'basket',
      controller: function($scope, $rootScope){
        var basket = this;
        $scope.items = [];
        $scope.hasCheckedOut = false;

        $scope.$on("ADD_ITEM", function(event, item){
           $scope.items.push(item);
           $rootScope.$broadcast("UPDATE_TOTAL", {checkout_items:$scope.items, hasCheckedOut:$scope.hasCheckedOut});
        })

        $scope.removeItem = function(item){
        	$scope.items.pop(item);
        	$rootScope.$broadcast("UPDATE_TOTAL", {checkout_items:$scope.items, hasCheckedOut:$scope.hasCheckedOut});

        }

        $scope.checkout = function(items) {
        	$scope.hasCheckedOut = true;
        	$rootScope.$broadcast("UPDATE_TOTAL", {checkout_items:items, hasCheckedOut:$scope.hasCheckedOut});
        }
      }
    };
  });
};