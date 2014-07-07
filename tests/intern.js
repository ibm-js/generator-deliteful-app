define({
	loader: {
		baseUrl: ".."
	},
	
	suites: [ "generator-deliteful-app/tests/all" ],

	useLoader: {
		"host-node": "requirejs"
	},

	excludeInstrumentation: /./
});