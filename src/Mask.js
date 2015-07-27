
import Regular from 'regularjs';
import _ from './util/util';
import './util/directive';

// template
const tpl = `
  <div class="{layer}-backdrop fade" 
    r-animation='on:enter;class: in,3; on:leave; class: in, 4' 
    on-click='click' >{#inc this.$body}</div>
`

const Mask =  Regular.extend({
  
  name: "mask",
  template: tpl,

  node(){return false},

  config( data ){
    data.layer = data.layer || 'modal'
    this.$watch('show', function(show, oshow){
      let bShow = !!show;
      let bOshow = !!oshow;
      let body = document.body;

      if(bShow && !bOshow){

        this.$inject(body)

      }else if(!bShow && bOshow){
        this.$inject( false )
      }
    })
  }
})

const mask = Mask.mask = new Mask();

Mask.toggle = function(force){
  let show = mask.data.show;
  mask.$update('show', force != undefined? force: !show)
}

export default Mask;


