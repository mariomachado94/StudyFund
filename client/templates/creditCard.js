Template.creditCard.helpers({
	cardType: function(brand) {
		switch(brand) {
			case "Visa":
				return "fa-cc-visa";
			case "American Express":
				return "fa-cc-amex";
			case "MasterCard":
				return "fa-cc-mastercard";
			case "Discover":
				return "fa-cc-discover";
			case "JCB":
				return "fa-cc-jcb";
			case "Diners Club":
				return "fa-cc-diners-club";
			default:
				return "fa-credit-card";
		}
	}
});