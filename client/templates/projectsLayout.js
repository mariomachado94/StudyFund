Session.set("loadMore", false);
Session.set("filterProjects", false);

amountToDisplay = 6;
Template.projectsLayout.helpers({
	calcPercentage: function(project) {
		var percentFunded = (project.currentAmountFunded / project.goal) * 100;
		project.percentFunded = Math.round(percentFunded);

		return project;
	},

	getfeaturedProject: function(Department) {
			return Projects.find({department: Department}, {limit: 1}).fetch();
	},
	department: function () {
		return FlowRouter.getQueryParam('department');
	},
	getDepartmentProjects: function(Department) {
		Session.set("loadMore", false)
		var projects;
		var trending = FlowRouter.getQueryParam('trending');

		if(Session.get("departmentName") != Department && Session.get('departmentName') != null){
			amountToDisplay = 6;
		}
		Session.set("departmentName", Department);

		//this will show all projects that have been completed
		if(FlowRouter.getQueryParam('department') == "ended"){
			projects = Projects.find({ended: true},{sort: {rand: 1}, limit: amountToDisplay});
			if(projects.count() < amountToDisplay){
					$(".LoadMore").hide();
			}
			return projects.fetch();
		}

		if(trending == "null" || trending == "" ){
			//works for when we first load page. takes department from URL which is passed through function
			console.log("got in null and department is = " + Department)

			projects = Projects.find({department: Department},{sort: {rand: 1}, limit: amountToDisplay});

			if(projects.count() < amountToDisplay){
					$(".LoadMore").hide();
				}
			return projects.fetch();
		}
		else{
			if(trending == "ending soon"){
				console.log("got in ES and department is = " + Department)
				window.localStorage.setItem("trending", null);
				projects = Projects.find({department: Department},{sort: {daysLeft: 1}, limit: amountToDisplay});
				if(projects.count() < amountToDisplay){
					$(".LoadMore").hide();
				}
				return projects.fetch();
			}
			else if(trending == "popular"){
				console.log("got in POP and department is = " + Department)
				window.localStorage.setItem("trending", null);
				projects = Projects.find({department: Department},{sort: {numberOfSupporters: -1}, limit: amountToDisplay});
				if(projects.count() < amountToDisplay){
					$(".LoadMore").hide();
				}
				return projects.fetch();
			}
			else if(trending == "most funded"){
				console.log("got in mostfunded and department is = " + Department)
				window.localStorage.setItem("trending", null);
				projects = Projects.find({department: Department},{sort: {currentAmountFunded: -1}, limit: amountToDisplay});
				if(projects.count() < amountToDisplay){
					$(".LoadMore").hide();
				}
				return projects.fetch();
			}
			else if(trending == "long term"){
				console.log("got in longterm and department is = " + Department)
				window.localStorage.setItem("trending", null);
				projects = Projects.find({department: Department},{sort: {daysLeft: -1}, limit: amountToDisplay});
				if(projects.count() < amountToDisplay){
					$(".LoadMore").hide();
				}
				return projects.fetch();
			}
		}
	},
	loadMore: function(){
		 return Session.get("loadMore")
	},
	checkProjectApproval: function(project){
		if (Meteor.userId() == "okgTwsvJqwHWDTuaC" 
		|| project.approved || project.userEmail == "Admin@studyfund.com"){
			return true;
		}
		else{
			return false;
		}
	},
	ended: function(){
		if(FlowRouter.getQueryParam('department') == "ended"){
			return true;
		}
		return false;
	}


});

Template.projectsLayout.events({
	"click .LoadMore": function(event){
		amountToDisplay += 6;
		Session.set("loadMore", true);
	},

	"click #filterProjects": function(e){
      	var department = $(".search.normal.selection.dropdown.departments a").text().toLowerCase();
      	var trending = $(".search.normal.selection.dropdown.trending a").text().toLowerCase();

      	if(department == "" || department == null){
      		department = FlowRouter.getQueryParam("department")
      		FlowRouter.go('/projects/', null, {department: department, trending: trending});
      	}
      	else{
      		FlowRouter.go('/projects/', null, {department: department, trending: trending});
      	}
	
	}
})

