
import ExampleEditor from './component/ExampleEditor.js';
import Reboot from '../../src/index.js';


window.ExampleEditor = ExampleEditor;





var editors = [].slice.call(document.querySelectorAll('.j-editor'));

editors.forEach(function(editor){
  new ExampleEditor({
    data: {
      source: editor.value
    }
  }).$inject(editor, 'after');
  Reboot.dom.remove(editor);
})

window.Reboot = Reboot;