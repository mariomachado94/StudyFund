Template.supportProject.events({
	"submit #support-form": function(event, template) {
		event.preventDefault();

		var submitButton = $('input[type="submit"]').button('loading');

		var card = {
			number: $('[data-stripe="cardNumber"]').val(),
			exp_month: $('[data-stripe="expMo"]').val(),
			exp_year: $('[data-stripe="expYr"]').val(),
			cvc: $('[data-stripe="cvc"]').val()
		};

		var contributeAmount = parseInt($('[data-stripe="contribute-amount"]').val());

		STRIPE.getToken('#support-form', card, 
		function() {
			var token = $('[name="stripeToken"]').val();

			Meteor.call('supportProject', Session.get("currentProjectId"), token, contributeAmount, function (err) {
				if(err) {
					alert(err.error + "\n" + err.reason);
				} else {
					Meteor.call("appendToUsersDB", Meteor.userId(), "profile.projectsSupported", Session.get("currentProjectId"))
					Meteor.call("appendToProjectData", Session.get("currentProjectId"), "usersContributedID", Meteor.userId())
					Meteor.call("appendToProjectData", Session.get("currentProjectId"), "usersContributedAmount",contributeAmount)
					alert("Success!\nRemember your credit card will only be charged if the project is also a success");
				}
				FlowRouter.reload();
			});
		});
	}
});