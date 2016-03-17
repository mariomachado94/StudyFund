//General

var max = parseInt($("#text").attr("maxlength"));
	$("#count_message").html("Characters left: " + max);
	$("#text").keyup(function(e){
		$("#count_message").html("Characters left: " + (max - $(this).val().length));
	    if($(this).val().length==max){
	    	$("#count_message").html("Limit Reached....");
	    }
	});

//General

Template.StartResearch.events({
	'click #toSummary': function(e){
		$("#fundamentals").removeClass("active")
		$("#summary").attr("class", "active")
	},
	'click #toTeam': function(e){
		$("#summary").removeClass("active")
		$("#team").attr("class", "active")
	},
	'click #toRewards': function(e){
		$("#team").removeClass("active")
		$("#rewards").attr("class", "active")
	},
	'click #toExtras': function(e){
		$("#rewards").removeClass("active")
		$("#extras").attr("class", "active")
	}
		
});
