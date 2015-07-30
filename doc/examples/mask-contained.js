const component = new Regular({
  template: ` 
<div ref='container' 
      class='modal-container' 
      style='height:200px;'>
  <button class='btn btn-primary' on-click={ show = true}>Open Contained Mask</button>
          
  </div>
  <mask container={this.$refs.container} 
        show={show} 
        bg-color='#003' 
        auto-close ></mask>
`
})
