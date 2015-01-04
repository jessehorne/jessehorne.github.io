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
			$scope.model.remove()
		});

		$scope.AddItem = function(data) {
			$scope.AddItemCount += 1;

			$scope.ListItItems.push({
				task: data.newItem,
				status: "not done"
			});
			data.newItem = '';
			$scope.closeModal();
			$scope.SaveList();

			if ($scope.AddItemCount === 2) {
				$scope.AddItemCount = 0;
				$scope.CleanUpItems();
			}
		};

		$scope.NGSubmit = function() {

		};

		$scope.CleanUpItems = function() {
			$scope.ListItItems.pop();
		};

		$scope.SaveList = function() {
			window.localStorage["ListItItems"] = JSON.stringify($scope.ListItItems);
		};
	});
