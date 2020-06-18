var styles_dev = "Styles/dev/",
    styles_dist = "Styles/dist/",
    style_gulp = "Styles/gulp/",
    styles_public_dev = "Styles/utils/public/",
    styles_public_dist = "Styles/dist/public/",

    scripts_dev = "Scripts/dev/",
    scripts_dist = "Scripts/dist/",
    scripts_public_dev = "Scripts/public/",
    scripts_public_dist = "Scripts/dist/public/",

    gulpcss = "Styles/gulp/**/*.css",
    gulpjs = "Scripts/gulp/**/*.js";

utilscss = "Styles/utils/**/*.less";

module.exports = {
    js: {
        dev: scripts_dist + "**/*.js",
        dist: scripts_dist,
        public_dev: scripts_public_dev + "**/*.js",
        public_dist: scripts_public_dist
    },
    less: {
        dev: styles_dev + "**/*.less",
        dist: styles_dist,
        gulp: style_gulp,
        public_dev: styles_public_dev + "**/*.less",
        public_dist: styles_public_dist
    },
    utils: {
        less: utilscss
    },
    css: {
        dev: styles_dev + "**/*.css", //开发的css地址
        dist: styles_dist      //编译的css地址
    },
    gulp: {
        dev_js: gulpjs,
        dist_js: scripts_dist + "gulp",

        dev_css: gulpcss,
        dist_css: scripts_dist + "gulp"
    },

    clean: {
        js: "Scripts/dist/**/*",
        css: "Styles/dist/**/*",
        // noClean: "!style/dist/**/!(Public)*"
    },


}

