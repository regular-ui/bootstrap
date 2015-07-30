
import Regular from 'regularjs';

// template
const tpl = `
  <div class="{layer}-backdrop {klass} fade in" 
    r-animation='on:enter;class: in,3; on:leave; class: in, 4' 
    r-style="'background-color': bgColor"
    on-click='click' >
    {#inc this.$body}
  </div>
`
// ---
// 


const Mask =  Regular.extend({
  
  name: "mask",
  template: tpl,

  node(){},

  config( data ){
    data.layer = data.layer || 'modal';
  },
  // after compile
  init(){
    let data = this.data;
    this.$watch('!!show', function(show, oshow){
      let body = data.container || document.body
      this.$inject(show? body: false)
    }, {init: true})

    this.$on('click', function(){
      if(data.autoClose){
        this.$update('show', false)
      }
    })
  },
  toggle(force){
    let show = this.data.show;
    this.$update('show', force != undefined? force: !show)
  }
})


let mask = Mask.mask = new Mask();
Mask.show = function(options){
  if(options === true) options = {autoClose: true}
  mask.$update( {
    bgColor: options.bgColor,
    autoClose: options.autoClose !== false,
    show: true
  }, true)
  return mask;
}

export default Mask;


