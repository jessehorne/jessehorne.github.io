angular.module("starter.controllers", ["ionic"])
	.controller("ListItController", function($scope, $ionicModal) {
		$scope.ListItItems = JSON.parse(window.localStorage["ListItItems"] ||
			'[]');

		$scope.AddItemCount = 0;

		$ionicModal.fromTemplateUrl("modal.html", {
			scope: $scope,
			animation: "slide-in-up"
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.openModal = function() {
			$scope.modal.show();
		};

		$scope.$on("$destroy", function() {
			$scope.model.remove()
		});

		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		$scope.$on("$destroy", function() {
			$scope.masdasdodal.remove()
		});

		$scope.AddItem = function(data) {

			$scope.ListItItems.push({
				task: data.newItem,
				status: "not done"
			});
			data.newItem = '';
			$scope.closeModal();
			$scope.SaveList();
		};

		$scope.NGSubmit = function() {

		};

		$scope.CleanUpItems = function() {
			$scope.ListItItems.splice($scope.ListItItems.length - 1, 1);
		};

		$scope.SaveList = function() {
			window.localStorage["ListItItems"] = JSON.stringify($scope.ListItItems);
		};
	});
