/*global module, __dirname*/
/*jshint globalstrict: false*/
"use strict";
/*jshint globalstrict: true*/
var util = require("util");
var path = require("path");
var chalk = require("chalk");
var yeoman = require("yeoman-generator");
var _ = require("underscore.string");


var DelitefulAppGenerator = module.exports = function DelitefulAppGenerator(args, options) {
	yeoman.generators.Base.apply(this, arguments);

	this.on("end", function () {
		this.installDependencies({
			skipInstall: options["skip-install"],
			callback: function () {
				if (options["skip-install"]) {
					console.log("You should now run " + chalk.cyan("bower install") + " to install the " +
						"dependencies. Then, point your browser to " + chalk.cyan("index.html") + " to run the " +
						"skeleton sample application.");
				} else {
					console.log("Dependencies have been installed, point your browser to " + chalk.cyan("index.html") +
						" to run the skeleton sample application.");
				}
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

	// TODO:  which themes?, using dapp? build or unbuilt layer?, binding, mobile meta viewport ?

	this.prompt([
		{
			name: "package",
			message: "What is the name of your deliteful application package?",
			default: this.appname.indexOf(" ") !== -1 ? _.slugify(this.appname) : this.appname
		},
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
	this.copy("app.js", "js/app.js");
	this.copy("app.css", "css/app.css");
};

DelitefulAppGenerator.prototype.projectfiles = function projectfiles() {
	this.copy("jshintrc", ".jshintrc");
};
