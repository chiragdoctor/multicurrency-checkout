
module.exports = function(ngModule) {
    
  var items = require('../../data/items.js');

  if (ON_TEST) {
    require('./item-list.test')(ngModule);
  }

  ngModule.directive('itemList', function() {
  	require('./item-list.less');

    return {
      restrict: 'E',
      scope: {},
      template: require('./item-list.html'),
      controllerAs: 'itemList',
      controller: function($scope, $rootScope) {
        var itemList = this;
        $scope.items = items;
        
        $scope.addItem = function(item) {
          $rootScope.$broadcast("ADD_ITEM", item);
        }
      }
    };
  });
};