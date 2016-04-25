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
		return Projects.find({department: Department}, {limit: 3}).fetch();
	},

});

