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
			return "../placeholder-profile.png"; //edit this to point to URL in S3 later ****
		}
	},
	calculateDaysLeft: function(id){
		var endDate = Projects.findOne(id).endDate;
		var todaysDate = new Date();
		var timeDiff = Math.abs(endDate.getTime() - todaysDate.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		if(diffDays <= 0){
			Meteor.call("removeProject", id)
		}
		else{
			return diffDays;
		}
	}

});