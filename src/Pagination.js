var tpl = require('./template/pagination.html');
var Regular = require('regularjs');

// <pager total=3 current=1></pager>
var Pager = Regular.extend({
  name: "pager",
  template: tpl,
  config: function(data){
    var count =  5;
    var show = data.show = Math.floor( count/2 );
    data.current = parseInt(data.current || 1, 10);
    data.total = parseInt(data.total || 1, 10);

    this.$watch(['current', 'total'], function( current, total ){
      data.begin = current - show;
      data.end = current + show;
      if(data.begin < 2) data.begin = 2;
      if(data.end > data.total-1) data.end = data.total-1;
      if(current-data.begin <= 1) data.end = data.end + show + data.begin- current;
      if(data.end - current <= 1) data.begin = data.begin-show-current+ data.end;
    });
  },
  nav: function(page){
      var data = this.data;
      if(page < 1) return false;
      if(page > data.total) return false;
      if(page === data.current) return false;
      var evObj = {page: page}
      this.$emit('nav', evObj);
      if(!evObj.stop){
        data.current = page;
      }
      // preventDefault
      return false;
  }
});

module.exports = Pager;