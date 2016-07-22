$( window ).unload(function() {
Session.set("itemactive", false);
});
Template.carousel.helpers({
	getCarouselProjects: function(index, attr) {
			projects = Projects.find({approved: true}, {sort: {rand: 1}, limit: 3}).fetch();
			if(attr == "photoURL"){
				return projects[index].photoURL;
			}
			else if (attr == "id"){
				return projects[index]._id;
			}
			else if (attr == "title"){
				return projects[index].title;
			}
			else if (attr == "summary"){
				return projects[index].summary;
			}
	},
	numOfCarouselProjects: function(){
			return Projects.find({}, {sort: {rand: 1}, limit: 3}).count();
	},
	checkProjectApproval: function(project){
		if (Meteor.userId() == "okgTwsvJqwHWDTuaC" 
		|| project.approved || project.userEmail == "Admin@studyfund.com"){
			return true;
		}
		else{
			return false;
		}
	},
	


});