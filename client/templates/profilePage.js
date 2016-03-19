Template.profilePage.helpers({
	name: function() {
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
	},
	title: function () {
		var userId;
		var user;

		if (userId = Meteor.userId()) {
			user = Meteor.users.findOne(userId, {fields: {profile: 1}});
			if (user.profile.title) {
				console.log("There is a title, that title is " + user.profile.title);
				return user.profile.title;
			}
			else {
				console.log("no title, initialize it as an empty string");
				Meteor.users.update(userId, {$set:{"profile.title": "PhD"}});
				user = Meteor.users.findOne(userId, {fields: {profile: 1}}); // check if you must call this again
				return user.profile.title;
			}
		}
		else {
			return "No user"
		}
	}
});