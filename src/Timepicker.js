var tpl = require('./template/timepicker.html');
var Regular = require('regularjs');

// <pager total=3 current=1></pager>

module.exports = Regular.extend({
  name: "timepicker",
  template: tpl,
  config: function(data){}
});

