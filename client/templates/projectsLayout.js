Session.set("loadMore", false);
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
		return FlowRouter.getParam('department');
	},
	getDepartmentProjects: function(Department) {
		Session.set("loadMore", false);
		var projects;
		var trending = window.localStorage.getItem("trending");
		console.log("trending is " + trending)
		if(Session.get("departmentName") != Department && Session.get('departmentName') != null){
			amountToDisplay = 6;
		}
		console.log("in here")
		Session.set("departmentName", Department);
		if(trending == null || trending == ""){
			//works for when we first load page. takes department from URL which is passed through function
			console.log("got in null and department is = " + Department)

			projects = Projects.find({department: Department},{sort: {rand: 1}, limit: amountToDisplay});
			console.log("num of projects is " + projects.count())
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
		return Session.get("loadMore");
	},
	checkProjectApproval: function(project){
		if (Meteor.userId() == "okgTwsvJqwHWDTuaC" 
		|| project.approved || project.userEmail == "Admin@studyfund.com"){
			return true;
		}
		else{
			return false;
		}
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

      	if(department != "" && department != null){

			window.location.href = "/projects/"+department;
      	}
		window.localStorage.setItem("trending", trending);

	}
})

