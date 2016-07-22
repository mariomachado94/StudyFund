Template.supportProject.events({
	"submit #support-form": function(event, template) {
		event.preventDefault();

		var submitButton = $('input[type="submit"]').button('loading');

		var contributeAmount = $('#contribute-amount').val();
		
		if (contributeAmount.length == 0) {
			alert("Please enter an amount to contribute");
			submitButton.button('reset');
		}
		else if (!($.isNumeric(contributeAmount))) {
			alert("Please enter an integer amount");
			submitButton.button('reset');
		} 
		else if (contributeAmount <= 0) {
			alert("Please enter an amount that is worth our time");
			submitButton.button('reset');
		}
		else if (!Number.isInteger(parseFloat(contributeAmount))) {
			alert("Fuck off with your cents");
			submitButton.button('reset');
		}
		else {
			contributeAmount = parseInt(contributeAmount);
			var cardVal = $('[name="card"]:checked').val();

			if(cardVal && cardVal != "new") {
				var card = cardVal;
				console.log("cardVal = " + cardVal);
				console.log("card = " + card);
				Meteor.call('supportProject', Session.get("currentProjectId"), card, contributeAmount, false, function (err) {
					if(err) {
						alert(err.error + "\n" + err.reason);
					} else {
						alert("Success!\nRemember your credit card will only be charged if the project is also a success");
					}
					FlowRouter.reload();
				});
			} else {
				var card = {
					number: $('[data-stripe="cardNumber"]').val(),
					exp_month: $('[data-stripe="expMo"]').val(),
					exp_year: $('[data-stripe="expYr"]').val(),
					cvc: $('[data-stripe="cvc"]').val()
				};

				STRIPE.getToken('#support-form', card, 
					function() {
						var token = $('[name="stripeToken"]').val();

						Meteor.call('supportProject', Session.get("currentProjectId"), token, contributeAmount, true, function (err) {
							if(err) {
								alert(err.error + "\n" + err.reason);
							} else {
								alert("Success!\nRemember your credit card will only be charged if the project is also a success");
							}
							submitButton.button('reset');
							FlowRouter.reload();
						});
				});
			}
		}
	},

	"checked": function(event) {
		if($('#new-card-radio').attr("checked")) {
			$('.new-card-data').removeAttr("disabled");
		} else {
			$('.new-card-data').attr("disabled", "disabled");
		}
	}
});

Template.supportProject.helpers({
	savedCreditCard: function() {
		if(Meteor.user().sources && Meteor.user().sources.length > 0) {
			console.log("There is a saved credit card on users account");
			return true;
		} else {
			console.log("No saved credit card on users account");
			return false;
		}
	},
	getSources: function() {
		return Meteor.user().sources;
	}
});