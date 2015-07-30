import Regular from 'regularjs';
import _ from './util/util';
import Mask from './Mask';

const tpl = `
<mask show={show} on-click={show=false}></mask>
<div class="modal fade show in" r-anim='on:enter;class: in, 3; on: leave; class: in, 4' tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content" role="document">
      <div class="modal-header">
        {#if closeButton}
        <button class="close" aria-label="Close" on-click={show = false}>
          <span aria-hidden="true">×</span>
        </button>
        {/if}
        <h4 class="modal-title">{#inc head || 'Modal'}</h4>
      </div>
      <div class="modal-body">
        {#inc  body || this.$body }
      </div>
      <div class="modal-footer">
        {#if foot} 
          {#inc foot } 
        {#else}
          <button type="button" class="btn btn-default" on-click={ this.confirm(true) }>Confirm</button>
          <button type="button" class="btn btn-default" on-click={ this.confirm(false) }>Cancel</button>
        {/if}
      </div>
    </div>
  </div>
</div>
`


/**
 * [description]
 * @param  {Boolean} show     whether inject modal to target
 * @param  {Node}    target   [Optinal] where to place modal, default is document.body
 *
 * @event   confirm  
 *          @param {Boolean} accept 
 *
 * @return  {Modal}
 */
const Modal  = Regular.extend({
  name: "modal",
  template: tpl,

  node(){},

  config (data){ },

  init(){
    let data = this.data;
    this.$watch('!!show', function(show, oshow){
      let body = data.container || document.body
      this.$inject(show? body: false)
    }, {init: true})
  },
  confirm (accept){
    // this.$update can be used like `scope.apply` in angularjs
    this.$update(function(data){
      this.$emit('confirm', accept);
      if(data.autoClose){
        data.show = false;
      }
    })
  }
});

['Head', 'Body', 'Foot'].forEach(function( name ){
  let lname = name.toLowerCase();
  Modal[name] = Regular.extend({
    name: 'modal.' + lname,

    init(){
      // this.$outer point to modal
      this.$outer.data[lname] = this.$body;
    }
  })
})


const statics = {
  alert: {
    body: `<p>{#inc content}</p>`,
    foot: `<button type="button" class="btn btn-primary" on-click={ this.confirm(true) }>Confirm</button>`
  },
  prompt: {
    body: `<div class="form-group">
            <label class="control-label">{#inc content}:</label> 
            <input type="text" class="form-control" >
           </div>`
  },
  confirm: {
    body: '<p>{#inc content}</p>'
  }
};

['alert', 'confirm', 'prompt'].forEach(function( name ){
  let modal = new Modal({
    $body: statics[name].body,
    data: {
      foot: statics[name].foot,
      closeButton: true
    }
  })
  Modal[name] = function( conf ){

    if(typeof conf === 'string') conf = {content: conf}
    if(!conf.title) conf.title = "message from " + location.origin
    conf.show = true;

    modal.$update(conf)
    return modal;
  }
})


export default Modal;