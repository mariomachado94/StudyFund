Meteor.startup(function() {
	// set to true in order to populate projects collection for development
	var createDummyProjects = true;

	UploadServer.init({
    	tmpDir: process.env.PWD + '/public/.uploads/tmp',
    	uploadDir: process.env.PWD + '/public/.uploads/',
    	checkCreateDirectories: true //create the directories for you
	});

	S3.config = {
	  "AccessKeyId" : "AKIAJ67USRP4V3G5EQYA",
	  "AWSSecretAccessKey" : "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",
	  "AWSBucket" : "jaydes-photos"
	}

	Projects.remove({});

	if (createDummyProjects) {
		Projects.insert({
			country: "Canada",
			daysLeft: 20,
			department: "Drugs",
			title: "Marijuana, the cure for cancer?",
			summary: "THC has already shown cancer killing properties. We are about to find out just how significant these properties truly are.",
			goal: 45000,
			owner: ["4yqosh76fmFAwELB4"],
			currentAmountFunded: 2350,
			numberOfSupporters: 230
			
		});
		Projects.insert({
			country: "USA",
			daysLeft: 36,
			department: "Physics",
			title: "Partical Accelerator",
			summary: "A partical accelertator to be built in texes so we can compete acedemically with the one in switzerland",
			goal: 2000000,
			owner: ["4yqosh76fmFAwELB4"],
			currentAmountFunded: 567234,
			numberOfSupporters: 20002
		});

		Projects.insert({
			country: "Canada",
			daysLeft: 15,
			department: "Nutrition",
			title: "Creatine study",
			summary: "How good is creatine for muscle growth",
			goal: 1400,
			owner: ["4yqosh76fmFAwELB4"],
			currentAmountFunded: 987,
			numberOfSupporters: 89
		});

		Projects.insert({
			country: "Canada",
			daysLeft: 5,
			department: "Nutrition",
			title: "Is Mr. Noodle soup secretly killing people?",
			summary: "This shitty food has evidence surrounding its horrible effects on the body.",
			goal: 780,
			owner: ["4yqosh76fmFAwELB4"],
			currentAmountFunded: 120,
			numberOfSupporters: 10
		});

		Projects.insert({
			country: "Canada",
			daysLeft: 4,
			department: "Dog Nutrition",
			title: "How bad is dog food for your dog?",
			summary: "Dog food companies are of the most misleading businesses in the world. We put to the test several of the 'Healthiest' dog food products people buy",
			goal: 2500,
			owner: ["4yqosh76fmFAwELB4"],
			currentAmountFunded: 2350,
			numberOfSupporters: 245
		});

		Projects.insert({
			country: "Portugal",
			daysLeft: 50,
			department: "Medical",
			title: "A proposed treatment for helping retired construction workers with arthritus",
			summary: "Too many prokchops have arthritus after retiring long careers in construction. This medical treatment could help",
			goal: 14000,
			owner: ["4yqosh76fmFAwELB4"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
	}
});

Meteor.methods({

	'insertProjectData': function(userId, fundingAmount, moneyType, ResearchTitle){
    	Projects.insert({owner: [userId], goal: fundingAmount, moneyType:moneyType, title: ResearchTitle});
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