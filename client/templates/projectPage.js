/*Template.projectPage.onRendered(function(){
	Meteor.call('populateProjectPage', projectId);
});
*/
Template.projectPage.helpers({


	project: function(){

		console.log("trying to get in there")
		if (projectId = FlowRouter.getParam('_id')) {
			console.log("in here with id " + projectId)
			return Projects.findOne(projectId);
		}
	}
});