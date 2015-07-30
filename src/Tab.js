import Regular from 'regularjs';

let _ = Regular.util;

const tpl = `
  <ul class="nav nav-tabs">
     {#inc this.$body}
  </ul>
  <div class='tab-content' r-anim='on:switch;class:fade in'>
    {#inc selected.$body}
  </div>
`

const Tab = Regular.extend({
  name: 'tab',
  template: tpl
})

const paneTpl = `
  <li role="presentation" class={this.$outer.data.selected==this? 'active':''} on-click={this.pick()}>
    <a href={href || 'javascript:;'}>{#inc title}</a>
  </li>
`

Tab.Pane = Regular.extend({
  name: 'tab.pane',
  template: paneTpl,
  config: function(data){
    if(data.selected) this.pick();
  },
  pick: function(){
    if(!this.$outer) return;
    this.$outer.$update('selected', this);
  }
})

export default Tab;



