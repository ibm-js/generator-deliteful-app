/*global module, __dirname*/
/*jshint globalstrict: false*/
"use strict";
/*jshint globalstrict: true*/
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var _ = require("underscore.string");


var DelitefulAppGenerator = module.exports = function DelitefulAppGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on("end", function () {
		var self = this;
		this.installDependencies({
			skipInstall: options["skip-install"],
			callback: function () {
				console.log("Dependencies have been installed, point your browser to index.html to run " +
					"the skeleton sample application");
			}
		});
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(DelitefulAppGenerator, yeoman.generators.Base);

DelitefulAppGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	// TODO:  which themes?, using dapp? build or unbuilt layer?, binding

	this.prompt([
		{
			name: "package",
			message: "What is the name of your deliteful application package?",
			default: this.appname.indexOf(" ") !== -1 ? _.slugify(this.appname) : this.appname
		},/*
		{
			type: "confirm",
			name: "i18n",
			message: "Will your delite application require string internationalization?",
			default: false
		},*/
		{
			type: "confirm",
			name: "build",
			message: "Do you want to use build version of deliteful package (instead of source version)?",
			default: true
		}
	], function (props) {
		this.package = props.package;
		this.i18n = props.i18n;
		this.build = props.build;
		cb();
	}.bind(this));
};

DelitefulAppGenerator.prototype.generateApp = function app() {
	// this.template("Gruntfile.js", "Gruntfile.js");
	this.template("_package.json", "package.json");
	this.template("_bower.json", "bower.json");
	this.template("_index.html", "index.html");
	this.copy("app.css", "css/app.css");
	this.copy("delitefont.eot", "css/delitefont.eot");
	this.copy("delitefont.svg", "css/delitefont.svg");
	this.copy("delitefont.ttf", "css/delitefont.ttf");
	this.copy("delitefont.woff", "css/delitefont.woff");


};

DelitefulAppGenerator.prototype.projectfiles = function projectfiles() {
	this.copy("jshintrc", ".jshintrc");
};
