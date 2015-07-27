import Regular from 'regularjs';
import _ from './util/util';


const SelectAble = Regular.extend({

  config ( data ){
    _.extend( data, {
      items: []
    })
  },

  pick (item){
    var data = this.data;
    if(item.data.disabled) return;

    data.selected = item;
    data.show = false;
    
    this.$update();
    this.$emit('pick', item);
  }
})


export default SelectAble




