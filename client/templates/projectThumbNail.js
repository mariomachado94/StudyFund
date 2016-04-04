Template.projectThumbNail.helpers({
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
	}
});