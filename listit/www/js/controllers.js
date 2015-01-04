angular.module("starter.controllers", ["ionic"])
	.controller("ListItController", function($scope, $ionicModal) {
		$scope.ListItItems = JSON.parse(window.localStorage["ListItItems"] ||
			'[]')

		$ionicModal.fromTemplateUrl("modal.html", {
			scope: $scope,
			animation: "slide-in-up"
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.openModal = function() {
			$scope.modal.show();
		};

		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		$scope.$on("$destroy", function() {
			$scope.masdasdodal.remove()
		});

		AddItem = function(el) {
			var $scope = angular.element(el).scope();
			$scope.ListItItems.push({
				task: $scope.data.newItem,
				status: "not done"
			});
			$scope.data.newItem = '';
			$scope.closeModal();
			$scope.SaveList();
		};

		$scope.NGSubmit = function() {

		};

		$scope.SaveList = function() {
			window.localStorage["ListItItems"] = JSON.stringify($scope.ListItItems);
		};
	});
