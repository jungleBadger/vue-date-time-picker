/*jslint node: true, nomen:true*/
/*env:node*/
(function () {
	"use strict";
	require("dotenv").config({"silent": true});
	const gulp = require("gulp");
	const argv = require("yargs").argv;
	const browserify = require("browserify");
	const commonShake = require("common-shakeify");
	const cond = require("gulp-cond");
	const fse = require("fs-extra");
	const rename = require("gulp-rename");
	const cssnano = require("cssnano");
	const cache = require("gulp-cache");
	const postcss = require("gulp-postcss");
	const buffer = require("vinyl-buffer");
	const source = require("vinyl-source-stream");
	const sourcemaps = require("gulp-sourcemaps");
	const sass = require("gulp-sass");
	const babelify = require("babelify");
	const vueify = require("vueify");
	const eslint = require("gulp-eslint");
	const plumber = require("gulp-plumber");
	const cssnext = require("postcss-cssnext");
	const log = require("fancy-log");
	const colors = require("ansi-colors");
	const terser = require("gulp-terser");
	const cssUglifier = [
		cssnano()
	];

	let browserifyInstance;
	let browserifyInstanceSample;
	let isProd;

	vueify.compiler.applyConfig({
		"postcss": [cssnext({})]
	});

	process.env.NODE_ENV = argv.prod ? "production" : "development";
	isProd = process.env.NODE_ENV === "production";
	let methods = {
		"errorHandler": function errorHandler(module, error, stack) {
			log(colors.red("ERROR FOUND BUILDING THIS ARTIFACT:"), colors.yellow(module));
			log(stack);
			log(error);
			process.exit(1);
		},
		"bundleJS": function bundleJS(done = (() => false)) {
			if (isProd) {
				fse.remove("dist/js/bundle.js.map");
			}
			browserifyInstance.bundle()
				.on("error", function (err) {
					log(err);
				})
				.pipe(source("src/js/main.js"))
				.pipe(cond(!isProd, plumber()))
				.pipe(buffer())
				.pipe(rename("bundle.js"))
				.pipe(terser({
					"module": true
				}))
				.pipe(cond(!isProd, sourcemaps.init({"loadMaps": true})))
				.pipe(cond(!isProd, sourcemaps.write("./")))
				.pipe(gulp.dest("./dist/js/"));

			done();
			return isProd ? log("FINISHED PRODUCTION BUILD") : log("FINISHED DEV BUILD");
		},
		"bundleSamples": function bundleJS(done = (() => false)) {
			if (isProd) {
				fse.remove("samples/dist/js/bundle.js.map");
			}
			browserifyInstanceSample.bundle()
				.on("error", function (err) {
					log(err);
				})
				.pipe(source("samples/js/main.js"))
				.pipe(cond(!isProd, plumber()))
				.pipe(buffer())
				.pipe(rename("bundle.js"))
				.pipe(terser({
					"module": true
				}))
				.pipe(cond(!isProd, sourcemaps.init({"loadMaps": true})))
				.pipe(cond(!isProd, sourcemaps.write("./")))
				.pipe(gulp.dest("./samples/dist/js/"));

			done();
			return isProd ? log("FINISHED PRODUCTION BUILD") : log("FINISHED DEV BUILD");
		}
	};


	gulp.task("lint", function () {
		return gulp.src(["src/js/**/*.js", "src/js/**/*.vue"])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	});


	gulp.task("js", function (done) {
		let plugins = isProd ? [commonShake] : [];

		browserifyInstance = browserify({
			"entries": "./src/js/main.js",
			"noParse": ["vue.js"],
			"plugin": plugins,
			"cache": {},
			"packageCache": {},
			"debug": !isProd,
			"standalone": "VueDateTimePicker",
			"detectGlobals": true,
			"insertGlobalVars": false
		}).transform("envify", {
			"global": true,
			"NODE_ENV": process.env.NODE_ENV,
		})
			.transform(babelify)
			.transform(vueify)
			.on("update", function () {
				methods.bundleJS(done);
			});

		return methods.bundleJS(done);
	});

	gulp.task("css", function () {
		if (isProd) {
			fse.remove("/dist/css/style.css.map");
		}
		return gulp.src([
			"./src/scss/*.css",
			"./src/scss/*.scss"
		])
			.pipe(plumber())
			.pipe(postcss([
				cssnext({})
			]))
			.pipe(cond(!isProd, sourcemaps.init({"loadMaps": true})))
			.pipe(cache(sass().on("error", sass.logError)))
			.pipe(cond(isProd, postcss(cssUglifier)))
			.pipe(cond(!isProd, sourcemaps.write("./")))
			.pipe(gulp.dest("./dist/css/"));
	});


	gulp.task("build", gulp.parallel("lint", "js", "css"));

	gulp.task("build-samples", function (done) {
		let modulePath = "samples";

		let plugins = isProd ? [commonShake] : [];

		browserifyInstanceSample = browserify({
			"entries": modulePath + "/js/main.js",
			"noParse": ["vue.js"],
			"plugin": plugins,
			"cache": {},
			"packageCache": {},
			"debug": !isProd
		}).transform("envify", {
			"global": true,
			"NODE_ENV": process.env.NODE_ENV,
		})
			.transform(babelify)
			.transform(vueify)
			.on("update", function () {
				methods.bundleSamples(done);
			});

		return methods.bundleSamples(done);
	});

	gulp.task("build-all", gulp.series("build", "build-samples"));


	process.on("exit", function (code) {
		log("About to exit with code:", code);
	});

}());
