Template.supportProject.helpers({
	calcPercentage: function(num, den) {
		console.log("calcPercentage called with num: " + num + " and den: " + den);
		var percentage = (num / den) * 100;
		return Math.round(percentage);
	},

	formatNumber: function(amount) {
		var sign = amount < 0 ? "-" : "", 
		i = parseInt(amount = Math.round(Math.abs(+amount || 0))) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
		return sign + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",");
	},
	getUserPhoto: function(id){
		var user = Meteor.users.findOne({_id: id}, {fields: {"profile.picture":1}});
		return user.profile.picture;
	}
});

Template.supportProject.events({
	"click .contribute-to-project": function (event, template) {
		var amount = template.$("#contribute-amount").val();
		var CreditCardType = template.$(".CreditCardType input[type='radio']:checked").val();
		var cvv = template.$("#cvv").val();
		var expiryDate = template.$("#expireMM option:selected").text() + " " + template.$("#expireYY option:selected").text();
		var comment = template.$("#userComment").val();
		
	},
	
});

$( "#myselect option:selected" ).text();