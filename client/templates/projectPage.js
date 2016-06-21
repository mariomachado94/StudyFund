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
	},
	allowedToView: function(project){
		if(Meteor.userId() == "okgTwsvJqwHWDTuaC" 
		|| project.approved || project.userEmail == "Admin@studyfund.com")
		{ //check if admin or if approved or if posted by Admin
			return true;
		}
		return false;
	},
	calculateDaysLeft: function(id){
		var endDate = Projects.findOne(id).endDate;
		var todaysDate = new Date();
		var timeDiff = Math.abs(endDate.getTime() - todaysDate.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		if(diffDays <= 0){
			Meteor.call("removeProject", id)
		}
		else{
			return diffDays;
		}
	},
	AdminPosted: function(project){
		if(project.userEmail == "Admin@studyfund.com" || project.approved){
			return true;
		}
		return false;
	},
	getUsersSupportingProject: function(){
		project = Projects.findOne(FlowRouter.getParam('_id'));
		var array;
		Meteor.call("grabUsersSupportingProjectFromServer", project, function(error, result){
			if(error){
				console.log(error.reason);
    			return;
			}
			else{
				console.log("result is " + result)
				array = result;
			}
		});
		return array;
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
	},

	"click #approve": function(){
		var projectId = FlowRouter.getParam('_id');
		project = Projects.findOne(projectId);
		ownersArray = project.owner;
		$("#approve").remove();
		$("#reject").remove();
		endDate = new Date(Date.now() + project.funding_days * 24*60*60*1000);
		Meteor.call("updateProjectData", projectId, "endDate", endDate);
		Meteor.call("updateProjectData", projectId, "approved", true);
		Meteor.call("sendEmail", project.userEmail, "your project has been approved");
		Meteor.call("addCronJob", projectId);

		//ADD PROJECT TO ALL OWNERS DB ASSOCIATED TO PROJECT
		for(var i=0; i<ownersArray.length; i++){
			Meteor.call("appendToUsersDB", ownersArray[i], "profile.projectsPosted", projectId)
		}

	},
	"click #deny": function(){
		var projectId = FlowRouter.getParam('_id');
		project = Projects.findOne(projectId);
		$("#approve").hide();
		$("#reject").hide();
		Meteor.call("sendEmail", project.ownerEmail, "your project has been rejected");
		Meteor.call("removeProject", projectId);
	},
});