var secret = Meteor.settings.private.stripe.testSecretKey;
var Stripe = StripeAPI(secret);
var Future = Npm.require('fibers/future');

Meteor.publish('stripeCustomerId', function() {
	return Meteor.users.find(this.userId, {fields: {'customerId': 1}});
});

Meteor.publish('Comments', function commentsPublication() {
	return Comments.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
 });

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

	Stripe.accounts.list(
  		function(error, accounts) {
  			if(error) {
  				console.log(error);
  			} else {
  				var accountArray = accounts.data;
  				for (var i = 0; i < accountArray.length; i++) {
  					Stripe.accounts.del(accountArray[i].id, function(error, confirmation) {
  						if (error) {
  							console.log(error);
  						}
  					});
  				}
  			}
  		}
	); 

	Meteor.users.update({customerId: { $exists: true }}, {$unset:{customerId: "", sources: ""}}, {multi: true});
	Meteor.users.update({accountId: { $exists: true }}, {$unset:{accountId: ""}}, {multi: true});
	Meteor.users.update({sources: { $exists: true }}, {$unset:{sources: ""}}, {multi: true});

	Stripe.accounts.create({
		managed: true,
		country: 'US',
		email: 'startup_function@live.ca'
		}, 
		Meteor.bindEnvironment(function(err, account) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("Managed account created for live project with Acc ID: " + account.id);
				Projects.update({approved: true}, {$set: {accountId: account.id}});
			}
		})
	);

	SyncedCron.start();

	if (Meteor.settings.private.createDummyProjects) {
		var endDate = new Date(Date.now() + 50 * 24*60*60*1000)
		var endtmrw = new Date(Date.now())

		Projects.insert({
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			ended: false,
			endDate: endtmrw,
			department: "medical",
			title: "Cancer Research",
			summary: "Tying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/8232e0df7e8dcc14239ee5e220f7501c.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 6789,
			numberOfSupporters: 30,
			approved: true,
		});
	/*
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			endDate: endDate,

			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Tryig to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/a264c4a4-2c97-4085-b3c3-08e3bdb2aa68.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 842,
			numberOfSupporters: 10,
			approved: true,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
						endDate: endDate,

			department: "medical",
			title: "Cancer Research",
			summary: "Trying to cange the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/5f2946a4-6b19-4f30-a148-fed62330e0c2.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 6543,
			numberOfSupporters: 500,
			approved: true,
			_id: "PRZhG5Fn9Gp74Z4c4",
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
						endDate: endDate,

			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the word one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/dual-neurons.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 5432,
			numberOfSupporters: 20,
			approved: true,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 1,
						endDate: endtmrw,

			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the wod one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/engineering-wallpaper-hd.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 1245,
			numberOfSupporters: 40,
			approved: true,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
						endDate: endDate,

			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one stept a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/engineering.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 3000,
			numberOfSupporters: 500,
			approved: true,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
						endDate: endDate,

			department: "medical",
			title: "Cancer Research",
			summary: "Trying to ch the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/a264c4a4-2c97-4085-b3c3-08e3bdb2aa68.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 6000,
			numberOfSupporters: 100,
			approved: true,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
						endDate: endDate,

			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change  world one step at a time, abbjdkblk jekdbfkejrb jebwkjbe jreblklrej",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/mac-wallpaper-backgrounds-high-definition_hd-phone-wallpapers-1.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500,
			approved: true,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
			endDate: endDate,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/5f2946a4-6b19-4f30-a148-fed62330e0c2.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 10000,
			numberOfSupporters: 20,
			approved: true,

		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
						endDate: endDate,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Tryi change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/world_best_wallpaper_in_hd-2.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 100,
			numberOfSupporters: 23,
			approved: true,

		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
						endDate: endDate,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to chworld one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/5f2946a4-6b19-4f30-a148-fed62330e0c2.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 800,
			numberOfSupporters: 76,
			approved: true,

		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
						endDate: endDate,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "T the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/5f2946a4-6b19-4f30-a148-fed62330e0c2.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 4000,
			numberOfSupporters: 120,
			approved: true,

		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
						endDate: endDate,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change thet a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/5f2946a4-6b19-4f30-a148-fed62330e0c2.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 6000,
			numberOfSupporters: 87,
			approved: true,

		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: " to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
						endDate: endDate,
			videoURL: "https://s3.amazonaws.com/jaydes-photos/videos/391d5135-6b46-4a63-bb35-f14c861307a6.mp4",

			currency: "$",
			photoURL: "http://s3.amazonaws.com/jaydes-photos/photos/5f2946a4-6b19-4f30-a148-fed62330e0c2.jpg",
			owner: ["okgTwsvJqwHWDTuaC"],
			currentAmountFunded: 4000,
			numberOfSupporters: 48,
			approved: true,

		});
		*/

	}

	var pjct = Projects.findOne({approved: true});
	console.log(pjct);

	SyncedCron.add({
		name: pjct._id,
		schedule: function(parser) {
			// return parser.text('every 1 min starting on the 7th min');
			return parser.recur().on(pjct.endDate).fullDate();
		},
		job: function() {
			Meteor.call('processProject', this.name);
			// SyncedCron.remove(this.name);
		}
	});

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

	'appendToUsersDB': function(userId, paramKey, paramValue){
		var obj = {};
		obj[paramKey] = paramValue;
		console.log("the paramKey is " + paramKey);
		Meteor.users.update({"_id": userId}, { $push: obj });
	},

	'supportProject': function(projectId, token, amount) {
		var user = Meteor.user();
		
		if (!user.customerId) {
			var email = user.emails[0].address;
			var stripeCustomer = Meteor.call('createStripeCustomer', email, token);

			if(stripeCustomer.error) {
				console.log("************Error while creating stripe customer...");
				console.log(stripeCustomer.message);
				throw new Meteor.Error('customer-creation-failed', stripeCustomer.message);
			}

			Meteor.users.update(Meteor.userId(), {$set: {customerId: stripeCustomer.id}});

			var card = stripeCustomer.sources.data[0];
			card = {id: card.id, brand: card.brand, exp_month: card.exp_month, exp_year: card.exp_year, last4: card.last4};
			Meteor.users.update(Meteor.userId(), {$set: {sources: [card]}});

			var supporter = {stripeCusId: stripeCustomer.id, 'card': stripeCustomer.default_source, 'amount': amount};
		} else {
			var card = Meteor.call('addCard', user.customerId, token);

			if(card.error) {
				throw new Meteor.Error('card-creation-failed', card.message);
			}

			card = {id: card.id, brand: card.brand, exp_month: card.exp_month, exp_year: card.exp_year, last4: card.last4};
			Meteor.users.update(Meteor.userId(), {$push: {sources: card}});

			var supporter = {stripeCusId: user.customerId, 'card': card.id, 'amount': amount};
		}

		Meteor.call('addSupporter', projectId, supporter);

	},

	'createStripeAccount': function(projectId) {

		if(!Meteor.user().stripeAccount) {
			var stripeAccount = new Future();
			var email = Meteor.user().emails[0].address;
			console.log("got inside IF");

			Stripe.accounts.create({
				managed: true,
				country: 'CA',
				email: Meteor.user().emails[0].address
				}, 
				function(error, account) {
					if(error) {
						console.log(error)
						stripeAccount.return(error);
					}
					else {
						stripeAccount.return(account);
					}
				}			
			);

			var account = stripeAccount.wait();

			Meteor.users.update(Meteor.userId(), {$set: {accountId: account.id}});
			Projects.update(projectId, {$set: {accountId: account.id}});
		}
	},

	'createStripeCustomer': function(email, token){
		var stripeCustomer = new Future();

		Stripe.customers.create({
    			'email': email,
    			'source': token
  			}, 
  			function(error, customer){
			    if (error){
			    	stripeCustomer.return(error);
			    } else {
			    	stripeCustomer.return(customer);
			    }
			}
		);

		return stripeCustomer.wait();
	},

	'addCard': function(cusId, token) {
		var stripeCard = new Future();

		Stripe.customers.createSource(cusId, {source: token}, function(error, card) {
			if(error) {
				stripeCard.return(error);
			} else {
				stripeCard.return(card); 
			}
		});

		return stripeCard.wait();
	},

	'addSupporter': function (projectId, supporter) {
		check(supporter, {
			stripeCusId: String,
			card: String,
			amount: Number
		});
		Projects.update(projectId, { $push: {"supporters": supporter}, $inc: {currentAmountFunded: supporter.amount, numberOfSupporters: 1} });

  	},

  	'processProject': function(projectId) {
  		console.log("process the project with id: " + projectId);

  		var project = Projects.findOne(projectId);
  		console.log(project);

  		if(project.currentAmountFunded >= project.goal) {
  			for(var i = 0; i < project.supporters.length; i++) {

  				var contribution = project.supporters[i].amount * 100;
  				var appFee = Math.ceil((contribution * 0.05) + (contribution * 0.029) + 30);

  				console.log("charge: " + contribution + " App Fee: " + appFee);

  				Stripe.charges.create({
  					amount: contribution,
  					currency: "usd",
  					customer: project.supporters[i].stripeCusId,
  					source: project.supporters[i].card,
  					destination: project.accountId,
  					application_fee: appFee
  				}, function (error, charge){
  					if(error) {
  						console.log("Aww wtf? " + error.message);
  					} else {
  						console.log("charge succeded :D");
  						console.log("charge: " + charge.amount + " appfee:  " + charge.application_fee);
  					}
  				});
  			}
  		}
  	},

  	'addCronJob': function(projectId) {
  		var endDate = Projects.findOne(projectId).endDate;
  		var name = projectId + " process";

  		SyncedCron.add({
			name: name,
			schedule: function(parser) {
				return parser.recur().on(endDate).fullDate();
			},
			job: function() {
				Meteor.call('processProject', projectId); 
				SyncedCron.remove(this.name);
			}
		});
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

  	'sendEmail': function (to, id) {
		

	    // Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    this.unblock();
	    //can only send up to 300 emails a day
	    Email.send({
	      to: to,
	      from: "Admin@Studyfund.com",
	      subject: "A new project has been posted",
	      text: "The ID of this project is " + id + ". Please take a look and approve/reject it within the next 3 business days. The link is /projects/project/"+id
	    });
	  },

	  'removeDocuments': function(id, documentURL, documentName){
	  	Meteor.users.update({_id: id},{$pull: { 'profile.documentURL': documentURL } } );
	  	Meteor.users.update({_id: id},{$pull: { 'profile.documentName': documentName } } );

	},

	'removeProject': function(id){
		Projects.remove({_id: id});
	},
	'grabUsersSupportingProjectFromServer': function(project){
		if(project.usersContributedID){
			projectInfo = [];
			for(var i =0; i< project.usersContributedID.length; i++){
				var doc = {};
				console.log(" ==== " + project.usersContributedID[i])
				doc["Name"] = Meteor.users.findOne(project.usersContributedID[i]).profile.name;
				console.log(" name = " + doc["Name"])
				doc["Amount"] = project.usersContributedAmount[i];
				console.log(" name = " + doc["Amount"])
				doc["Email"] = Meteor.users.findOne(project.usersContributedID[i]).emails[0].address;
				console.log(" name = " + doc["Email"])
				doc["Photo"] = Meteor.users.findOne(project.usersContributedID[i]).profile.picture;
				console.log(" name = " + doc["Photo"])

				projectInfo.push(doc);
			}
			console.log("projectINFO len " + projectInfo.length)
			console.log("projectINFO  " + JSON.stringify(projectInfo[0]))
			return projectInfo;

		}
	},

	'Comments.insert': function (text) {
	    check(text, String);
	 
	    // Make sure the user is logged in before inserting a comment
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }
	    Comments.insert({
	      text,
	      createdAt: new Date(),
	      photo: Meteor.users.findOne(Meteor.userId()).profile.picture,
	      owner: Meteor.userId(),
	      username: Meteor.users.findOne(Meteor.userId()).profile.name,
	    });
	  },

	  'Comments.remove': function(commentId) {
	    check(commentId, String);
	
	    Comments.remove(commentId);
	  },

	  'grabUserFromServerByEmail': function(co_ownerEmail){
	  		return Meteor.users.findOne({"emails.address": co_ownerEmail})
	  }


});