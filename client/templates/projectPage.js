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