Template.supportProject.events({
	"submit #support-form": function(event, template) {
		event.preventDefault();

		var card = {
			number: $('[data-stripe="cardNumber"]').val(),
			exp_month: $('[data-stripe="expMo"]').val(),
			exp_year: $('[data-stripe="expYr"]').val(),
			cvc: $('[data-stripe="cvc"]').val()
		};

		var contributeAmount = parseInt($('[data-stripe="contribute-amount"]').val());

		STRIPE.getToken('#support-form', card, 
		function() {

			var customer = {
				email: Meteor.user().emails[0].address,
				token: $('[name="stripeToken"]').val()
			};

			var submitButton = $('input[type="submit"]').button('loading');

			Meteor.call('createStripeCustomer', customer, function(error){
				if (error) {
					alert(error.reason);
					submitButton.button('reset');
				} else {		
					submitButton.button('reset');
					alert("New customer created!");
					Meteor.call("addSupporter", Session.get("currentProjectId"), {_id: Meteor.userId(), amount: contributeAmount})
				}
			});
		});
	}
});