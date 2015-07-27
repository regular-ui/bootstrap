var Regular = require('regularjs');
var dom = require('./dom');

/**
 * Custom event
 * ----------------
 * 1. on-clickouter: when click outer expect element self.
 */

var events = {
  // 
 'clickouter': (function(){
    // handles for hold global register
    var callbacks = [];
    function onClickOuter(event){
      if(callbacks.length){
        callbacks.forEach(function(cb){
          if(typeof cb === 'function') cb(event)
        })
      }
    }
    function getExceptMe(elem){
      return function(target){
        while(target && !dom.isBody(target)){
          if(target === elem) return false
          target = target.parentNode;
        }
        return true;
      }
    }
    return function clickouter(elem, fire){
      var body = document.body;
      var except = getExceptMe(elem);
      var preLen = callbacks.length;
      var self = this;
      function onClickOuterSelf(event){
        if(dom.contains(elem, body) && except(event.target)) fire(event);
      }

      callbacks.push(onClickOuterSelf);

      if(!preLen){
        dom.on(body, 'click', onClickOuter)
      }

      return function destroy(){
        var index = callbacks.indexOf(onClickOuterSelf);
        if(~index) callbacks.splice(index, 1)
        if(!callbacks.length) {
          dom.off(body, 'click', onClickOuter);
        }
      }
    }
  })() 
}

module.exports = events;