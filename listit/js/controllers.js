angular.module("starter.controllers", ["ionic"])
  .controller("ListItController", function($scope, $ionicModal) {
    $scope.ListItItems = [];

    $ionicModal.fromTemplateUrl("modal.html", {
      scope: $scope,
      animation: "slide-in-up"
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.$on("$destroy", function() {
      $scope.modal.remove()
    });

    $scope.AddItem = function(data) {
      $scope.ListItItems.push({
        task: data.newItem,
        status: "not done"
      });
      data.newItem = '';
      $scope.closeModal();
    };
});
