import SelectAble from './SelectAble';
import './util/directive';

const tpl = `
  <mask show={ show } layer=dropdown on-click={ show = false }></mask>
  <div class="btn-group {className}" r-class={ {'dropup': dropup, 'open': show} } role="group">
    <button type="button" 
      class="btn btn-{style || 'default'} dropdown-toggle" 
      aria-haspopup="true" aria-expanded={!!show}
      on-click={ show=!show } >
      {#inc selected? selected.$body : title }
      {#if @(!split)}
      <span class="caret"></span>
      {/if}
    </button>
    {#if @(split)}
    <button 
      on-click={show =!show}
      type="button" 
      class="btn btn-{style || 'default'} dropdown-toggle" 
      aria-haspopup="true" aria-expanded={!!show}>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    {/if}
    <ul class="dropdown-menu">
      {#inc this.$body}
    </ul>
  </div>
`

export default SelectAble.extend({
  name: "dropdown-button",
  template: tpl
});

