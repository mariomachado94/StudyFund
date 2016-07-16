Template.projectThumbNail.helpers({
	calcPercentage: function(num, den) {
		var percentage = (num / den) * 100;
		return Math.round(percentage);
	},

	formatNumber: function(amount) {
		var sign = amount < 0 ? "-" : "", 
		i = parseInt(amount = Math.round(Math.abs(+amount || 0))) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
		return sign + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",");
	},
	getUserPhoto: function(id){
		var user = Meteor.users.findOne(id);
		if(user.profile.picture != null){
			return user.profile.picture;
		}
		else{
			return "https://s3.amazonaws.com/jaydes-photos/defaultImages/placeholder-profile.png"; //edit this to point to URL in S3 later ****
		}
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