var typedoc = require("gulp-typedoc");
var gulp = require("gulp")
gulp.task("typedoc", function () {
    return gulp.src(["src/**/*.ts"]).pipe(
        typedoc({
            out: "docs/",
            name: "This is IT",
        })
    );
});