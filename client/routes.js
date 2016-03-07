FlowRouter.route('/', {
	  name: "home-page",
	  action:function(params){
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


FlowRouter.route('/discover', {
	  name: "discover-page",
	  action: function(params){
	  		BlazeLayout.render("mainLayout", {content: "discoverLayout"});
	  		//$('body').css('background-image','url(body-background.jpg)');

	  }
  });

FlowRouter.route('/Projects', {
	  name: "projects-page",
	  action: function(params){
	  		BlazeLayout.render("mainLayout", {content: "projectsLayout"});
	  }
  });

FlowRouter.route('/Project', {
	  name: "projects-page",
	  action: function(params){
	  		BlazeLayout.render("mainLayout", {content: "projectPage"});
	  }
  });

FlowRouter.route('/user', {
	action: function () {
		BlazeLayout.render("mainLayout", {content: "profilePage"})
	}
});

FlowRouter.route('/Begin', {
	action: function () {
		BlazeLayout.render("mainLayout", {content: "BeginResearch"})
	}
});

routeToProjects = function(){
  FlowRouter.route('/Projects', {
	  name: "projects-page",
	  action: function(params){
	  		BlazeLayout.render("projectsLayout");
	  }
  });
   FlowRouter.go('/Projects');

}

routeToProjectPage = function(){
  FlowRouter.route('/Project', {
	  name: "projects-page",
	  action: function(params){
	  		BlazeLayout.render("projectPage");
	  }
  });
   FlowRouter.go('/Project');

}