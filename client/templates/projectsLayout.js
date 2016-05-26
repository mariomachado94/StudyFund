Session.set("loadMore", false);
var amountToDisplay = 6;
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
		console.log(FlowRouter.getParam('department'))
		return FlowRouter.getParam('department');
	},
	getDepartmentProjects: function(Department) {
		Session.set("loadMore", false);
		var department = Department;
		console.log("Department is = " + Department)
		if(Session.get("departmentName") != department && Session.get('departmentName') != null){
			amountToDisplay = 6;
			console.log("got int here")
		}
		Session.set("departmentName", department);
		return Projects.find({department: Department},{sort: {daysLeft: 1}, limit: amountToDisplay}).fetch();
	},
	loadMore: function(){
		return Session.get("loadMore");
	}


});

Template.projectsLayout.events({
	"click .LoadMore": function(event){
		amountToDisplay += 6;
		Session.set("loadMore", true);
	}
})

