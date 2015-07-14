var tpl = require('./template/overlay.html');
var R = require('regularjs');
var dom = require('./util/dom');
var _ = require('./util/util');


/**
 * Overlay Component for Regular
 * @param  data 
 *         - placement: top, left, bottom, right, auto
 *         - container: contaienr to injected, default is body
 *         - target: next to 
 *         - $body: if dont used as composite component
 * @return {[type]}     [description]
 */
var Overlay = module.exports = R.extend({
  name: 'overlay',
  template: tpl,
  config: function(data){
    _.extend(data, {
      container: document.body,
      placement: 'auto',
      gap: 10
    })
    // if the most outside component has been inject to document
    this.$root.$on('$inject', function(){
      this.$watch('show', function(show){
        if(show){
          this.$inject(data.container, 'bottom')
          this.placement();
        }else{
          this.$inject(false)
        }
      })
    }.bind(this))
  },
  // make sure component is not autemately injected 
  // during compiling stage
  node: function(){return undefined},
  init: function(){
    var overlay = this.$refs.overlay;
    overlay.style.position = 'absolute';
    overlay.style.top = '-9999px';
    overlay.style.left = '-9999px';

  },
  toggle: function(force){
    this.$update('show', force == null? !this.data.show : force)
  },
  // the position logic here
  placement: function(){
    var overlay = this.$refs.overlay;
    var data = this.data;

    if(!data.target) throw new Error('need target for placement')

    var position = dom.position(data.target, data.container);
    var size = dom.size(data.target);
    var mySize = dom.size(overlay);
    var gap = data.gap;
    var top, left;


    switch(data.placement){
      case 'top':
        top = position.top -  mySize.height - gap - 10;
        left = position.left -  (mySize.width - size.width) / 2;
        break;
      case 'left':
        top = position.top -  (mySize.height - size.height) / 2;
        left = position.left -  mySize.width - gap;
        break;
      case 'right':
        top = position.top -  (mySize.height - size.height) / 2;
        left = position.left + size.width + gap;
        break;
      case 'bottom':
        top = position.top + size.height + gap;
        left = position.left -  (mySize.width - size.width) / 2;
        break;
    }


    overlay.style.top = top + 'px';
    overlay.style.left = left + 'px';
  }
})

