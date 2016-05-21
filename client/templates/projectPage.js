/*Template.projectPage.onRendered(function(){
	Meteor.call('populateProjectPage', projectId);
});
*/
Template.projectPage.helpers({
	project: function(){
		if (projectId = FlowRouter.getParam('_id')) {
			return Projects.findOne(projectId);
		}
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