var webpack = require('gulp-webpack');
var deploy = require("gulp-gh-pages");
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var pkg = require("./package.json");
var shell = require("gulp-jshint");
var doc = require('./scripts/doc-task.js');
var through = require('through2');
var shell = require("gulp-shell");
var gulp = require('gulp');
var path = require('path');



var wpConfig = {
 output: {
    filename: "regular-bootstrap.js",
    library: "Reboot",
    libraryTarget: "umd"
  },
  externals: {
    "regularjs": "Regular"
  },
  module: {
    loaders: [
       { test: /\.html$/, loader: path.join(__dirname, './scripts/webpack/rgl-loader.js')},
       { test: /\.js$/, loader: 'babel?cacheDirectory'}
   ]
  }
}

gulp.task('jshint', function(){
      // jshint
  gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

})


gulp.task('build', [  ], function() {
  gulp.src("src/index.js")
    .pipe(webpack(wpConfig))
    .pipe(wrap(signatrue))
    .pipe(gulp.dest('./dist'))
    .pipe(wrap(mini))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .on("error", function(err){
      throw err
    })
});


gulp.task('watch', ["build", "doc"], function(){
  gulp.watch(['src/**/*'], ['build']);
  gulp.watch(['doc/src/**/*.js', 'src/**/*'], ['doc-js']);
  gulp.watch(['doc/document/*','doc/src/templates/*', 'doc/examples/*.js' ], ['doc-template']);
  gulp.watch(['doc/src/mcss/*.mcss' ], ['doc-css']);
})


gulp.task('default', [ 'watch']);




gulp.task('karma', function (done) {
  var config = _.extend({}, karmaCommonConf);
  if(process.argv[3] === '--phantomjs'){
    config.browsers=["PhantomJS"]
    config.coverageReporter = {type : 'text-summary'}

    karma.start(_.extend(config, {singleRun: true}), done);

  }else if(process.argv[3] === '--browser'){
    config.browsers = null;
    karma.start(_.extend(config, {singleRun: true}), done);
  }else{
    karma.start(_.extend(config, {singleRun: true}), done);
  }
});


gulp.task("test", ["mocha", "karma"])


gulp.task('travis', ['jshint' ,'build','mocha',  'karma']);



gulp.task('deploy', ['doc'], function () {
  gulp.src("doc/public/**/*.*")
    .pipe(deploy({
      remoteUrl: "git@github.com:regular-ui/bootstrap",
      branch: "gh-pages"
    }))
    .on("error", function(err){
      console.log(err)
    })
});


function wrap(fn){
  return through.obj(fn);
}

function signatrue(file, enc, cb){
  var sign = '/**\n'+ '@author\t'+ pkg.author.name + '\n'+ '@version\t'+ pkg.version +
    '\n'+ '@homepage\t'+ pkg.homepage + '\n*/\n';
  file.contents =  Buffer.concat([new Buffer(sign), file.contents]);
  cb(null, file);
}

function mini(file, enc, cb){
  file.path = file.path.replace('.js', '.min.js');
  cb(null, file)
}