const component = new Regular({
  template: ` 

  <div class='overlay-container'>
  <button ref='input' on-click={showOverlay = !showOverlay } class='btn btn-default'>
    {showOverlay? 'Hide' : 'Show' } Overlay
  </button>
  <overlay target={this.$refs.input} show={showOverlay}  >
    <div class="alert alert-success" style='margin-bottom:0' role="alert">
    Anything in Overlay
    <a class='btn-sm btn-primary' on-click={showOverlay = false} href='#'>hide</a>
    </div>
  </overlay>
  </div>

  `
})
