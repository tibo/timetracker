app.controller("TrackController", function($scope){
	$scope.current_date = new Date();
	$scope.days = getDaysInMonth($scope.current_date.getMonth(),$scope.current_date.getFullYear());

	$scope.projects = [
		{
			id: 0,
			name: 'Mon projet 1'
		}, 
		{
			id: 1,
			name: 'Mon projet 2'
		}];

	$scope.times = [
	{
		project_id: 0,
		track_date: new Date(2014,5,2),
		time: 8
	}];

	$scope.time_filter = function (){
        return true;
    };

	$scope.previous = function() {
    	$scope.current_date.setMonth($scope.current_date.getMonth()-1);
    	$scope.days = getDaysInMonth($scope.current_date.getMonth(),$scope.current_date.getFullYear());
    	$scope.$apply();
    }

	$scope.next = function() {
        $scope.current_date.setMonth($scope.current_date.getMonth()+1);
        $scope.days = getDaysInMonth($scope.current_date.getMonth(),$scope.current_date.getFullYear());
    	$scope.$apply();
    }

	$scope.now = function() {
		$scope.current_date = new Date();
		$scope.days = getDaysInMonth($scope.current_date.getMonth(),$scope.current_date.getFullYear());
		$scope.$apply();
	}

    $scope.addProject = function() {
    	if ($scope.newProject != null && $scope.newProject != "") {
            $scope.projects.push({
                name: $scope.newProject,
            });
            $scope.newProject = ""
        }
    }

});