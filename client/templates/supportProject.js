Template.supportProject.events({
	"submit #support-form": function(event, template) {
		event.preventDefault();

		console.log("support form was submitted")

		var card = {
			number: $('[data-stripe="cardNumber"]').val(),
			exp_month: $('[data-stripe="expMo"]').val(),
			exp_year: $('[data-stripe="expYr"]').val(),
			cvc: $('[data-stripe="cvc"]').val()
		};

		var contributeAmount = $('[data-stripe="contribute-amount"]').val();

		console.log(card);

		STRIPE.getToken( '#support-form', card, 
		function() {

			console.log(Meteor.user().emails[0].address);

			var customer = {
				email: Meteor.user().emails[0].address,
				token: $('[name="stripeToken"]').val()
			};

			var submitButton = $('input[type="submit"]').button('loading');

			Meteor.call('createStripeCustomer', customer, function(error){
				if (error) {
					alert(error.reason);
					submitButton.button('reset');
					$("#support-form" ).remove( $( "<input type='hidden' name='stripeToken' />" ));
				} else {		
					submitButton.button('reset');
					$("#support-form" ).remove( $( "<input type='hidden' name='stripeToken' />" ));
					//Show Success! thanks for suppoting page

					Meteor.call("appendToProjectData", Session.get("currentProjectId"), "backers", {_id: Meteor.userId(), amount: contributeAmount})
				}
			});
		});
	}
});