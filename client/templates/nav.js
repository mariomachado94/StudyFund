Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-profile': function(event) {
		FlowRouter.go('profile-page', {_id: Meteor.userId()});
	}
});

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'name',
        fieldLabel: 'Name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your name");
            return false;
          } else {
            return true;
          }
        }
    }]
});