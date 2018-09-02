var app = angular.module('notesApp', ['ngMaterial', 'ui.grid']);

app.controller('notesController', function ($scope,$mdDialog) {

    // Initial Data
    $scope.createdOn = Date.now();
    $scope.title = "Title";
    $scope.text = "";
    $scope.textDisplay = "";
    $scope.notes = [];
    $scope.update = false;

    // Add New Note
    $scope.addNote = function () {
        
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'AddNotesPage.html',
        })
    };
   
    $scope.removeItem = function removeItem(row) {
        var index = $scope.notes.indexOf(row);
        if (index !== -1) {
            $scope.notes.splice(index, 1);
        }
    };

    // Edit Note
    $scope.EditNotes = function (row) {
        $scope.text = row.text;
        $scope.title = row.title;
        $scope.textDisplay = row.text;
        $scope.update = true;
        $scope.index = $scope.notes.indexOf(row);

        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'AddNotesPage.html',
        }).then(function () {
            $scope.update = false;
            $scope.text = "";
            $scope.title = "Title";
            $scope.textDisplay = "";
        })
       

    };

    // End Controller
}


);
app.controller('AddNotesController', function ($scope, $mdDialog)
{
    $scope.save = function (title, text) {
        if ($scope.update == true) {
            $scope.notes[$scope.index].text = text;
            if (text.substring(31, 32) != null)
                $scope.newNote.textDisplay = text.substring(0, 30) + "..."
            else
                $scope.newNote.textDisplay = text.substring(0, 30);
            $scope.notes[$scope.index].title = title;
            $scope.update = false;
            $mdDialog.hide();
            $scope.refresh();
           
        }
        else {
            $scope.newNote = {};
            $scope.newNote.title = title;
            $scope.newNote.text = text;
            if (text.substring(31, 32) != null)
                $scope.newNote.textDisplay = text.substring(0, 30) + "..."
            else
                $scope.newNote.textDisplay = text.substring(0,30);
            $scope.notes.push($scope.newNote);
            $scope.newNote = {};
            $mdDialog.hide();
            $scope.refresh();
        }

    };
    $scope.cancel = function () {
        $mdDialog.hide();
    };
});