var typedoc = require("gulp-typedoc");
var gulp = require("gulp")

//Gulp Task to create the docs
gulp.task("typedoc", function () {
    return gulp.src(["src/**/*.ts"]).pipe(
        typedoc({
            out: "docs/",
            name: "This is IT",
        })
    );
});