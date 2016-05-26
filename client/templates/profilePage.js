var profilePic = "../placeholder-profile.png";
Session.set("profilePic", profilePic);
Template.profilePage.helpers({
	/*name: function() {
		var userId;
		var user;

		if (userId = Meteor.userId()) {
			user = Meteor.users.findOne(userId, {fields: {profile: 1}});
			if (user.profile.name) {
				console.log("There is a name, that name is " + user.profile.name);
				return user.profile.name;
			}
			else {
				console.log("no name, make it john doe");
				Meteor.users.update(userId, {$set:{"profile.name": "Jon Doe"}});
				user = Meteor.users.findOne(userId, {fields: {profile: 1}}); // check if you must call this again
				return user.profile.name;
			}
		}
		else {
			return "No user"
		}
	}, */
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
		return Projects.find({owner: Meteor.userId()}).fetch();
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
		Meteor.users.update(userId, {$set: {"profile.name": name, "profile.title": title, "profile.summary": summary, "profile.picture": profilePic,  "profile.bio": bio}});
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
	"change .profileAspects": function(e){
		if($(".profileAspects")[0].files.length != 0){
			files = $(".profileAspects")[0].files;
			S3.upload({
		                files: files,
		                path: "documents",
		            },function(error,result){
		            	console.log(result.url)
		                if(result.percent_uploaded == 100){
		                	$(".row.researcherDocuments").append("<a href=" + result.url + 
		                	">"+ $(".profileAspects").val());
		                }
		        });
		}

	}
});
