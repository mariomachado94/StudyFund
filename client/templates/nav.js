Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-profile': function(event) {
		FlowRouter.go('profile-page', {_id: Meteor.userId()});
	}
});

Template.nav.events({
    'submit .search': function(event) {
        event.preventDefault();

        const querytext = event.target.query.value;

        FlowRouter.go('search', null, {q: querytext});
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