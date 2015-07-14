var rdom =  require('regularjs').dom;
var _ =  require('regularjs').util;



var dom = _.extend({}, rdom);


// relative to body 
dom.offset = function(elem ){

  var win = window,
    doc = (elem.ownDocument || document), 
    docElem = doc.documentElement,
    body = doc.body,
    box = elem.getBoundingClientRect(),
    clientTop = docElem.clientTop || body.clientTop || 0,
    clientLeft = docElem.clientLeft || body.clientLeft || 0,
    scrollTop = win.pageYOffset || docElem.scrollTop,
    scrollLeft = win.pageXOffset || docElem.scrollLeft,
    isFixed = dom.getComputedStyle(elem, 'position') === 'fixed';

  return {
      top: parseInt(box.top, 10) +  (isFixed? 0: scrollTop ) -  clientTop,
      left: parseInt(box.left, 10) + (isFixed? 0: scrollLeft ) - clientLeft
  };
}
// relative to body
dom.scroll = function(elem){
  var parent, coord = {left: 0, top: 0};
  while(elem && !dom.isBody(elem)){
    coord.left += elem.scrollLeft
    coord.top += elem.scrollTop
    elem = elem.parentNode;
  }
  return coord;
}

dom.size = function(elem){
  if( dom.isBody(elem)){

    var html =  getCompatDoc(elem);
    return {
      width: html.clientWidth,
      height: html.clientHeight
    }
  }
  return {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  }
}

dom.position = function(elem, relative){
  
  var scrollElem = dom.scroll(elem);
  var offsetElem = dom.offset(elem);
  var position = {
    left: offsetElem.left - scrollElem.left,
    top: offsetElem.top - scrollElem.top

  }
  if(relative && !(dom.isBody(relative))){
    var relativePostion = dom.position(relative);
    position.left -= relativePostion.left;
    position.top -= relativePostion.top;
  }
  return position;
}

dom.getComputedStyle = function(elem, prop){
  if (typeof window.getComputedStyle !== 'undefined') {
      return getComputedStyle(elem, null).getPropertyValue(prop);
  } else {
      return elem.currentStyle[prop];
  }
}



dom.isBody = function(elem){
  return (/^(?:body|html)$/i).test(elem.tagName);
}

dom.getCompatDoc = function(elem){
  var doc = elem ? elem.ownDocument: document;
  return doc.compatMode === 'CSS1Compat'? doc.documentElement: doc.body;
}


module.exports = dom;
