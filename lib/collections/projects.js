Projects = new Mongo.Collection('Projects');

ProjectsIndex = new EasySearch.Index({
	collection: Projects,
	fields: ['title', 'summary'],
	engine: new EasySearch.Minimongo()
});

