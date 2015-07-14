var tpl = require('./template/tooltip.html');
var Overlay = require('./Overlay.js');
var R = require('regularjs');
var dom = require('./util/dom');
var _ = require('./util/util');


/**
 * Tooltip Component for Regular
 * @param  data 
 *         - placement: top, left, bottom, right, auto
 *         - container: contaienr to injected, default is body
 *         - target: next to 
 *         - $body: if dont used as composite component
 * @return {[type]}     [description]
 */
var Tooltip = module.exports = R.extend({
  name: 'tooltip',
  template: tpl,
  config: function(data){
    // if tooltip is used in <overlay> <tooltip></tooltip> </overlay>
    var $outer= this.$outer;
    if($outer instanceof Overlay){
      data.placement = $outer.data.placement || 'top';
    }
  }
})



