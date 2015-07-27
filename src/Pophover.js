import Tooltip from './Tooltip';

const tpl = `
<div role='tooltip' class='popover {placement} fade in show' style='position:relative'>
  <div class='arrow'></div>
  {#if title}<h3 class='popover-title' r-hide={!title}>{title}</h3>{/if}
  <div class='popover-content' >{#inc this.$body}</div>
</div>
`


// simplily replacing tooltip's  template, then we got Pophover
export default Tooltip.extend({
  name: 'pophover',
  template: tpl
})