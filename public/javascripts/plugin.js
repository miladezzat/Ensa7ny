$(".button-collapse").sideNav();
$(document).ready(function(){
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();
});

//disapled button after submitted
$('form').submit(function() {
	$(this).find("button[type='submit']").prop('disabled',true);
});


//facebook sdk
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = 'https://connect.facebook.net/ar_AR/sdk.js#xfbml=1&autoLogAppEvents=1&version=v2.12&appId=147826179171551';
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));