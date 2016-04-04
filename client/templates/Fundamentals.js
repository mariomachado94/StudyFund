var files = "";
var photoname = "placeholder.gif";
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
	}
})

Template.Fundamentals.helpers({

	fileChange: function(){
		var changed = Session.get("changed");
		if(changed){ 
	        return true;
	    }
	    return false;
	},
	photoname: function(){
		return photoname;
	}
})
