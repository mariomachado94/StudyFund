Template.signupPage.events({
	'submit form': function(event, template) {
		event.preventDefault();

		let user = {
			email: template.find( '[name="email"]' ).value,
      		password: template.find( '[name="password"]' ).value,
      		profile: {name: template.find( '[name="name"]' ).value}
		};

		Accounts.createUser(user, function(error) {
			if(error) {
				alert("WTF?!\n" + error.reason);
			} else {
				FlowRouter.go("home-page");
			}
		});
	}
});