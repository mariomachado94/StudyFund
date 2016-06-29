Template.loginPage.events({
	'submit form': function(event, template) {
		event.preventDefault();

		let user = template.find( '[name="email"]' ).value;
		let password = template.find( '[name="password"]' ).value;

		Meteor.loginWithPassword(user, password, function(error) {
			if (error) {
				alert(error.reason);
			} else {
				FlowRouter.go("home-page");
			}
		});
	}
});