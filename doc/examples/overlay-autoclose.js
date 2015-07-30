const component = new Regular({
  template: ` 

  <div class='overlay-container'>
  <button ref='input' on-click={show = !show } class='btn btn-default'>
    Show Overlay
  </button>
  <overlay  auto-close target={this.$refs.input} show={show}  >
    <div class="alert alert-info">
      Click Anywhere out of the Box
    </div>
  </overlay>
  </div>

  `
})
