import Regular from 'regularjs';
import _ from './util/util';

const tpl = `
<li r-class='"dropdown-header": header, "divider": divider, "disabled": disabled'>
  {#if !divider}
    {#if !header }
      <a href="javascript:;" on-click={ this.$outer.pick(this)} >{#inc this.$body}</a>
    {#else}
      {#inc this.$body}
    {/if}
  {/if}
</li>
`

const SelectItem =  Regular.extend({

  name: 'select-item',
  template: tpl,

  config (data){
    this.$outer.data.items.push(this)
    if(data.selected) this.$outer.data.selected = this;
  }

})

export default SelectItem;