Template.homePage.helpers({
	getPopularProjects: function() {
		return Projects.find({}, {sort: {numberOfSupporters: -1}, limit: 3}).fetch();
	},

	getEndSoonProjects: function() {
		return Projects.find({ended: false}, {sort: {daysLeft: 1}, limit: 3}).fetch();
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