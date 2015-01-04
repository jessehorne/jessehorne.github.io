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
			$sccope.modal.show();
		};

		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		$scope.$on("$destroy", function() {
			$scope.masdasdodal.remove()
		});

		$scope.AddItem = function(data) {
			if ($scope.AddItemCount > 2) {
				$scope.AddItemCount = 0;
				$scope.CleanUpItems();
			} else {
				$scope.AddItemCount += 1;
			}
			var $scope = angular.element(el).scope();
			ope.modal.show();
		};

		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		$scope.$on("$destroy", function() {
			$scope.masdasdodal.remove()
		});

		$scope.AddItem = function(data) {
			if ($scope.AddItemCount > 2) {
				$scope.AddItemCount = 0;
				$scope.CleanUpItems();
			} else {
				$scope.AddItemCount += 1;
			}

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

		$scope.CleanUpItems = function() {
			$scope.ListItItems.splice($scope.ListItItems.length - 1, 1);
		};

		$scope.SaveList = function() {
			window.localStorage["ListItItems"] = JSON.stringify($scope.ListItItems);
		};
	});
