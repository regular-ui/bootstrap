
import Regular from 'regularjs';
import Overlay from './Overlay';
import _ from './util/util';

const tpl = `
<div role='tooltip' class='tooltip {placement}' style='position:relative'>
  <div class='tooltip-arrow'></div>
  <div class='tooltip-inner'>{#inc this.$body}</div>
</div>
`

// tooltip can be composited with Overlay for alignment
// <overlay> <tooltip>your content</tooltip> </overlay>
export default Regular.extend({
  name: 'tooltip',
  template: tpl,
  config( data ){
    let $outer= this.$outer;
    if($outer instanceof Overlay){
      data.placement = $outer.data.placement;
    }
    data.placement = data.placement || 'top';
  }
})
