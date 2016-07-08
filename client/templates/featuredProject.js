Template.featuredProject.helpers({
	getUserPhoto: function(id){
		var user = Meteor.users.findOne({_id: id}, {fields: {"profile.picture":1}});
		return user.profile.picture;
	},
	calculateDaysLeft: function(id){
		var endDate = Projects.findOne(id).endDate;
		var todaysDate = new Date();
		var timeDiff = Math.abs(endDate.getTime() - todaysDate.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		if(diffDays <= 0){
			Meteor.call("updateProjectData",id, "ended", true);
			return "ENDED";		}
		else{
			return diffDays;
		}
	}
});