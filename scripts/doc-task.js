var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var marked = require('marked');
var async = require('async');
var path = require('path');
var gulp = require('gulp');
var mcss = require('./gulp-mcss');
var swig = require('swig');
var fs = require('fs');


swig.setDefaults({ cache: false });



// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

swig.setFilter('markdown', function(value){
  return marked(value);
})


swig.setFilter('demo', function(value){
  return value.replace(/\{#examples\s+([\-\.\w]*)}/g, function(all, name){
    var content;
    try{
      content = fs.readFileSync( path.join(__dirname, '../doc/examples', name), 'utf8')
    }catch (e){
      content = 'Load ' + name + ' Failed!!'
      console.log(content);
    }
    return '<textarea class="j-editor" style="display:none">'+ content +'</textarea>'
  }).replace('<table>', '<table class="table table-bordered table-striped">')
})


gulp.task('doc-css', function(){
  gulp.src( path.join(__dirname, '../doc/src/mcss/index.mcss' ))
    .pipe(mcss({
      pathes: [path.join(__dirname, "../node_modules")],
      importCSS: true,
    }))
    .pipe(gulp.dest( path.join(__dirname, '../doc/public') ));
})


gulp.task('doc-template', function(done){
  var docdir = path.join(__dirname, '../doc/document')
  async.waterfall([
      fs.readdir.bind(fs, docdir),
      function(args, callback){ 
        async.map(args, function(arg, cb){
          fs.readFile(path.join(docdir, arg), 'utf8', cb)
        }, callback)
      },
      function(args, callback){
        sections = args.map(function(content){
          return {content: content}
        })

        swig.renderFile(path.join(__dirname, '../doc/src/templates/document.html'), {
          sections: sections
        },callback)
      },
      fs.writeFile.bind(fs, path.join(__dirname, '../doc/public/index.html'))
  ],done);
})

gulp.task('doc-js', function(){

  gulp.src("doc/src/index.js")
    .pipe(webpack({
      cache : true,
      output: {
        filename: 'client.bundle.js'
      },
      module: {
        loaders: [
           { test: /\.js$/, loader: 'babel?cacheDirectory'}
       ]
      }
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('./doc/public'))
})


gulp.task('doc', ['doc-template', 'doc-js', 'doc-css'])

