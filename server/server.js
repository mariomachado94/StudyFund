if (Meteor.isServer) {

  	Meteor.startup(function() {
  		UploadServer.init({
		    tmpDir: process.env.PWD + '/public/.uploads/tmp',
		    uploadDir: process.env.PWD + '/public/.uploads/',
		    checkCreateDirectories: true //create the directories for you
		  });

    	return Meteor.methods({

      	removeAllPosts: function() {

        	return Projects.remove({});

      	}

    	});
	});

	

	
}

Meteor.methods({

	'insertProjectData': function(userId, fundingAmount, moneyType, ResearchTitle){
    	Projects.insert({owner: userId, amount: fundingAmount, moneyType:moneyType, ResearchTitle: ResearchTitle});
	},

	//We need to set an object first and insert that object, because our paramKey 
	//will be called paramKey in our collection as opposed to what it is set as 
	'updateProjectData': function(userId, paramKey, paramValue){
		var obj = {};
		obj[paramKey] = paramValue;
		console.log("the paramKey is " + paramKey);
		Projects.update({"owner": userId}, { $set: obj });
	},

	'appendToProjectData': function(userId, paramKey, paramValue){
		var obj = {};
		obj[paramKey] = paramValue;
		console.log("the paramKey is " + paramKey);
		Projects.update({"owner": userId}, { $push: obj });
	}

	

});



