var gulp = require("gulp");
var browserify = require("browserify");
var babel = require("babel-core/register");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var mocha = require("gulp-mocha");
var batch = require("gulp-batch");

gulp.task("default", ["test", "deploy"]);

gulp.task("deploy", [
    "deploy-html",
    "deploy-javascript",
    "deploy-styles",
    "deploy-images",
    "deploy-fonts",
    "deploy-sounds",
]);

gulp.task("test", function() {
    return gulp
        .src("./test/**/*.js", { read: false })
        .pipe(
            mocha({
                compilers: {
                    js: babel,
                },
            }),
        )
        .once("error", function() {
            process.exit(1);
        })
        .once("end", function() {
            process.exit();
        });
});

gulp.task("deploy-html", function() {
    return gulp.src("./src/index.html").pipe(gulp.dest("dist"));
});

gulp.task("deploy-javascript", function() {
    return browserify({
        entries: "./src/main.jsx",
        extensions: [".jsx"],
        debug: true,
    })
        .transform("babelify", {
            presets: ["es2015", "react"],
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
});

gulp.task("deploy-styles", function() {
    var sass = require("gulp-sass"),
        cssmin = require("gulp-cssmin"),
        rename = require("gulp-rename");

    return gulp
        .src("./src/styles/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(cssmin())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("deploy-images", function() {
    return gulp.src("./src/images/**").pipe(gulp.dest("./dist/img"));
});

gulp.task("deploy-fonts", function() {
    return gulp.src("./src/fonts/**").pipe(gulp.dest("./dist/fonts"));
});

gulp.task("deploy-sounds", function() {
    return gulp.src("./src/sounds/**").pipe(gulp.dest("./dist/snd"));
});

gulp.task("rgr", function() {
    gulp.watch(
        ["test/**", "lib/**"],
        batch(function(events, cb) {
            return gulp
                .src(["test/*.js"])
                .pipe(mocha({ reporter: "list" }))
                .on("error", function(err) {
                    console.log(err.stack);
                });
        }),
    );
});
