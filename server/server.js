var secret = Meteor.settings.private.stripe.testSecretKey;
var Stripe = StripeAPI(secret);

Meteor.startup(function() {
	process.env.MAIL_URL = 'smtp://postmaster@sandboxb75e33707d17401db884ab15677a7dce.mailgun.org:4da2f156b8f08239ebbe9d83bc00b3c7@smtp.mailgun.org:587/'; 
	// set to true in order to populate projects collection for development
	Projects.remove({});

	Stripe.customers.list(
  		function(error, customers) {
  			if(error) {
  				console.log(error);
  			} else {
  				var customerArray = customers.data;
  				for (var i = 0; i < customerArray.length; i++) {
  					Stripe.customers.del(customerArray[i].id, function(error, confirmation) {
  						if (error) {
  							console.log(error);
  						}
  					});
  				}
  			}
  		}
	);

	var createDummyProjects = false;


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
    		title: ResearchTitle, currentAmountFunded: 0, numberOfSupporters: 0, currency: currency, backers: []});

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

	createStripeCustomer: function(customer){
		check(customer, {
			email: String,
			token: String
		});

		Stripe.customers.create({
    			source: customer.token,
    			email: customer.email
  			}, 
  			Meteor.bindEnvironment(function(error, customer){
    			if (error){
      				console.log(error);
    			} else {
      				console.log("Stripe customer created with ID: " + customer.id);
      				Meteor.users.update(Meteor.userId(), {$set: {customerId: customer.id}});
      				console.log("User ID: " + Meteor.userId());
    			}
  			})
  		);
	},

	addSupporter: function (projectId, backer) {
		check(backer, {
			_id: String,
			amount: Number
		});
		Projects.update(projectId, { $push: {"backers": backer}, $inc: {currentAmountFunded: backer.amount, numberOfSupporters: 1} });

  	},

  	'decrementProjectDays': function(){
		//loop through projects and decrement daysLeft by 1 every 24 hours
		for(var i =0; i<Projects.find().fetch().length; i++){
			var id = Projects.find().fetch()[i]._id;
			console.log(Projects.findOne({_id: id}).daysLeft);
			var tempdaysLeft = Projects.findOne({_id: id}).daysLeft;;
			var daysLeft = parseInt(tempdaysLeft) -1;
			if(daysLeft == 0){
				//remove project and disperse money accordingly.
				Projects.remove({_id: id})
			}
			else{
				Meteor.call("updateProjectData", id, "daysLeft", daysLeft)
			}
		}
	},

  	'sendEmail': function (to, subject, text) {
		

	    // Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    this.unblock();
	    //can only send up to 300 emails a day
	    Email.send({
	      to: to,
	      from: "Admin@Studyfund.com",
	      subject: subject,
	      text: text
	    });
	  }
});