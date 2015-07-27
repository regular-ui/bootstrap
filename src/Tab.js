import Regular from 'regularjs';


export default Regular.extend({
  name: 'tooltip',
  template: tpl,
  config (data){
    // if tooltip is used in <overlay> <tooltip></tooltip> </overlay>
    let $outer= this.$outer;
    if($outer instanceof Overlay){
      data.placement = $outer.data.placement || 'top';
    }
  }
})



