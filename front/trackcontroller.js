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

	$scope.times = JSON.parse(localStorage.getItem('times')) || [];

    $scope.allTimes = [];

    for (var i = $scope.projects.length - 1; i >= 0; i--) {
        $scope.allTimes[$scope.projects[i].id] = [];
    };

    for (var i = $scope.times.length - 1; i >= 0; i--) {
        var time = $scope.times[i];
        var date = new Date(time.track_date);//after adding in object it's not a date but a string, it suck !
        var dayNumber = date.getDate();// return the day number in a month... logic...
        $scope.allTimes[time.project_id][dayNumber - 1] = time.time;
    };

    window.toto = $scope.allTimes;

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

    $scope.addTime = function (day,project,index){

        console.log(day);
        console.log(project);
        console.log(index);

        var time = $scope.allTimes[project.id][index];
        if (time > 10) {
            time = 9;// Don't work too much ;)
            $scope.allTimes[project.id][index] = 9;
        };

        var editable;
        for (var i = $scope.times.length - 1; i >= 0; i--) {

            var timeInTimes = $scope.times[i];
            var date = new Date(timeInTimes.track_date);

            if (date.getDate() == day.getDate() && timeInTimes.project_id == project.id) {

                editable = $scope.times[i];
            };
            
        };
        if (editable) {
            editable.time = time;
        }
        else{
            $scope.times.push({project_id:project.id,track_date:day,time:time});
        }
        
        console.log($scope.times);

        localStorage.setItem('times', JSON.stringify($scope.times));
    }

});