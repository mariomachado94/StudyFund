var files = "";
var videoname = "";
Template.Summary.events({
	"change .videofile": function(e){
		if($(".videofile")[0].files.length != 0){
			Session.set("changed", true)
			files = $(".videofile")[0].files;
			S3.upload({
	                files: files,
	                path: "videos",
	            },function(error,result){
	            	console.log(result)
	            	videoname = result.url;
	                Session.set("videoname", videoname)
	                if(result.percent_uploaded == 100){
	                	Session.set("changed", false)
	                	$("#ResearchPhoto").attr("src", videoname);
	                }
	        });
		}
	},

	"click #toTeam": function(e){
		alert($(".note-editable.panel-body").text())
	}
})

Template.Summary.helpers({

	fileChange: function(){
		var changed = Session.get("changed");
		if(changed){ 
	        return true;
	    }
	    return false;
	},
	videoname: function(){
		return videoname;
	}
})
