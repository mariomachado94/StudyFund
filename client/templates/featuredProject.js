Template.featuredProject.helpers({
	getUserPhoto: function(id){
		var user = Meteor.users.findOne({_id: id}, {fields: {"profile.picture":1}});
		return user.profile.picture;
	},
	calculateDaysLeft: function(id){
		var project = Projects.findOne(id);
		var endDate = Projects.findOne(id).endDate;
		var todaysDate = new Date();
		var diffDays;
		var timeDiff = endDate.getTime() - todaysDate.getTime();
		if(timeDiff < 0){
			diffDays = 0;
			if(!project.ended){
				Meteor.call("updateProjectData",id, "ended", true);
			}
			return "ENDED";
		}
		else{
			diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			return diffDays;

		}
	}
});