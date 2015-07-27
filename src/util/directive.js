var Regular = require('regularjs');
var dom = Regular.dom;

Regular.event('clickouter', (function(){
  // handles for hold global register
  var callbacks = [];
  var onClickOuter = function(event){
    if(callbacks.length){
      callbacks.forEach(function(cb){
        if(typeof cb === 'function') cb(event)
      })
    }
  }
  var getExceptMe = function(elem){
    return function(target){
      while(target && !dom.isBody(target)){
        if(target === elem) return true
        target = target.parentNode;
      }
      return false;
    }
  }
  return function clickouter(elem, fire){
    var except = getExceptMe(elem);
    var preLen = callbacks.length;
    function onClickOuterSelf(event){
      if(except(event.target)) fire(event);
    }

    callbacks.push(onClickOuter);

    if(!preLen){
      dom.on(document, 'click', onClickOuter)
    }

    return function destroy(){
      var index = callbacks.indexOf(onClickOuterSelf);
      if(~index) callbacks.splice(index, 1)
      if(!callbacks.length) {
        dom.off(document, 'click', onClickOuter);
      }
    }
  }
})());



