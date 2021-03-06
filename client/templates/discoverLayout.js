Template.discoverLayout.helpers({
	calcPercentage: function(project) {
		var percentFunded = (project.currentAmountFunded / project.goal) * 100;
		project.percentFunded = Math.round(percentFunded);

		return project;
	},

	getfeaturedProjects: function() {
			return Projects.find({approved:true}, {sort: {rand: 1}, limit: 1}).fetch();
	}

});

Template.discoverLayout.events({
	"click .categoryLink": function(event){
		var department = $(event.target).text();
		var trimmedDepartment = $.trim(department.toLowerCase());
		FlowRouter.go('/projects/', null, {department: trimmedDepartment, trending: ""});
	}

});


Template.featuredProject.helpers({
	getUserPhoto: function(id){
		var user = Meteor.users.findOne({_id: id}, {fields: {"profile.picture":1}});
		return user.profile.picture;
	}

});