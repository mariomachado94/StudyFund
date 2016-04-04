//General
//General
var all_fields_correct = false;


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
	
	'click #toSummary': function(e){
		var owner = Meteor.userId();
		var userCountry = $(".countries a").text();
		var department = $(".text.department").text();
		var funding_days = $(".funding-days").val();
		var summarytext = $("#summarytext").val();
		var tags = "";
		if(userCountry == ""){
			$(".countriesError").text("field cannot be empty");
		}
		else{
			$("#SummaryTextErrorMsg").text("");
		}

		if(department == "Choose Department"){
			$("#DepartmentErrorMsg").text("Choose a department");
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
			&& department != "Choose Department" && userCountry!="")
		{
			all_fields_correct = true;
		}

		if(all_fields_correct){
			$("#fundamentals").removeClass("active")
			$("#summary").attr("class", "active")
			photoname = Session.get("photoname");
			projectId = Session.get("projectId");
			Meteor.call('updateProjectData',projectId, "country", userCountry);
			Meteor.call('updateProjectData',projectId, "summary", summarytext);
			Meteor.call('updateProjectData',projectId, "department", department);
			Meteor.call('updateProjectData',projectId, "summary", summarytext);
			Meteor.call('updateProjectData',projectId, "daysLeft", funding_days);
			Meteor.call("updateProjectData",projectId, "photoURL", photoname)
			$("#countries").hide();
			$("#toSummary").attr("href", "#Summary");

		}

	},

	'click #toTeam': function(e){
		$("#summary").removeClass("active")
		$("#team").attr("class", "active")
		videoname = Session.get("videoname")
		Meteor.call("updateProjectData",Meteor.userId(), "videoURL", videoname)
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



