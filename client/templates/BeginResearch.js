Template.BeginResearch.events({
	'click #moneyType': function(e){
		$("#Cur1").unbind().click(function(){
			var temp = document.getElementById("moneyType").innerHTML;
			document.getElementById("moneyType").innerHTML = document.getElementById("Cur1").innerHTML;
			document.getElementById("Cur1").innerHTML = temp;
			var moneyType = document.getElementById("moneyType").innerHTML;
			if(moneyType == "EUR"){
				$("#MinAmount").text("Minimum €500");
				$("#amount").attr("placeholder", "€");
			}
			else if(moneyType == "GBP"){
				$("#MinAmount").text("Minimum £500");
				$("#amount").attr("placeholder", "£");

			}
			else{
				$("#MinAmount").text("Minimum $500");
				$("#amount").attr("placeholder", "$");

			}
		});
		$("#Cur2").unbind().click(function(){
			var temp = document.getElementById("moneyType").innerHTML;
			document.getElementById("moneyType").innerHTML = document.getElementById("Cur2").innerHTML;
			document.getElementById("Cur2").innerHTML = temp;
			var moneyType = document.getElementById("moneyType").innerHTML;
			if(moneyType == "EUR"){
				$("#MinAmount").text("Minimum €500");
				$("#amount").attr("placeholder", "€");
			}
			else if(moneyType == "GBP"){
				$("#MinAmount").text("Minimum £500");
				$("#amount").attr("placeholder", "£");

			}
			else{
				$("#MinAmount").text("Minimum $500");
				$("#amount").attr("placeholder", "$");

			}
		});
		$("#Cur3").unbind().click(function(){
			var temp = document.getElementById("moneyType").innerHTML;
			document.getElementById("moneyType").innerHTML = document.getElementById("Cur3").innerHTML;
			document.getElementById("Cur3").innerHTML = temp;
			var moneyType = document.getElementById("moneyType").innerHTML;
			
			if(moneyType == "EUR"){
				$("#MinAmount").text("Minimum €500");
				$("#amount").attr("placeholder", "€");
			}
			else if(moneyType == "GBP"){
				$("#MinAmount").text("Minimum £500");
				$("#amount").attr("placeholder", "£");

			}
			else{
				$("#MinAmount").text("Minimum $500");
				$("#amount").attr("placeholder", "$");

			}
		});
		$("#Cur4").unbind().click(function(){
			var temp = document.getElementById("moneyType").innerHTML;
			document.getElementById("moneyType").innerHTML= document.getElementById("Cur4").innerHTML;
			document.getElementById("Cur4").innerHTML = temp;
			var moneyType = document.getElementById("moneyType").innerHTML;
			if(moneyType == "EUR"){
				$("#MinAmount").text("Minimum €500");
				$("#amount").attr("placeholder", "€");
			}
			else if(moneyType == "GBP"){
				$("#MinAmount").text("Minimum £500");
				$("#amount").attr("placeholder", "£");

			}
			else{
				$("#MinAmount").text("Minimum $500");
				$("#amount").attr("placeholder", "$");

			}
			});
			console.log("Swapping cur val");
			console.log(moneyType);
		
	},

	'click #BeginResearch': function(e){
		var fundingAmount = $("#amount").val();

		if(fundingAmount < 500 || fundingAmount.length == 0){
			$("#AmountError").text("Amount is less then minimum price");
		}
		else if (!($.isNumeric(fundingAmount))){
			$("#AmountError").text("Invalid entry");
		}
		else{
			$("#AmountError").text("");
		}

		if($("#ResearchTitle").val().length >50){
			$("#TitleError").text("Title is too long");
		}
		else if($("#ResearchTitle").val().length == 0){
			$("#TitleError").text("Title cannot be blank");
		}
		else{
			$("#TitleError").text("");
		}
		
		if(fundingAmount >= 500 && $("#ResearchTitle").val().length <= 50 && $("#ResearchTitle").val().length > 0){
			var ResearchTitle = $("#ResearchTitle").val();
			var moneyType = document.getElementById("moneyType").innerHTML;
			Meteor.call('insertProjectData', Meteor.userId(), fundingAmount, moneyType, ResearchTitle)
			$("#BeginResearch").attr("href", "/start-research")
		}
		
	}
});
Meteor.call('removeAllPosts');
