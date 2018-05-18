var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var watchify = require("watchify");
var babel = require("babelify");

function compile(watch) {
    var bundler = watchify(
        browserify({
            entries: "./src/main.jsx",
            extensions: [".jsx"],
            debug: true,
        }).transform("babelify", {
            presets: ["babel-preset-env", "babel-preset-react"],
        }),
    );

    function rebundle() {
        bundler
            .bundle()
            .on("error", function(err) {
                console.error(err);
                this.emit("end");
            })
            .pipe(source("main.js"))
            .pipe(buffer())
            .pipe(
                sourcemaps.init({
                    loadMaps: true,
                }),
            )
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest("./dist"));
    }

    if (watch) {
        bundler.on("update", function() {
            console.log("-> bundling...");
            rebundle();
        });
    }

    rebundle();
}

gulp.task("build-styles", function() {
    var sass = require("gulp-sass"),
        cssmin = require("gulp-cssmin"),
        rename = require("gulp-rename");

    return gulp
        .src("./src/styles/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(cssmin())
        .pipe(
            rename({
                suffix: ".min",
            }),
        )
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("build-images", function() {
    return gulp.src("./src/images/**").pipe(gulp.dest("./dist/img"));
});

gulp.task("build-fonts", function() {
    return gulp.src("./src/fonts/**").pipe(gulp.dest("./dist/fonts"));
});

gulp.task("build-sounds", function() {
    return gulp.src("./src/sounds/**").pipe(gulp.dest("./dist/snd"));
});

gulp.task("build-scripts", function() {
    return compile(false);
});

gulp.task("build-html", function() {
    return gulp.src("./src/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("build-watch", function() {
    return compile(true);
});

gulp.task("build", ["build-styles", "build-images", "build-fonts", "build-sounds", "build-html", "build-scripts"]);
