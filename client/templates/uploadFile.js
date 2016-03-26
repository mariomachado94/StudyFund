Template.uploadFile.events({
    "click .upload": function(e){
        var files = $(".file_bag")[0].files;
        console.log("in here")
        S3.upload({

                files:files,
                path:"subfolder"
            },function(e,r){
                console.log(r);
        });
    }
})

Template.uploadFile.helpers({
    "files": function(e){
        return S3.collection.find();
    }
})
