var files = "";
var photoname = "placeholder.gif";
Session.set("photoname", photoname);
Session.set("fieldChanged", false);


Template.Fundamentals.onRendered(function(){
	navigator.geolocation.getCurrentPosition(success);
});


Template.Fundamentals.events({
	"change .photofile": function(e){
		if($(".photofile")[0].files.length != 0){
			Session.set("changed", true)
			files = $(".photofile")[0].files;
			S3.upload({
		                files: files,
		                path: "photos",
		            },function(error,result){
		            	console.log(result)
		            	photoname = result.url;
		                Session.set("photoname", result.url)
		                if(result.percent_uploaded == 100){
		                	Session.set("changed", false)
		                	$("#ResearchPhoto").attr("src", photoname);
		                }
		        });
		}

	},

	"change .ui.normal.dropdown.department": function(e){
		if($("#ResearchDepartment").val() != ""){
			$("#DepartmentErrorMsg").text("");
		}

		switch ($("#ResearchDepartment").val()) {
		    case "medical":
		        ResearchDepartment = "medical";
		        Session.set("field", ResearchDepartment);
		        Session.set("fieldChanged", true);

		        break;
		    case "":
		        ResearchDepartment = "";
		        Session.set("field", ResearchDepartment);
		        Session.set("fieldChanged", true);
		        $("#subfieldErrorMsg").text("");
		        break;
		    case "mathematics":
		        ResearchDepartment = "mathematics";
		        Session.set("field", ResearchDepartment);
		        Session.set("fieldChanged", true);
		        break;
		    case "engineering":
		        ResearchDepartment = "engineering";
		        Session.set("field", ResearchDepartment);
		        Session.set("fieldChanged", true);
		        break;
		    case "physics":
		        ResearchDepartment = "physics";
		        Session.set("field", ResearchDepartment);
		        Session.set("fieldChanged", true);
		        break;
		    case 5:
		        day = "Friday";
		        break;
		    case 6:
		        day = "Saturday";
		        break;
		}
	},

	"change .ui.normal.dropdown.subfield": function(e){
		if($("#subfield").val() != ""){
			$("#subfieldErrorMsg").text("");
		}
	}

});

Template.Fundamentals.helpers({

	fileChange: function(){
		return Session.get("changed");
	},
	photoname: function(){
		return photoname;
	},
	get_subField: function() {
		var subfield = Session.get("field")+"Fields";
		console.log(subfield)
		return subfield;

	},

	departmentChanged: function() {
			return Session.get("fieldChanged");
	}

});

function success(pos){
	//grab loatitude and longitude of current location, and use it to grab city & country
	  var crd = pos.coords;
	  HTTP.call("get", "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + 
		crd.latitude + "&lon=" + crd.longitude + "&addressdetails=1", function(error, result) {
			console.log(result)
		Session.set("country", result.data.address.country);

		if(result.data.address.town!=null){
			Session.set("city", result.data.address.town);
		}
		else{
			Session.set("city", result.data.address.city);

		}
		
		

	  if (!error) {
	      Meteor.call("updateProjectData")
	  } else {
	    throw new Meteor.Error("...");
	  }
	});
}



