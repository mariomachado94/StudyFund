Template.homePage.helpers({
	getPopularProjects: function() {
		return Projects.find({}, {sort: {numberOfSupporters: -1}, limit: 3}).fetch();
	},

	getEndSoonProjects: function() {
		return Projects.find({}, {sort: {daysLeft: 1}, limit: 3}).fetch();
	}
});