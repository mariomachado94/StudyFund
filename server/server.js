Meteor.publish("allUserProfiles", function () {
    return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.startup(function() {
	return Meteor.methods({
		removeAllPosts: function() {
			return Projects.remove({});
		}

    });
});