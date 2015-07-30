const component = new Regular({
  template: ` 
<button class='btn btn-primary' on-click={ show = true}>Open Mask</button>
<mask show={show}  on-click={show = false}></mask>
`
})
