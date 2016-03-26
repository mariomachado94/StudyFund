Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-edit-profile': function(event) {
		FlowRouter.go('profile-page', {_id: Meteor.userId()});
	}
});