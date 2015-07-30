const component = new Regular({
  template: ` 
<button class='btn btn-primary' on-click={ show = true}>Open Mask with Loding Animation</button>
<mask show={show} auto-close >
  <div r-style={svgPosition}>
  <svg viewBox="0 0 32 32" width="128" height="128" fill="white">
    <path transform="translate(0 0)" d="M0 12 V20 H4 V12z">
      <animateTransform attributeName="transform" type="translate" values="0 0; 28 0; 0 0; 0 0" dur="1.5s" begin="0" repeatCount="indefinite" keytimes="0;0.3;0.6;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
    </path>
    <path opacity="0.5" transform="translate(0 0)" d="M0 12 V20 H4 V12z">
      <animateTransform attributeName="transform" type="translate" values="0 0; 28 0; 0 0; 0 0" dur="1.5s" begin="0.1s" repeatCount="indefinite" keytimes="0;0.3;0.6;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
    </path>
    <path opacity="0.25" transform="translate(0 0)" d="M0 12 V20 H4 V12z">
      <animateTransform attributeName="transform" type="translate" values="0 0; 28 0; 0 0; 0 0" dur="1.5s" begin="0.2s" repeatCount="indefinite" keytimes="0;0.3;0.6;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
    </path>
  </svg>
  </div>
</mask>
  `,
  data: {
    svgPosition: {
      position: 'absolute', 
      width: '128px', height: '128px', 
      left: '50%', top: '50%', 
      marginLeft: '-64px', 
      marginTop: '-64px'
    }
  }
})
