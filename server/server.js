/*
Dynamically change days left when clock hits 12:00 in database
*/

var d = new Date();
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();
if(hours == 20 && minutes == 17 && seconds == 0){
	Projects.update({}, {$subtract: {daysLeft: 1}}, { multi: true });
}

Meteor.startup(function() {

	// set to true in order to populate projects collection for development
	Projects.remove({});

	var createDummyProjects = true;

	if (createDummyProjects) {
		
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time, abbjdkblk jekdbfkejrb jebwkjbe jreblklrej",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/profile-pictures/a9323832-5591-4d2e-923c-7d8bd50c8d0d.jpg",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/0f635c04-b50c-4064-9a27-5fce50d4a790.jpg",
			owner: ["DjaRQJeECPhGFWhTF"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		

	}
});

S3.config = {
  key : 'AKIAI3X224EEFHMTTHUQ',
  secret : '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',
  bucket : 'jaydes-photos'
}

Meteor.methods({
	//initially setting new collection in database for researcher
	'insertProjectData': function(userId, Goal, moneyType, ResearchTitle, currency){
    	return Projects.insert({owner: [userId], goal: Goal, moneyType:moneyType, 
    		title: ResearchTitle, currentAmountFunded: 0, numberOfSupporters: 0, currency: currency});
	},

	//We need to set an object first and insert that object, because our paramKey 
	//will be called paramKey in our collection as opposed to what it is set as 
	'updateProjectData': function(projectId, paramKey, paramValue){
		var obj = {};
		obj[paramKey] = paramValue;
		console.log("the paramKey is " + paramKey);
		Projects.update({"_id": projectId}, { $set: obj });
	},

	'appendToProjectData': function(projectId, paramKey, paramValue){
		var obj = {};
		obj[paramKey] = paramValue;
		console.log("the paramKey is " + paramKey);
		Projects.update({"_id": projectId}, { $push: obj });
	},

	'grabProjectData': function(projectId){
		return Projects.find({_id: projectId}).fetch();
	},


	'populateProjectPage': function(projectId){
		grabProjectData(projectId);

	}

});