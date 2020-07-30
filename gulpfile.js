var gulp = require("gulp");
var browserify = require("browserify");
var fs = require("fs");
var less = require("gulp-less"); // less 编译
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer'); //把流转成buffer
var tsify = require("tsify"); //就像gulp-typescript一样
var handleErrors = require('./node/gulp/handleError');
var cleanCss = require("gulp-clean-css"); //压缩cssr
var del = require('del'); //删除文件1
var rename = require("gulp-rename"); //  重命名
var logger = require('gulp-logger');
var rev = require('@stl/wl-gulp-rev');
var revCollector = require('@stl/wl-gulp-rev-collector');
var bom = require('gulp-bom');
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var watchify = require("watchify"); //实时更新ts
var ts = require('gulp-typescript');
var gulpif = require("gulp-if"); //判断
var karmaServer = require('karma').Server;

var build = require('./node/gulp/build');
var config = require("./node/gulp/config");
var paths = build.paths;
var isArrayFn = build.isArrayFn;

notify = require('gulp-notify');
plumber = require('gulp-plumber');

var minimist = require('minimist'); //命令行参数解析引擎
var compress = minimist(process.argv.slice(2)).compress ? JSON.parse(minimist(process.argv.slice(2)).compress) : false;
var iswatch = minimist(process.argv.slice(2)).watch ? JSON.parse(minimist(process.argv.slice(2)).watch) : false;

gulp.task("build", function (cb, filename) {
    return defaults(cb, filename);
});

var objectFileAry = [];
var defaults = function (cb, filename) {
    if (filename && paths.jspages.indexOf(filename) < 0) {
        return;
    }

    var file = filename ? filename : paths.jspages;
    file = isArrayFn(file) ? file : [file];

    file.forEach(i => {
        if (!objectFileAry[i]) objectFileAry[i] = {};
        objectFileAry[i].src = i.slice(0, i.replace("/", '\\').lastIndexOf("\\") + 1);
        objectFileAry[i].sourceSrc = i.slice(i.lastIndexOf('\\') + 1, i.lastIndexOf('.'));

        let b = browserify({
            basedir: './',
            debug: !compress, //允许在浏览器中直接调试TypeScript源码
            entries: [i],
            cache: {},
            packageCache: {}
        })
            //使用tsify插件调用Browserify
            .plugin(tsify)

        if (iswatch) {
            b = watchify(b)
        }

        objectFileAry[i].ify = b
        //.transform(babelify, { extensions: [ '.tsx', '.ts' ] })
    })


    var index = 0;
    Object.keys(objectFileAry).forEach(i => {

        bundle(objectFileAry[i], file, index++, cb);
    })
}

function bundle(w, file, i, cb) {
    (function (w, file, i, cb) {
        w.ify.on('error', handleErrors)
            //转换为gulp能识别的流
            .bundle()
            //报错不跳出
            .on('error', function (error) { console.error(error.toString()); })
            .pipe(source(w.sourceSrc + '.js')) //生产出bundle.js
            .pipe(buffer())
            .pipe(rev(compress))
            .pipe(logger({ showChange: true }))

            .pipe(gulp.dest(w.src.replace("\\dev\\", "\\dist\\"))) //存放在dist文件夹下面
            .pipe(rev.manifest())
            .pipe(gulp.dest("./rev_manifest/js/"))
            .on('end', () => {
                try {
                    if (file.length - 1 === i) {

                        cb && cb();
                    }
                } catch (e) { }
            })
    })(w, file, i, cb)

}

gulp.task("namespace", function (cb) {
    return gulp.src('./Scripts/namespace/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            sourceMap: true,
            declaration: true,
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('app/js'));
})


//压缩js
gulp.task("js", function () {
    return gulp.src("Scripts/dist/**/*.js")
        .pipe(logger({ showChange: true }))
        .pipe(rev(compress))
        .pipe(gulpif(compress, uglify()))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(bom())
        .pipe(gulp.dest(config.js.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev_manifest/js/"));
})

//js的public的文件压缩生成版本并输出到dist/public里面
gulp.task("public", function () {
    return gulp.src(config.js.public_dev)
        .pipe(logger({ showChange: true }))
        .pipe(rev(compress))
        .pipe(gulpif(compress, uglify()))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(bom())
        .pipe(gulp.dest(config.js.public_dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev_manifest/publicjs/"));
})


//gulp的js压缩和生成版本号
gulp.task("gulpjs", function () {
    return gulp.src([config.gulp.dev_js])
        .pipe(logger({ showChange: true }))
        .pipe(rev(false))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(bom())
        .pipe(gulp.dest(config.gulp.dist_js))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev_manifest/glup/js/"))
})

//gulp的css压缩和生成版本号
gulp.task("gulpcssmin", function () {
    return gulp.src([config.gulp.dev_css])
        .pipe(logger({ showChange: true }))
        .on('error', handleErrors)
        .pipe(rename({ suffix: '' }))
        .pipe(cleanCss({ compatibility: 'ie7' }))
        .pipe(rev())
        .pipe(bom())
        .pipe(gulp.dest(config.gulp.dist_css))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev_manifest/glup/js/"))
})

////////////////////////////////////////////////////////

///////////////////样式的处理///////////////////////////////

//less的压缩生成版本号
gulp.task("less", function () {
    return gulp.src(config.less.dev)
        .pipe(logger({ showChange: true }))
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less())
        .pipe(rev(compress))
        .pipe(rename({ suffix: '' }))
        .pipe(cleanCss({ compatibility: 'ie7' }))
        .pipe(bom())
        .pipe(gulp.dest(config.less.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev_manifest/less/"));
})

//css的public的文件生成版本并输出到dist/public里面
gulp.task("publicless", function () {
    return gulp.src(config.less.public_dev)
        .pipe(logger({ showChange: true }))
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less())
        .pipe(rev(compress))
        .pipe(rename({ suffix: '' }))
        .pipe(cleanCss({ compatibility: 'ie7' }))
        .pipe(bom())
        .pipe(gulp.dest(config.less.public_dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev_manifest/public/less/"));
})

///////////////////////////////////////////////////////////////

//////////////////// 给页面添加版本号 //////////////////
gulp.task('rev', function () {
    return gulp.src(["rev_manifest/**/*.json", "../**/*.cshtml", "../**/*.html"])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                "Scripts/dist": "Scripts/dist", //不加的话，版本号添加不了
                "Styles/dist": "Styles/dist",
                "Styles/dist/public": "Styles/dist/public"
            }
        }))
        .pipe(bom()) //一定要在输出前引入该包
        .pipe(gulp.dest("../"))
})
/////////////////////////////////////////////////////////////

//////////////////////// 删除js和css的dist文件 //////////////////////////
gulp.task('clean', function () {
    return del([
        config.clean.js,
        config.clean.css,
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        //  'dist/mobile/**/*',
        // 我们不希望删掉这个文件，所以我们取反这个匹配模式
        //    "!style/dist/**/!(Public)*"
    ]);
})
//////////////////////////////////////////////////////////////

gulp.task('watchUpdate', function () {
    // gulp.watch(["**/*.ts", "!**/node_modules/**"], fileWatch);

    gulp.watch(config.less.dev, gulp.parallel("less"));
    gulp.watch(config.utils.less, gulp.parallel('less', 'publicless'));
    gulp.watch(config.less.public_dev, gulp.parallel('publicless'));

    Object.keys(objectFileAry).forEach(i => {
        objectFileAry[i].ify.on('update', () => { // 当任何依赖发生改变的时候，运行打包工具
            bundle(objectFileAry[i])
        })
    })
})

function fileWatch(e) {
    console.log(e.path);
    if (fs.existsSync(e.path)) {
        var stat = fs.statSync(e.path);
        if (stat.isFile())
            defaults(null, e.path);
    }
}


gulp.task("devStart",
    gulp.series(
        'clean',
        'build',
        gulp.parallel('gulpjs', 'less', 'publicless', 'public'),
        'js'
    ),
)

gulp.task("watch",
    gulp.series(
        'clean',
        'build',
        gulp.parallel('gulpjs', 'less', 'publicless', 'public'),
        'js',
        'watchUpdate'
    ))

gulp.task("gaStart",
    gulp.series(
        'clean',
        'build',
        gulp.parallel('publicless', 'gulpjs', 'gulpcssmin', 'public'),
        gulp.parallel('less', 'js'),
        'rev'
    ))



gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});