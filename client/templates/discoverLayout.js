Template.discoverLayout.helpers({
	calcPercentage: function(project) {
		var percentFunded = (project.currentAmountFunded / project.goal) * 100;
		project.percentFunded = Math.round(percentFunded);

		return project;
	},

	getfeaturedProjects: function() {
			return Projects.find({}, {sort: {rand: 1}, limit: 3}).fetch();
	},

});
Template.featuredProject.helpers({
	getUserPhoto: function(id){
		var user = Meteor.users.findOne({_id: id}, {fields: {"profile.picture":1}});
		return user.profile.picture;
		}
});