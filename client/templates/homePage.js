Template.homePage.helpers({
	calcPercentage: function(project) {
		var percentFunded = (project.currentAmountFunded / project.goal) * 100;
		project.percentFunded = Math.round(percentFunded);

		return project;
	},

	getPopularProjects: function() {
		return Projects.find({}, {sort: {numberOfSupporters: -1}, limit: 3}).fetch();
	},

	getEndSoonProjects: function() {
		return Projects.find({}, {sort: {daysLeft: 1}, limit: 3}).fetch();
	}
});