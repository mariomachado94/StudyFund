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
		var supporters;
		Meteor.call("grabUsersSupportingProjectFromServer", project, function(error, result){
			if(error){
				console.log(error.reason);
    			return;
			}
			else{
				console.log("result is " + result)
				Session.set("result",result);
			}
		});
		supporters = Session.get("result");
		return supporters;
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
			FlowRouter.go("signup");
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

Template.Comments.helpers({
	comments: function() {
	    const instance = Template.instance();
	    if (instance.state.get('hideCompleted')) {
	      // If hide completed is checked, filter tasks
	      return Comments.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
	    }
	    return Comments.find({}, { sort: { createdAt: -1 } });

	},

  	incompleteCount: function() {
    	return Comments.find({ checked: { $ne: true } }).count();
  	}

});

Template.Comments.onCreated(function CommentsOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('Comments');

});

Template.Comments.events({
  'submit .new-comment'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a comment into the collection

    Meteor.call('Comments.insert', text);

 
    // Clear form
    target.text.value = '';
  },
  
});

Template.comment.helpers({
	projectOwner: function(){
		const ownerArray = Projects.findOne(FlowRouter.getParam('_id')).owner;
	    if ($.inArray(Meteor.userId(), ownerArray) > -1 ) {
	    //then user does not own project, i.e the owners id is not in the projects array of owner(s)
	      return true;
	    }
	    return false;
	},
	currentUserId: function(){
			//a temportary fix, so that the if statements does not put 2 "x's" 
			//when projectOwner posts comment
			return Meteor.userId();
		
	}
});

Template.comment.events({
  'click .delete'() {
    Meteor.call('Comments.remove', this._id);
  },
  
});