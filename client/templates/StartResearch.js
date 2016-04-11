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
		var owner = Meteor.userId();
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
			$("#fundamentals").removeClass("active")
			$("#summary").attr("class", "active")
			Session.set("summarytext", summarytext);
			Session.set("subfield", subfield);
			Session.set("department", department);
			Session.set("daysLeft", funding_days);
			$("#toSummary").attr("href", "#Summary");

		}

	},

	'click #toTeam': function(e){
		$("#summary").removeClass("active")
		$("#team").attr("class", "active")
	},
	'click #teammateBtn': function(e){
		var teammate = $("#teammate").val();
		projectId = Session.get("projectId");
		Meteor.call('appendToProjectData',projectId, "author", teammate);
		$("#teammate").val("");

	},
	'click .UploadProject': function(e){
		$("#team").removeClass("active");
		$("#rewards").attr("class", "active");
		var author = $("#AuthorName").val();
		console.log("got here");

		var videoname = Session.get("videoname")
		var projectId = Session.get("projectId");
		var photoname = Session.get("photoname");
		var city = Session.get("city");
		var country = Session.get("country");
		var funding_days = Session.get("daysLeft");
		var department = Session.get("department");
		var subfield = Session.get("subfield");
		var summarytext = Session.get("summarytext");

		Meteor.call("updateProjectData",projectId, "videoURL", videoname)
		Meteor.call('updateProjectData',projectId, "author", author);
		Meteor.call('updateProjectData',projectId, "department", department);
		Meteor.call('updateProjectData',projectId, "subfield", subfield);
		Meteor.call('updateProjectData',projectId, "country", country);
		Meteor.call('updateProjectData',projectId, "city", city);
		Meteor.call('updateProjectData',projectId, "summary", summarytext);
		Meteor.call('updateProjectData',projectId, "daysLeft", funding_days);
		Meteor.call("updateProjectData",projectId, "photoURL", photoname)
	},
	'click #toExtras': function(e){
		$("#rewards").removeClass("active")
		$("#extras").attr("class", "active")
	}

		
});



