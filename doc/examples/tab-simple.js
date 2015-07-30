const component = new Regular({
  template: ` 
  <tab>
    <tab.pane title='tab1'>
      first content here
    </tab.pane>
    <tab.pane title='tab2' selected>
      You can pass any html in here
      <input type='checkbox' r-model={show} ref=input>
    </tab.pane>
  </tab>
  <overlay target = {this.$refs.input} show={show} placement=bottom > 

    <div class="alert alert-success" role="alert">
    任意内容1
    <a class='btn-sm btn-primary' on-click={show = false} href='#'>隐藏</a>
    </div>
  </overlay>

  `
})
