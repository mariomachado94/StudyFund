/*Template.projectPage.onRendered(function(){
	Meteor.call('populateProjectPage', projectId);
});
*/
Template.projectPage.helpers({
	project: function(){
		if (projectId = FlowRouter.getParam('_id')) {
			return Projects.findOne(projectId);
		}
	},
	formatNumber: function(amount) {
		var sign = amount < 0 ? "-" : "", 
		i = parseInt(amount = Math.round(Math.abs(+amount || 0))) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
		return sign + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",");
	}
});

Template.projectPage.events({
	"click #support": function() {
		if(Meteor.userId()) {
			var projectId = FlowRouter.getParam('_id');
			Session.set("currentProjectId", projectId)
			BlazeLayout.render("mainLayout", {content: "supportProject"});
		}
		else {
			BlazeLayout.render("mainLayout", {content: "signupPage"});
		}
	}
});