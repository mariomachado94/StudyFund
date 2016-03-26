//General

//General

Template.StartResearch.events({
	'click #fundamentals': function(e){
		$("#countries").show()
	},

	'click #summary': function(e){
		$("#countries").hide()
	},
	'click #team': function(e){
		$("#countries").hide()
	},
	'click #rewards': function(e){
		$("#countries").hide()
	},
	'click #extras': function(e){
		$("#countries").hide()
	},
	'click .btn.btn-info.upload-control.start': function(e){
		var unsplit_photoName = $(".progress-label").text();
		var nbsp = String.fromCharCode(160);
		var unparsed_photoName = unsplit_photoName.split(nbsp);
		console.log(unparsed_photoName[0]);
		//stop client from refresing at this point, 
		//as it will since we add a photo to a directory in meteor
		var photoName = unparsed_photoName[0].trim();
		$("#ResearchPhoto").attr("src", ".uploads/"+photoName);

		Meteor._reload.onMigrate(function() {
		  return [false];
		});
	},

	'click #ResearchPhoto': function(event, template) {
		console.log("got here");
	    FS.Utility.eachFile(event,function(file) {
	    	console.log("in FS.Utility");
	        var newFile = new FS.File(file);
	        
	        Images.insert(newFile, function (error, fileObj) {
	          if (error) {
	            toastr.error("Upload failed... please try again.");
	          } else {
	            toastr.success('Upload succeeded!');
	          }
	      	});
	    });
	},

	'click #toSummary': function(e){
		var owner = Meteor.userId();
		var userCountry = $(".countries a").text();
		var all_fields_correct = true;
		var department = $(".text.department").text();
		var funding_days = $(".funding-days").val();
		var summarytext = $("#summarytext").val();
		var tags = "";
		if(userCountry == ""){
			$("#SummaryTextErrorMsg").text("field cannot be empty");
			all_fields_correct = false
		}
		else{
			$("#SummaryTextErrorMsg").text("");
		}

		if(department == "Choose Department"){
			$("#DepartmentErrorMsg").text("Choose a department");
			all_fields_correct = false;
		}

		if(summarytext.length == 0){
			$("#SummaryTextErrorMsg").text("field cannot be empty");
			all_fields_correct = false
		}
		else{
			$("#SummaryTextErrorMsg").text("");
		}

		if(funding_days.length == 0){
			$("#DaysLeftErrorMsg").text("field cannot be empty")
			all_fields_correct = false

		}
		else if (funding_days > 60){
			$("#DaysLeftErrorMsg").text("Funding cannot exceed 60 days")
			all_fields_correct = false
		}
		else if (funding_days < 0 || (!($.isNumeric(funding_days)))){
			$("#DaysLeftErrorMsg").text("incorrect entry")
			all_fields_correct = false
		}
		else{
			$("#DaysLeftErrorMsg").text("")

		}



		if(all_fields_correct){
			$("#fundamentals").removeClass("active")
			$("#summary").attr("class", "active")
			Meteor.call('updateProjectData',owner, "country", userCountry);
			Meteor.call('updateProjectData',owner, "summary", summarytext);
			Meteor.call('updateProjectData',owner, "department", department);
			Meteor.call('updateProjectData',owner, "summary", summarytext);
			Meteor.call('updateProjectData',owner, "daysLeft", funding_days);
			$("#countries").hide();
			$("#toSummary").attr("href", "#Summary");

		}

	},
	'click #toTeam': function(e){
		$("#summary").removeClass("active")
		$("#team").attr("class", "active")
		//upload video code
	},
	'click #teammateBtn': function(e){
		var teammate = $("#teammate").val();
		console.log(teammate);
		Meteor.call('appendToProjectData',Meteor.userId(), "owner", teammate);
		$("#teammate").val("");

	},
	'click #toRewards': function(e){
		$("#team").removeClass("active")
		$("#rewards").attr("class", "active")
		var author = $("#AuthorName").val();
		Meteor.call('updateProjectData',Meteor.userId(), "author", author);
	},
	'click #toExtras': function(e){
		$("#rewards").removeClass("active")
		$("#extras").attr("class", "active")
	}

		
});

