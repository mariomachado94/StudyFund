var profilePic = "https://s3.amazonaws.com/jaydes-photos/defaultImages/placeholder-profile.png";
Session.set("profilePic", profilePic);
Session.set("updatedDocuments", false);
Template.profilePage.helpers({
	checkProjectApproval: function(project){
		if (project.approved){
			return true;
		}
		else{
			return false;
		}
	},
	getUserPhoto: function(){
		userId = FlowRouter.getParam('_id');
		var user = Meteor.users.findOne(userId, {fields: {profile: 1}});
		if(user.profile.picture != null){
			return user.profile.picture;
		}
		else{
			return "../placeholder-profile.png"; //edit this to point to URL in S3 later ****
		}
	},
	user: function () {
		var userId;
		userId = FlowRouter.getParam('_id');
		return Meteor.users.findOne(userId, {fields: {profile: 1}});
	},
	thisUsersProfile: function() {
		if (Meteor.userId() === FlowRouter.getParam('_id')) {
			return true;
		}
		else {
			return false;
		}
	},
	getUserProjects: function() {
		return Projects.find({owner: FlowRouter.getParam('_id')}).fetch();
	},
	getUserDocuments: function(){
		userId = FlowRouter.getParam('_id');
		Profile = Meteor.users.findOne(userId, {fields: {profile: 1}}).profile;
		if(Profile.documentURL != null){
			var documents = [];
			UserDocumentsUrl = Profile.documentURL;
			UserDocumentsName = Profile.documentName;
			for(var i= 0; i<UserDocumentsUrl.length; i++){
				var doc = {};
				doc["Name"] = UserDocumentsName[i];
				doc["URL"] = UserDocumentsUrl[i];
				documents.push(doc);
			}
		}
		return documents;
	},
	userUpdateDocuments: function(){
		return Session.get("updatedDocuments");
	},
	documentsExist: function(){
		userId = FlowRouter.getParam('_id');
		Profile = Meteor.users.findOne(userId, {fields: {profile: 1}}).profile;
		if(Profile.documentURL != null){
			return true;
		}
		return false;
	},
	projectsOwned: function(){		
		userId = FlowRouter.getParam('_id');
		userProfile = Meteor.users.findOne({_id: userId}).profile;
		numOfProjects = userProfile.projectsPosted;
		if(!numOfProjects){
			return 0;
		}
		else{
			return numOfProjects.length;
		}
	},
	numOfProjectsSupported: function(){
		userId = FlowRouter.getParam('_id');
		userProfile = Meteor.users.findOne({_id: userId}).profile;
		numOfProjects = userProfile.projectsSupported;
		if(!numOfProjects){
			return 0;
		}
		else{
			return numOfProjects.length;
		}

	},
	UserProjectsSupported: function(){
		userId = FlowRouter.getParam('_id');
		userProfile = Meteor.users.findOne({_id: userId}).profile;
		projectsSupported = userProfile.projectsSupported;
		var projects = [];
		if(projectsSupported){
			for(var i=0; i< projectsSupported.length; i++){
				console.log("project = " + Projects.findOne(projectsSupported[i]));
				project = Projects.findOne(projectsSupported[i]);
				console.log("pject = " + project.photoURL);
				projects.push(project)
			}
		}
		console.log("projects = " + projects[0].photoURL)
		return projects;

	},
	checkProjectApproval: function(project){
		if (Meteor.userId() == "okgTwsvJqwHWDTuaC" 
		|| project.approved || project.userEmail == "Admin@studyfund.com"){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.editProfile.helpers({
	profilePic_Changed: function(){
		return Session.get("profilePic_Changed");
	},
	userProfilePicture: function(){
		return Session.get("profilePic");
	}
	
})
Template.profilePage.events({
	"click .save-changes": function (event, template) {
		var name = template.$("#name").val();
		var title = template.$("#title").val();
		var summary = template.$("#summary").val();
		var bio = template.$("#bio").val();
		var userId = Meteor.userId();
		var profilePic = Session.get("profilePic");
		Meteor.users.update(userId, {$set: {"profile.name": name, "profile.email": email , "profile.title": title, "profile.summary": summary, "profile.picture": profilePic,  "profile.bio": bio}});
	},
	"change .profilePic": function(e){
		if($(".profilePic")[0].files.length != 0){
			Session.set("profilePic_Changed", true)
			files = $(".profilePic")[0].files;
			S3.upload({
		                files: files,
		                path: "profile-pictures",
		            },function(error,result){
		            	console.log(result)
		            	profilePic = result.url;
		                Session.set("profilePic", profilePic)
		                if(result.percent_uploaded == 100){
		                	Session.set("profilePic_Changed", false)
		                	$("#profile_pic").attr("src", profilePic);

		                }
		        });
		}

	},
	"change #profileAspects": function(e){
		if($("#profileAspects")[0].files.length != 0){
			files = $("#profileAspects")[0].files;
			S3.upload({
		                files: files,
		                path: "documents",
		            },function(error,result){
		            	console.log(result.url)
		            	var path = $("#profileAspects").val()
						var fileName = path.match(/[^\/\\]+$/);
		                if(result.percent_uploaded == 100){
		                userId = FlowRouter.getParam('_id');
						Meteor.call('appendToUsersDB',userId, "profile.documentURL", result.url);
		                Meteor.call('appendToUsersDB',userId, "profile.documentName", fileName[0]);
		                Session.set("updatedDocuments", true);
		                }
		        });
		}

	},
	"click .cancelDocument": function(event){
		var rowIndex = $( event.target ).closest( "tr" ).index();
		var userId = FlowRouter.getParam('_id');
		Profile = Meteor.users.findOne(userId, {fields: {profile: 1}}).profile;
		UserDocumentsUrl = Profile.documentURL[rowIndex];
		UserDocumentName = Profile.documentName[rowIndex];
		Meteor.call("removeDocuments", userId, UserDocumentsUrl, UserDocumentName); //remove from DB
		$(event.target).parent('tr').remove();

		

	}
});

Template.documentDisplay.helpers({
	thisUsersProfile: function() {
			if (Meteor.userId() === FlowRouter.getParam('_id')) {
				return true;
			}
			else {
				return false;
			}
		}
});
