import SelectAble from './SelectAble';
import './util/directive';

const tpl = `
  <mask show={show} layer=dropdown on-click={show=false}></mask>
  <div class="btn-group" r-class={ {'dropup': dropup, 'open': show} } role="group">
    <button type="button" 
      class="btn btn-{style || 'default'} dropdown-toggle" 
      data-toggle="dropdown" aria-haspopup="true" aria-expanded={!!show}
      on-click={show=!show} >
      {#inc selected.data.title || title }
      <span class="caret"></span>
    </button >
    <ul class="dropdown-menu">
      {#list items as item}
        {#inc item}
      {/list}
    </ul>
  </div>
`

export default SelectAble.extend({
  name: "dropdown-button",
  template: tpl
});
