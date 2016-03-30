S3.config = {
  key : 'AKIAI3X224EEFHMTTHUQ',
  secret : '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',
  bucket : 'jaydes-photos'
}


Meteor.startup(function() {
	
	Meteor.methods({
		'removeAllPosts': function() {
			return Projects.remove({});
		}
	});
});

Meteor.methods({

	'insertProjectData': function(userId, Goal, moneyType, ResearchTitle){
    	Projects.insert({owner: [userId], goal: Goal, moneyType:moneyType, title: ResearchTitle});
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