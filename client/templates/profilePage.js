Template.profilePage.helpers({
	/*name: function() {
		var userId;
		var user;

		if (userId = Meteor.userId()) {
			user = Meteor.users.findOne(userId, {fields: {profile: 1}});
			if (user.profile.name) {
				console.log("There is a name, that name is " + user.profile.name);
				return user.profile.name;
			}
			else {
				console.log("no name, make it john doe");
				Meteor.users.update(userId, {$set:{"profile.name": "Jon Doe"}});
				user = Meteor.users.findOne(userId, {fields: {profile: 1}}); // check if you must call this again
				return user.profile.name;
			}
		}
		else {
			return "No user"
		}
	}, */
	user: function () {
		var userId;
		userId = FlowRouter.getParam('_id');
		return Meteor.users.findOne(userId, {fields: {profile: 1}});
	},
	thisUsersProfile: function() {
		if (Meteor.userId() === FlowRouter.getParam('_id')) {
			return true;
		}
		else {
			return false;
		}
	},
	getOwnedProjects: function(id) {
		return Meteor.Projects.find({}, {}).fetch()
	}
});

Template.profilePage.events({
	"click .save-changes": function (event, template) {
		var name = template.$("#name").val();
		var title = template.$("#title").val();
		var summary = template.$("#summary").val();
		var bio = template.$("#bio").val();
		var userId = Meteor.userId();

		Meteor.users.update(userId, {$set: {"profile.name": name, "profile.title": title, "profile.summary": summary, "profile.bio": bio}})
	}
});