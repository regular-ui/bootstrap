import Regular from 'regularjs';

import events from './util/events';
import dom from './util/dom';
import _ from './util/util';


const tpl = `
<div ref=overlay class='overlay fade' r-anim='on:enter; class: in,3; on:leave; class: in,4' >
  {#inc this.$body}
</div>
`

const Overlay =  Regular.extend({
  name: 'overlay',
  template: tpl,

  config(data){

    _.extend(data, {
      container: document.body,
      placement: 'top',
      gap: 10
    })

    if(data.placement === 'auto'){
      data.placement = '';
      data.auto = true
    }
    // if the most outside component has been inject to document
    let destroy;
    this.$watch('show', function(show){
      if(show){
        this.$inject(data.container, 'bottom')
        if(data.autoClose){
          setTimeout(function(){
            destroy = events.clickouter.call(this, this.$refs.overlay, this.toggle.bind(this, false) )
          }.bind(this), 0)
        }
        this.placement();
      }else{
        this.$inject(false)
        if(destroy){
           destroy();
           destroy = false;
        }
      }
    })
  },
  // make sure component is not autemately injected 
  // during compiling stage
  node (){return undefined},
  init (){
    let data = this.data;
    let overlay = this.$refs.overlay;

    overlay.style.position = 'absolute';
    overlay.style.top = '-9999px';
    overlay.style.left = '-9999px';
  },
  toggle (force){

    this.$update('show', force == null? !this.data.show : force)
  },
  // the position logic here
  placement (){
    let overlay = this.$refs.overlay;
    let data = this.data;
    let placement = data.placement, position;

    if(!data.target) throw new Error('need target for placement')

    let isFixed = dom.getComputedStyle(data.target, 'position') === 'fixed';

    if(!isFixed){

      position = dom.position(data.target, data.container);

    }else{
      
      position = {
        top: data.target.offsetTop,
        left: data.target.offsetLeft
      }

    }
    let size = dom.size(data.target);
    let mySize = dom.size(overlay);
    let gap = data.gap;
    let top, left;

    this.$emit('placement', placement);

    switch(placement){
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
    overlay.style.position = isFixed? 'fixed' : 'absolute';
    overlay.style.top = top + 'px';
    overlay.style.left = left + 'px';
  }
})


export default Overlay;