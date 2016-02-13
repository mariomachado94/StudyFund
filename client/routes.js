FlowRouter.route('/', {
  	action: function() {
    	BlazeLayout.render("mainLayout", {content: "homePage"});
  	}
});

FlowRouter.route('/signup', {
	action: function() {
    	BlazeLayout.render("mainLayout", {content: "signupPage"});
  	}
});

FlowRouter.route('/login', {
	action: function () {
		BlazeLayout.render("mainLayout", {content: "loginPage"})
	}
});

