var myApp = angular.module("ValidationPage",[]);
myApp.controller('validation', ['$scope', function($scope){

    $scope.gmail =
        {
            username: "",
            email: "",
            id:""
        };

    $scope.login = function () {

        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        var emailbool = $scope.validateEmail(email);
        if (emailbool == true)
        {
            if(password.length > 0)
            {
                alert("Login Successful");
                window.location.href = "./home.html";
            }
            else
            {
                alert("Please enter password");
            }
        }
        else {
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
        }
    }
    $scope.validateEmail = function(email) {
        var x = email;
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            alert("Please enter valid e-mail address");
            return false;
        }
        else {
            return true;
        }
    }

    $scope.OnGoogleLogin = function () {

        var params = {
            'clientid': '982152987253-r1pds1af2nt9bhoi5pjs52o3m8bgp2f6.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': function (result) {
                if (result['status']['signed_in']) {
                    var request = gapi.client.plus.people.get({
                        userId: 'me'
                    });
                    request.execute(function (resp) {
                        $scope.$apply(function () {
                            $scope.gmail.username = resp.displayName;
                            $scope.gmail.email = resp.emails[0].value;
                            $scope.gmail.id = resp.id;
                            localStorage.setItem("username",resp.displayName);
                            localStorage.setItem("email",resp.emails[0].value);
                            localStorage.setItem("id",resp.id);
                            if(localStorage.getItem("username").length > 0 && localStorage.length > 0
                                && localStorage.getItem("id").length > 0)
                            {
                                window.location.href = "./home.html";
                            }
                        });

                    });
                }

            },
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
            //'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(params);
    }
}]);
