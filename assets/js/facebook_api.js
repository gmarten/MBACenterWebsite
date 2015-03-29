$(function() {
//alert();
var app_id = '580375555396764';
var scopes = 'email,public_profile';
var btn_login = '<div id="login" class="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="true" data-auto-logout-link="false"></div>';
var div_session = "<div id='facebook-session'>"+
					"<strong></strong>"+
					"<img>"+
					"<a href='#' id='logout'>Close Facebook Session</a>"+
					"</div>";
window.fbAsyncInit = function() {
	FB.init({
	appId : app_id,
	status : true,
	cookie : true,
	xfbml : true,
	version : 'v2.1'
});
	FB.getLoginStatus(function(response) {
	statusChangeCallback(response, function() {});
});
};
var statusChangeCallback = function(response, callback) {
	console.log(response);
	if (response.status === 'connected') {
	getFacebookData();
	} else {
	callback(false);
	}
}
var checkLoginState = function(callback) {
	FB.getLoginStatus(function(response) {
		callback(response);
	});
}
var getFacebookData = function() {
	
	FB.api('/me', function(response) {
		$('#login').after(div_session);
		$('#login').remove();
		//alert(response.name+" "+response.email);
		$("#new-account-name").val(response.name);
		$("#new-account-email").val(response.email);
		$("#new-account-phone").val(response.phone);
		//$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
		
	});
}

var facebookLogin = function() {
	checkLoginState(function(data) {
		if (data.status !== 'connected') {
			FB.login(function(response) {
		if (response.status === 'connected')
			getFacebookData();
		}, {scope: scopes});
		}
	})
}
var facebookLogout = function() {
	checkLoginState(function(data) {
	if (data.status === 'connected') {
		FB.logout(function(response) {
		$('#facebook-session').before(btn_login);
		$('#facebook-session').remove();
	})
	}
	})
}
$(document).on('click', '#login', function(e) {
	e.preventDefault();
	facebookLogin();
})
$(document).on('click', '#logout', function(e) {
	e.preventDefault();
	if (confirm("Do you really want to close session ?"))
		facebookLogout();
	else
	return false;
})
})