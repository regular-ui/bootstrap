const component = new Regular({
  template: ` 
  <div class='overlay-container'>
  <button ref='ipt' on-click={showOverlay = !showOverlay } class='btn btn-default'>
    {showOverlay? 'Hide' : 'Show' } All Overlay
  </button>
  <overlay target={this.$refs.ipt} 
    show={showOverlay}
    placement=left>
    <div class="alert alert-success"  role="alert">
    Left
    </div>
  </overlay>
  <overlay target={this.$refs.ipt} gap=20 
    show={showOverlay}  
    placement=right>
    <div class="alert alert-danger"  role="alert">
    Right with gap 20
    </div>
  </overlay>
  <overlay target={this.$refs.ipt} gap=50 show={showOverlay} placement=top >
    <div class="alert alert-info"  role="alert">
    Top with gap 50
    </div>
  </overlay>
  <overlay target={this.$refs.ipt} gap=5 show={showOverlay}  placement=bottom >
    <strong class='text-danger'>Bottom with gap 5</strong>
  </overlay>
  </div>
  `
})
