const component = new Regular({
  template: ` 
  <div class="btn-group" role="group" aria-label="...">
    <dropdown-button title='down' selected={selected}  style={selected? 'primary': 'default'} dropup>
      {#list ['1', '2', '3'] as item}
        <select-item> The menu {item}  </select-item>
      {/list}
      <select-item disabed> The  menu 4 </select-item>
      {#list 5..6 as item}
        <select-item> The menu {item} </select-item>
      {/list}
    </dropdown-button>
    <button class='btn btn-info'>第二个button</button>
    <button class='btn btn-info'>第二个button</button>
  </div>
  `
})
