/* jshint node: true */
module.exports = function (grunt) {

	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		clean: {
			dist: ["dist"]
		},

		concat: {
			options: {
				separator: "",
				banner: grunt.file.read("src/banner.js"),
				process: function (source, filepath) {
					// conditionally concatenate source
					if (!(/(in|ou)tro\.js$/).test(filepath)) {
						source = ("\n" + source).replace(/\n/gm, "\n\t").replace(/\n\t\n/gm, "\n\n");
					}

					// spaces -> tabs
					source = source.replace(/    /g, "\t");

					// trim whitespace
					source = source.replace(/\s+\n/g, "\n\n");

					return source;
				}
			},

			dist: {
				src: [
					"src/intro.js",

					// Modules
					"src/modules/AnimationFrame.js",
					"src/modules/Animate.js",
					"src/modules/Easing.js",
					"src/modules/Scroller.js",

					"src/exports.js",
					"src/outro.js"
				],

				dest: "dist/scroller.js"
			}
		},

		jshint: {
			options: grunt.file.readJSON(".jshintrc"),
			afterconcat: ["dist/scroller.js"]
		},

		uglify: {
			options: {
				banner: "/*! Scroller <%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */",
				sourceMap: "dist/scroller.min.js.map",
				warnings: true,
				mangle: true,
				unused: true,
				compress: {
					unsafe: true
				}
			},
			dist: {
				files: {
					"dist/scroller.min.js": ["dist/scroller.js"]
				}
			}
		},

		watch: {
			js: {
				files: [
					"src/**/*.js"
				],
				tasks: ["concat", "jshint", "uglify"]
			}
		}
	});

	// Load required grunt-* packages
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.registerTask("build", ["clean", "concat", "uglify"]);

};
