//General
//General
var all_fields_correct = false;

Template.StartResearch.events({

	'click #fundamentals': function(e){
	},

	'click #summary': function(e){
	},
	'click #team': function(e){
	},
	
	
	'click #toSummary': function(e){
		
		var department = $("#ResearchDepartment").val();
		var subfield = $("#subfield").val();
		var funding_days = $(".funding-days").val();
		var summarytext = $("#summarytext").val();
		console.log(department);

		if(department == ""){
			$("#DepartmentErrorMsg").text("Select department");
		}
		else{
			$("#DepartmentErrorMsg").text("");
		}

		if(subfield == ""){
			$("#subfieldErrorMsg").text("Select subfield(s)");
		}
		else{
			$("#subfieldErrorMsg").text("");
		}

		if(summarytext.length == 0){
			$("#SummaryTextErrorMsg").text("field cannot be empty");
		}
		else{
			$("#SummaryTextErrorMsg").text("");
		}

		if(funding_days.length == 0){
			$("#DaysLeftErrorMsg").text("field cannot be empty")

		}
		else if (funding_days > 60){
			$("#DaysLeftErrorMsg").text("Funding cannot exceed 60 days")
		}
		else if (funding_days < 0 || (!($.isNumeric(funding_days)))){
			$("#DaysLeftErrorMsg").text("incorrect entry")
		}
		else{
			$("#DaysLeftErrorMsg").text("")

		}

		if($.isNumeric(funding_days) && funding_days>0 && 
			funding_days.length !=0 && summarytext.length !=0 
			&& department != "" && subfield != "")
		{
			all_fields_correct = true;
		}

		if(all_fields_correct){
			//put end date in dB
			var endDate = new Date(Date.now() + funding_days * 24*60*60*1000);		
			$("#fundamentals").removeClass("active")
			$("#summary").attr("class", "active")
			Session.set("summarytext", summarytext);
			Session.set("subfield", subfield);
			Session.set("department", department);
			Session.set("funding_days", funding_days);
			Session.set("endDate", endDate);
			$("#toSummary").attr("href", "#Summary");

		}

	},

	'click #toTeam': function(e){
		$("#summary").removeClass("active")
		$("#team").attr("class", "active")
		var projectId = Session.get("projectId");
		var projectInfo = $(".note-editable.panel-body").text()
		Meteor.call("updateProjectData", projectId, "projectInfo", projectInfo);
	

	},
	'click #teammateBtn': function(e){
		var teammate = $("#teammate").val();
		projectId = Session.get("projectId");
		Meteor.call('appendToProjectData',projectId, "author", teammate);
		$("#teammate").val("");

	},
	'click .UploadProject': function(event){
		$("#team").removeClass("active");
		$("#rewards").attr("class", "active");
		var userId = Meteor.userId();
		var user = Meteor.users.findOne({_id: userId});
		var userEmail = user.emails[0].address;
		var author = $("#AuthorName").val();
		var funding_days = Session.get("funding_days")

		var videoname = Session.get("videoname")
		var projectId = Session.get("projectId");
		var photoname = Session.get("photoname");
		var city = Session.get("city");
		var country = Session.get("country");
		var endDate = Session.get("endDate");
		var department = Session.get("department");
		var subfield = Session.get("subfield");
		var summarytext = Session.get("summarytext");


		event.preventDefault();

		//add project to DB
		Meteor.call("updateProjectData",projectId, "videoURL", videoname)
		Meteor.call("updateProjectData",projectId, "userId", userId)
		Meteor.call('updateProjectData',projectId, "author", author);
		Meteor.call('updateProjectData',projectId, "department", department);
		Meteor.call('updateProjectData',projectId, "subfield", subfield);
		Meteor.call('updateProjectData',projectId, "country", country);
		Meteor.call('updateProjectData',projectId, "city", city);
		Meteor.call('updateProjectData',projectId, "summary", summarytext);
		Meteor.call('updateProjectData',projectId, "endDate", endDate);
		Meteor.call("updateProjectData",projectId, "userEmail", userEmail);
		Meteor.call("updateProjectData",projectId, "photoURL", photoname);
		Meteor.call("updateProjectData",projectId, "funding_days", funding_days);

		if(userEmail != "Admin@studyfund.com"){
			Meteor.call("sendEmail", "silvajayde@gmail.com", projectId);
		}

		Meteor.call("createStripeAccount", projectId);

		if(userEmail != "Admin@studyfund.com"){
			Meteor.call("updateProjectData",projectId, "approved", false);
		}
		else{
			Meteor.call("updateProjectData",projectId, "approved", true);
		}
	},
	'click #toExtras': function(e){
		$("#rewards").removeClass("active")
		$("#extras").attr("class", "active")
	}

		
});



