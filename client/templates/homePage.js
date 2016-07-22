Template.homePage.helpers({
	getPopularProjects: function() {
		return Projects.find({approved:true}, {sort: {numberOfSupporters: -1}, limit: 3});
		
	},

	getEndSoonProjects: function() {
		var projects = Projects.find({ended: false},{approved:true}, {sort: {daysLeft: 1}, limit: 3});
		console.log("projects num is _ " + projects.count())
		return projects.fetch();
	}
});