var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var watchify = require("watchify");
var babel = require("babelify");

var bundler = browserify({
    entries: ["./src/main.jsx"],
    extensions: [".jsx", ".js"],
    debug: true,
}).transform("babelify", {
    presets: ["babel-preset-env", "babel-preset-react"],
});

var bundle = () => {
    return bundler
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
};

var bundlefy = watchify(bundler);

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
    return bundle();
});

gulp.task("build-html", function() {
    return gulp.src("./src/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("build-watch", function() {
    return bundlefy
        .on("update", function() {
            console.log("-> Bundling ...");
            return bundle();
        })
        .on("error", function(err) {
            console.error(err);
            this.emit("end");
        })
        .on("log", function() {
            console.log("-> Waiting.");
            return;
        })
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(
            sourcemaps.init({
                loadMaps: true,
            }),
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist"));
});

gulp.task(
    "build",
    gulp.parallel("build-styles", "build-images", "build-fonts", "build-sounds", "build-html", "build-scripts"),
);
