/**
@author	undefined
@version	1.0.0
@homepage	https://github.com/regular-ui/regular-bootstrap
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Regular"));
	else if(typeof define === 'function' && define.amd)
		define(["Regular"], factory);
	else if(typeof exports === 'object')
		exports["Reboot"] = factory(require("Regular"));
	else
		root["Reboot"] = factory(root["Regular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports  = {
	  Overlay: __webpack_require__(1),
	  Tooltip: __webpack_require__(6),
	  Pophover: __webpack_require__(8)
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(2);
	var R = __webpack_require__(3);
	var dom = __webpack_require__(4);
	var _ = __webpack_require__(5);


	/**
	 * Overlay Component for Regular
	 * @param  data 
	 *         - placement: top, left, bottom, right, auto
	 *         - container: contaienr to injected, default is body
	 *         - target: next to 
	 *         - $body: if dont used as composite component
	 * @return {[type]}     [description]
	 */
	var Overlay = module.exports = R.extend({
	  name: 'overlay',
	  template: tpl,
	  config: function(data){
	    _.extend(data, {
	      container: document.body,
	      placement: 'auto',
	      gap: 10
	    })
	    // if the most outside component has been inject to document
	    this.$root.$on('$inject', function(){
	      this.$watch('show', function(show){
	        if(show){
	          this.$inject(data.container, 'bottom')
	          this.placement();
	        }else{
	          this.$inject(false)
	        }
	      })
	    }.bind(this))
	  },
	  // make sure component is not autemately injected 
	  // during compiling stage
	  node: function(){return undefined},
	  init: function(){
	    var overlay = this.$refs.overlay;
	    overlay.style.position = 'absolute';
	    overlay.style.top = '-9999px';
	    overlay.style.left = '-9999px';

	  },
	  toggle: function(force){
	    this.$update('show', force == null? !this.data.show : force)
	  },
	  // the position logic here
	  placement: function(){
	    var overlay = this.$refs.overlay;
	    var data = this.data;

	    if(!data.target) throw new Error('need target for placement')

	    var position = dom.position(data.target, data.container);
	    var size = dom.size(data.target);
	    var mySize = dom.size(overlay);
	    var gap = data.gap;
	    var top, left;


	    switch(data.placement){
	      case 'top':
	        top = position.top -  mySize.height - gap - 10;
	        left = position.left -  (mySize.width - size.width) / 2;
	        break;
	      case 'left':
	        top = position.top -  (mySize.height - size.height) / 2;
	        left = position.left -  mySize.width - gap;
	        break;
	      case 'right':
	        top = position.top -  (mySize.height - size.height) / 2;
	        left = position.left + size.width + gap;
	        break;
	      case 'bottom':
	        top = position.top + size.height + gap;
	        left = position.left -  (mySize.width - size.width) / 2;
	        break;
	    }


	    overlay.style.top = top + 'px';
	    overlay.style.left = left + 'px';
	  }
	})



/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports =[{"type":"element","tag":"div","attrs":[{"type":"attribute","name":"ref","value":"overlay"},{"type":"attribute","name":"title","value":"overlay"}],"children":[{"type":"text","text":"\n  "},{"type":"element","tag":"r-content","attrs":[]},{"type":"text","text":" \n"}]}]

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var rdom =  __webpack_require__(3).dom;
	var _ =  __webpack_require__(3).util;



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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var util =  __webpack_require__(3).util;

	module.exports =  util.extend({ }, util)


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(7);
	var Overlay = __webpack_require__(1);
	var R = __webpack_require__(3);
	var dom = __webpack_require__(4);
	var _ = __webpack_require__(5);


	/**
	 * Tooltip Component for Regular
	 * @param  data 
	 *         - placement: top, left, bottom, right, auto
	 *         - container: contaienr to injected, default is body
	 *         - target: next to 
	 *         - $body: if dont used as composite component
	 * @return {[type]}     [description]
	 */
	var Tooltip = module.exports = R.extend({
	  name: 'tooltip',
	  template: tpl,
	  config: function(data){
	    // if tooltip is used in <overlay> <tooltip></tooltip> </overlay>
	    var $outer= this.$outer;
	    if($outer instanceof Overlay){
	      data.placement = $outer.data.placement || 'top';
	    }
	  }
	})





/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports =[{"type":"element","tag":"div","attrs":[{"type":"attribute","name":"role","value":"tooltip"},{"type":"attribute","name":"class","value":{"type":"expression","body":"['tooltip ',c._sg_('placement', d, e),' fade in'].join('')","constant":false,"setbody":false}},{"type":"attribute","name":"style","value":"position:relative"}],"children":[{"type":"text","text":"\n  "},{"type":"element","tag":"div","attrs":[{"type":"attribute","name":"class","value":"tooltip-arrow"}],"children":[]},{"type":"text","text":"\n  "},{"type":"element","tag":"div","attrs":[{"type":"attribute","name":"class","value":"tooltip-inner"}],"children":[{"type":"element","tag":"r-content","attrs":[]}]},{"type":"text","text":"\n"}]}]

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Tooltip = __webpack_require__(6);
	var tpl = __webpack_require__(9);


	// simplily replacing tooltip's  template, then we got Pophover
	module.exports = Tooltip.extend({
	  name: 'pophover',
	  template: tpl
	})

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports =[{"type":"element","tag":"div","attrs":[{"type":"attribute","name":"role","value":"tooltip"},{"type":"attribute","name":"class","value":{"type":"expression","body":"['popover ',c._sg_('placement', d, e),' fade in show'].join('')","constant":false,"setbody":false}},{"type":"attribute","name":"style","value":"position:relative"}],"children":[{"type":"text","text":"\n  "},{"type":"element","tag":"div","attrs":[{"type":"attribute","name":"class","value":"arrow"}],"children":[]},{"type":"text","text":"\n  "},{"type":"if","test":{"type":"expression","body":"c._sg_('title', d, e)","constant":false,"setbody":"c._ss_('title',p_,d, '=', 1)"},"consequent":[{"type":"element","tag":"h3","attrs":[{"type":"attribute","name":"class","value":"popover-title"},{"type":"attribute","name":"r-hide","value":{"type":"expression","body":"(!c._sg_('title', d, e))","constant":false,"setbody":false}}],"children":[{"type":"expression","body":"c._sg_('title', d, e)","constant":false,"setbody":"c._ss_('title',p_,d, '=', 1)"}]}],"alternate":[]},{"type":"text","text":"\n  "},{"type":"element","tag":"div","attrs":[{"type":"attribute","name":"class","value":"popover-content"}],"children":[{"type":"element","tag":"r-content","attrs":[]}]},{"type":"text","text":"\n"}]}]

/***/ }
/******/ ])
});
;