var Tooltip = require('./Tooltip');
var tpl = require('./template/pophover.html');


// simplily replacing tooltip's  template, then we got Pophover
module.exports = Tooltip.extend({
  name: 'pophover',
  template: tpl
})