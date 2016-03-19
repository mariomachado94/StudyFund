//General

//General

Template.StartResearch.events({
	'click #toSummary': function(e){
		$("#fundamentals").removeClass("active")
		$("#summary").attr("class", "active")
		var user = Session.get(this.id);
		var userCountry = $("countries:a").val();
		alert(userCountry);
		var department = $("")
		Projects.update(user, {Country: userCountry, Summary: $("summaryText").text(),
		 Photo: $("ResearchPhoto").attr('src'), fundingDays: $(".fundingDays").val()})
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
