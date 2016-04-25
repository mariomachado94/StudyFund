Template.searchPage.helpers({
	getQueryParam: function() {
		return FlowRouter.getQueryParam('q');
	},
	search: function(query) {
		return ProjectsIndex.search(query, {limit: 9}).fetch();
	}
});