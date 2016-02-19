if (Meteor.isClient) {
  Template.discoverLayout.events({
    'click #Medical' : function (e) {
      e.preventDefault();
      routeToProjects();
    },
    'click #SportsAnatomy' : function (e) {
      e.preventDefault();
      routeToProjects();
    },
    'click #Nutrition' : function (e) {
      e.preventDefault();
      routeToProjects();
    },
    'click #Other' : function (e) {
      e.preventDefault();
      routeToProjects();
    }
  });

  Template.projectsLayout.events({
    'click .project' : function (e) {
      e.preventDefault();
      routeToProjectPage();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
