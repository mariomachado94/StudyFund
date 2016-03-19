if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllPosts: function() {

        return Projects.remove({});

      }

    });

  });

}