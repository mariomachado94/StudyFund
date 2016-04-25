Template.featuredProject.helpers({
	getUserPhoto: function(id){
		var user = Meteor.users.findOne({_id: id}, {fields: {"profile.picture":1}});
		return user.profile.picture;
	}
});