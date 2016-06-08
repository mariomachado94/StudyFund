var secret = Meteor.settings.private.stripe.testSecretKey;
var Stripe = StripeAPI(secret);
var Future = Npm.require('fibers/future');

Meteor.publish('stripeCustomerId', function() {
	return Meteor.users.find(this.userId, {fields: {'customerId': 1}});
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

	Stripe.accounts.create({
		managed: true,
		country: 'US',
		email: 'mario.machado@live.ca'
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

	var createDummyProjects = true;


	if (createDummyProjects) {
		
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["4yqosh76fmFAwELB4"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500,
			approved: true,
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Portugal",
			city: "Lisbon",
			daysLeft: 50,
			department: "medical",
			title: "Cancer Research",
			summary: "Trying to change the world one step at a time, abbjdkblk jekdbfkejrb jebwkjbe jreblklrej",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["zo8yAZRvbwx8kLNq7"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["Zaj478PjZ2fMKXCDo"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["Zaj478PjZ2fMKXCDo"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["Zaj478PjZ2fMKXCDo"],
			currentAmountFunded: 8742,
			numberOfSupporters: 500
		});
		Projects.insert({
			country: "Canada",
			city: "Oakville",
			daysLeft: 50,
			department: "engineering",
			title: "AeroSpace Engineering",
			summary: "Trying to change the world one step at a time, with spaceships and physics and engineering",
			goal: 14000,
			currency: "$",
			photoURL: "https://s3.amazonaws.com/jaydes-photos/photos/45db63d6-8481-44ea-96e6-f04fe8b0ccc2.jpg?X-Amz-Date=20160527T220105Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=6fe1a016310246a4f633fcb35759a6bc79f172602b0631585d133384c25a31c8&X-Amz-Credential=ASIAID7SEZ6BJVXHAIHQ/20160527/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEK///////////wEaDDMG2oRqvNQ3yDsEfCLHAQnl367u58vzUVB1DEunx9yafCfrGX68VA1MMKupthmo7GYmnFeHjRk2tQYeRtFY9rhQRj1Xyxj/QOv9qLNce8YXhUtUvbJulCkEjKCsUp6OvFiecxD5hvlVN4WtSw6R7ddRnPyWxt87EV3M2lJDEGare5NC0wn74VEc7/w9i/R2GRieATFuA2PzNi6qSAJah5rB9WRqiiisz3kO6%2BtvADNfkbrO/Gn2TjaURdhqlQFtIvERCXibCzH6SlywOCBk/JNmeWTl44ko2YajugU%3D",
			owner: ["Zaj478PjZ2fMKXCDo"],
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
				console.log("Error while creating stripe customer...");
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

	'createStripeAccount': function(email) {
		var stripeAccount = new Future();

		Stripe.accounts.create({
			managed: true,
			country: 'CA',
			email: email
			}, 
			function(error, account) {
				if(error) {
					stripeAccount.return(error);
				}
				else {
					stripeAccount.return(account);
				}
			}
		);

		return stripeAccount.wait();
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
	}

});