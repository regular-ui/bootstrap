
import Regular from 'regularjs';
import CodeMirror from 'codemirror';

import Mode from 'codemirror/mode/javascript/javascript.js';

let _ = Regular.util;

const tpl = `
  <div class='playground {open && "playground-open"}'>
  <div class="bs-example bs-example-modal" ref=container >
    <pre class='alert alert-danger' r-hide={!error}>{error}</pre>
    {#inc component}
  </div>

  <div class="highlight">
    <textarea value={source} ref='area' style='display:none'></textarea>
  </div>
  <a class="toggle " title='Edit Source' on-click={this.toggle()}>
  <span class="glyphicon glyphicon-chevron-{open? 'up': 'down'}"></span>
    Source Code
  </a>
  </div>
`

export default Regular.extend({
  name: 'hello',
  template: tpl,
  config(data){
    _.extend( data, {
      mode: 'javascript',
      source: '// no code here'
    })
    this.$watch('!!open', function(open){
      if(open){
        this.editor = CodeMirror.fromTextArea(this.$refs.area, {
          mode: data.mode,
          lineNumbers: false,
          lineWrapping: false,
          matchBrackets: true,
          tabSize: 2,
          theme: 'solarized light',
          readOnly: data.readOnly
        });
        this.editor.on('change', _.throttle(function(){
          var content = this.editor.getValue();
          this.changeContent(content);
        }.bind(this), 300));
        setTimeout(function(){
          this.editor.refresh()
        }.bind(this))
      }else if(this.editor){
        this.editor.toTextArea();
        this.$refs.area.display='none';
        this.editor = null
      }
    })
  },
  init(){

    this.changeContent(this.$refs.area.value);
  },
  changeContent (content){
    if(this.eid) this.eid = clearTimeout(this.eid);
    content = content || this.editor.getValue();
    try{
      var code = babel.transform(content).code;
      var component = new Function( 'Regular' , code + ';return component;')(Regular)
      this.data.component = function(){return component}
      this.data.error = false;
      this.$update();
    }catch(e){
      // dealy Error Message
      this.eid = setTimeout(function(){
        this.data.error = e.message||e;
        this.data.component = '';
        this.$update()
      }.bind(this),800)
    }
  },
  toggle(){
    this.data.open = !this.data.open;
    return false;
  }

})


