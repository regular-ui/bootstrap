/**
@author	undefined
@version	1.0.0
@homepage	https://github.com/regular-ui/bootstrap
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _DropDownButton = __webpack_require__(7);

	var _DropDownButton2 = _interopRequireDefault(_DropDownButton);

	var _Pagination = __webpack_require__(10);

	var _Pagination2 = _interopRequireDefault(_Pagination);

	var _SelectAble = __webpack_require__(8);

	var _SelectAble2 = _interopRequireDefault(_SelectAble);

	var _SelectItem = __webpack_require__(11);

	var _SelectItem2 = _interopRequireDefault(_SelectItem);

	var _Pophover = __webpack_require__(12);

	var _Pophover2 = _interopRequireDefault(_Pophover);

	var _Overlay = __webpack_require__(3);

	var _Overlay2 = _interopRequireDefault(_Overlay);

	var _Tooltip = __webpack_require__(1);

	var _Tooltip2 = _interopRequireDefault(_Tooltip);

	var _Modal = __webpack_require__(13);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Mask = __webpack_require__(14);

	var _Mask2 = _interopRequireDefault(_Mask);

	var _Tab = __webpack_require__(15);

	var _Tab2 = _interopRequireDefault(_Tab);

	var _utilUtil = __webpack_require__(6);

	var _utilUtil2 = _interopRequireDefault(_utilUtil);

	var _utilDom = __webpack_require__(5);

	var _utilDom2 = _interopRequireDefault(_utilDom);

	exports['default'] = {
	  // Components
	  DropDownButton: _DropDownButton2['default'],
	  Pagination: _Pagination2['default'],
	  SelectAble: _SelectAble2['default'],
	  SelectItem: _SelectItem2['default'],
	  Pophover: _Pophover2['default'],
	  Overlay: _Overlay2['default'],
	  Tooltip: _Tooltip2['default'],
	  Modal: _Modal2['default'],
	  Mask: _Mask2['default'],
	  Tab: _Tab2['default'],

	  // utility
	  util: _utilUtil2['default'],
	  dom: _utilDom2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _regularjs = __webpack_require__(2);

	var _regularjs2 = _interopRequireDefault(_regularjs);

	var _Overlay = __webpack_require__(3);

	var _Overlay2 = _interopRequireDefault(_Overlay);

	var _utilUtil = __webpack_require__(6);

	var _utilUtil2 = _interopRequireDefault(_utilUtil);

	var tpl = '\n<div role=\'tooltip\' class=\'tooltip {placement}\' style=\'position:relative\'>\n  <div class=\'tooltip-arrow\'></div>\n  <div class=\'tooltip-inner\'>{#inc this.$body}</div>\n</div>\n';

	// tooltip can be composited with Overlay for alignment
	// <overlay> <tooltip>your content</tooltip> </overlay>
	exports['default'] = _regularjs2['default'].extend({
	  name: 'tooltip',
	  template: tpl,
	  config: function config(data) {
	    var $outer = this.$outer;
	    if ($outer instanceof _Overlay2['default']) {
	      data.placement = $outer.data.placement;
	    }
	    data.placement = data.placement || 'top';
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _regularjs = __webpack_require__(2);

	var _regularjs2 = _interopRequireDefault(_regularjs);

	var _utilEvents = __webpack_require__(4);

	var _utilEvents2 = _interopRequireDefault(_utilEvents);

	var _utilDom = __webpack_require__(5);

	var _utilDom2 = _interopRequireDefault(_utilDom);

	var _utilUtil = __webpack_require__(6);

	var _utilUtil2 = _interopRequireDefault(_utilUtil);

	var tpl = '\n<div ref=overlay class=\'overlay fade {className}\' r-anim=\'on:enter; class: in,3; on:leave; class: in,4\' >\n  {#inc this.$body}\n</div>\n';

	var Overlay = _regularjs2['default'].extend({
	  name: 'overlay',
	  template: tpl,

	  config: function config(data) {

	    _utilUtil2['default'].extend(data, {
	      container: document.body,
	      placement: 'top',
	      gap: 10
	    });
	    data.gap = parseInt(data.gap, 10);

	    if (data.placement === 'auto') {
	      data.placement = '';
	      data.auto = true;
	    }
	    // if the most outside component has been inject to document
	    var destroy = undefined;
	    this.$watch('show', function (show) {
	      if (show) {
	        this.$inject(data.container, 'bottom');
	        if (data.autoClose) {
	          setTimeout((function () {
	            destroy = _utilEvents2['default'].clickouter.call(this, this.$refs.overlay, this.toggle.bind(this, false));
	          }).bind(this), 0);
	        }
	        this.placement();
	      } else {
	        this.$inject(false);
	        if (destroy) {
	          destroy();
	          destroy = false;
	        }
	      }
	    });
	  },
	  // make sure component is not autemately injected
	  // during compiling stage
	  node: function node() {},
	  init: function init() {
	    var data = this.data;
	    var overlay = this.$refs.overlay;

	    overlay.style.position = 'absolute';
	    overlay.style.top = '-9999px';
	    overlay.style.left = '-9999px';
	  },
	  toggle: function toggle(force) {

	    this.$update('show', force == null ? !this.data.show : force);
	  },
	  // the position logic here
	  placement: function placement() {
	    var overlay = this.$refs.overlay;
	    var data = this.data;
	    var placement = data.placement,
	        position = undefined;

	    if (!data.target) throw new Error('need target for placement');

	    var isFixed = _utilDom2['default'].getComputedStyle(data.target, 'position') === 'fixed';

	    if (!isFixed) {

	      position = _utilDom2['default'].position(data.target, data.container);
	    } else {

	      position = {
	        top: data.target.offsetTop,
	        left: data.target.offsetLeft
	      };
	    }
	    var size = _utilDom2['default'].size(data.target);
	    var mySize = _utilDom2['default'].size(overlay);
	    var gap = data.gap;
	    var top = undefined,
	        left = undefined;

	    this.$emit('placement', placement);

	    switch (placement) {
	      case 'top':
	        top = position.top - mySize.height - gap;
	        left = position.left - (mySize.width - size.width) / 2;
	        break;
	      case 'left':
	        top = position.top - (mySize.height - size.height) / 2;
	        left = position.left - mySize.width - gap;
	        break;
	      case 'right':
	        top = position.top - (mySize.height - size.height) / 2;
	        left = position.left + size.width + gap;
	        break;
	      case 'bottom':
	        top = position.top + size.height + gap;
	        left = position.left - (mySize.width - size.width) / 2;
	        break;
	    }
	    overlay.style.position = isFixed ? 'fixed' : 'absolute';
	    overlay.style.top = top + 'px';
	    overlay.style.left = left + 'px';
	  }
	});

	exports['default'] = Overlay;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Regular = __webpack_require__(2);
	var dom = __webpack_require__(5);

	/**
	 * Custom event
	 * ----------------
	 * 1. on-clickouter: when click outer expect element self.
	 */

	var events = {
	  //
	  'clickouter': (function () {
	    // handles for hold global register
	    var callbacks = [];
	    function onClickOuter(event) {
	      if (callbacks.length) {
	        callbacks.forEach(function (cb) {
	          if (typeof cb === 'function') cb(event);
	        });
	      }
	    }
	    function getExceptMe(elem) {
	      return function (target) {
	        while (target && !dom.isBody(target)) {
	          if (target === elem) return false;
	          target = target.parentNode;
	        }
	        return true;
	      };
	    }
	    return function clickouter(elem, fire) {
	      var body = document.body;
	      var except = getExceptMe(elem);
	      var preLen = callbacks.length;
	      var self = this;
	      function onClickOuterSelf(event) {
	        if (dom.contains(elem, body) && except(event.target)) fire(event);
	      }

	      callbacks.push(onClickOuterSelf);

	      if (!preLen) {
	        dom.on(body, 'click', onClickOuter);
	      }

	      return function destroy() {
	        var index = callbacks.indexOf(onClickOuterSelf);
	        if (~index) callbacks.splice(index, 1);
	        if (!callbacks.length) {
	          dom.off(body, 'click', onClickOuter);
	        }
	      };
	    };
	  })()
	};

	module.exports = events;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var rdom = __webpack_require__(2).dom;
	var _ = __webpack_require__(2).util;

	var dom = _.extend({}, rdom);

	// relative to window.
	dom.offsets = function (elem) {

	  var win = window,
	      doc = elem.ownDocument || document,
	      docElem = doc.documentElement,
	      body = doc.body,
	      box = elem.getBoundingClientRect(),
	      clientTop = docElem.clientTop || body.clientTop || 0,
	      clientLeft = docElem.clientLeft || body.clientLeft || 0,
	      scrollTop = win.pageYOffset || docElem.scrollTop,
	      scrollLeft = win.pageXOffset || docElem.scrollLeft,
	      isFixed = dom.getComputedStyle(elem, 'position') === 'fixed';

	  return {
	    top: parseInt(box.top, 10) + scrollTop - clientTop,
	    left: parseInt(box.left, 10) + scrollLeft - clientLeft
	  };
	};
	// relative to body
	dom.scrolls = function (elem) {
	  elem = elem.parentNode;
	  var coord = { left: 0, top: 0 };
	  while (elem && !dom.isBody(elem)) {
	    coord.left += elem.scrollLeft;
	    coord.top += elem.scrollTop;
	    elem = elem.parentNode;
	  }
	  return coord;
	};

	dom.isOffsetParent = function (elem) {
	  var position = dom.getComputedStyle(elem, 'position');
	};
	dom.size = function (elem) {
	  if (dom.isBody(elem)) {

	    var html = getCompatDoc(elem);
	    return {
	      width: html.clientWidth,
	      height: html.clientHeight
	    };
	  }
	  return {
	    width: elem.offsetWidth,
	    height: elem.offsetHeight
	  };
	};

	dom.position = function (elem, relative) {

	  var scroll = dom.scrolls(elem);
	  var offset = dom.offsets(elem);
	  var position = {
	    left: offset.left + scroll.left,
	    top: offset.top + scroll.top
	  };

	  if (relative) {
	    var relativePostion = dom.position(relative);
	    position.left -= relativePostion.left + parseInt(dom.getComputedStyle(relative, 'border-left-width'), 10);
	    position.top -= relativePostion.top + parseInt(dom.getComputedStyle(relative, 'border-top-width'), 10);
	  }

	  if (dom.isBody(elem) && dom.isOffset(elem)) {
	    position.left -= parseInt(dom.getComputedStyle(elem, 'border-left-width'), 10);
	    position.top -= parseInt(dom.getComputedStyle(elem, 'border-top-width'), 10);
	  }

	  return position;
	};

	dom.isOffset = function (elem) {
	  return dom.getComputedStyle(elem, 'position') === 'static';
	};

	dom.getComputedStyle = function (elem, prop) {
	  if (typeof window.getComputedStyle !== 'undefined') {
	    return getComputedStyle(elem, null).getPropertyValue(prop);
	  } else {
	    return elem.currentStyle[prop];
	  }
	};

	dom.isBody = function (elem) {
	  return /^(?:body|html)$/i.test(elem.tagName);
	};

	dom.getCompatDoc = function (elem) {
	  var doc = elem ? elem.ownDocument : document;
	  return doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
	};

	dom.contains = function (elem, container) {
	  if (!container) container = document.body;

	  if (container.contains) {
	    return container.contains(elem);
	  }

	  if (container.compareDocumentPosition) {
	    return container === elem || !!(container.compareDocumentPosition(elem) & 16);
	  }

	  while (elem = elem.parentNode) {
	    if (elem === container) return true;
	  }

	  return false;
	};

	module.exports = dom;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(2).util;

	module.exports = util.extend({}, util);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _SelectAble = __webpack_require__(8);

	var _SelectAble2 = _interopRequireDefault(_SelectAble);

	__webpack_require__(9);

	var tpl = '\n  <mask show={ show } layer=dropdown on-click={ show = false }></mask>\n  <div class="btn-group {className}" r-class={ {\'dropup\': dropup, \'open\': show} } role="group">\n    <button type="button" \n      class="btn btn-{style || \'default\'} dropdown-toggle" \n      aria-haspopup="true" aria-expanded={!!show}\n      on-click={ show=!show } >\n      {#inc selected? selected.$body : title }\n      {#if @(!split)}\n      <span class="caret"></span>\n      {/if}\n    </button>\n    {#if @(split)}\n    <button \n      on-click={show =!show}\n      type="button" \n      class="btn btn-{style || \'default\'} dropdown-toggle" \n      aria-haspopup="true" aria-expanded={!!show}>\n      <span class="caret"></span>\n      <span class="sr-only">Toggle Dropdown</span>\n    </button>\n    {/if}\n    <ul class="dropdown-menu">\n      {#inc this.$body}\n    </ul>\n  </div>\n';

	exports['default'] = _SelectAble2['default'].extend({
	  name: "dropdown-button",
	  template: tpl
	});
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _regularjs = __webpack_require__(2);

	var _regularjs2 = _interopRequireDefault(_regularjs);

	var _utilUtil = __webpack_require__(6);

	var _utilUtil2 = _interopRequireDefault(_utilUtil);

	var SelectAble = _regularjs2['default'].extend({

	  config: function config(data) {
	    _utilUtil2['default'].extend(data, {
	      items: []
	    });
	  },

	  pick: function pick(item) {
	    var data = this.data;
	    if (item.data.disabled) return;

	    data.selected = item;
	    data.show = false;

	    this.$update();
	    this.$emit('pick', item);
	  }
	});

	exports['default'] = SelectAble;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Regular = __webpack_require__(2);
	var dom = Regular.dom;

	Regular.event('clickouter', (function () {
	  // handles for hold global register
	  var callbacks = [];
	  var onClickOuter = function onClickOuter(event) {
	    if (callbacks.length) {
	      callbacks.forEach(function (cb) {
	        if (typeof cb === 'function') cb(event);
	      });
	    }
	  };
	  var getExceptMe = function getExceptMe(elem) {
	    return function (target) {
	      while (target && !dom.isBody(target)) {
	        if (target === elem) return true;
	        target = target.parentNode;
	      }
	      return false;
	    };
	  };
	  return function clickouter(elem, fire) {
	    var except = getExceptMe(elem);
	    var preLen = callbacks.length;
	    function onClickOuterSelf(event) {
	      if (except(event.target)) fire(event);
	    }

	    callbacks.push(onClickOuter);

	    if (!preLen) {
	      dom.on(document, 'click', onClickOuter);
	    }

	    return function destroy() {
	      var index = callbacks.indexOf(onClickOuterSelf);
	      if (~index) callbacks.splice(index, 1);
	      if (!callbacks.length) {
	        dom.off(document, 'click', onClickOuter);
	      }
	    };
	  };
	})());

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _regularjs = __webpack_require__(2);

	var _regularjs2 = _interopRequireDefault(_regularjs);

	var tpl = '\n<ul class="pagination" r-hide={!total||total===0}>\n  <li on-click={ this.nav(current-1)} class=\'pageprv {current==1? "disabled": ""}\'>\n    <a  href=\'#\' >{ @(ptext || \'PREV\' )}</a>\n  </li>\n  {#if total - 5 > show * 2}\n  <li  on-click={ this.nav(1)} class={current==1? \'active\': \'\'}><a href="#">1</a></li>\n  {#if begin > 2}<li><a>...</a></li>{/if}\n  {#list begin..end as i}\n    <li on-click={ this.nav(i)} class={current==i? \'active\': \'\'}><a href="#">{i}</a></li>\n  {/list}\n  {#if (end < total-1)}\n    <li><a>...</a></li>\n  {/if}\n  <li r-hide={end <= total-1}><a>...</a></li>\n  <li on-click={ this.nav(total) } class={ current==total? \'active\': \'\'}> <a href="#">{total}</a></li>\n  {#else}\n    {#list 1..total as i}\n    <li on-click={ this.nav(i)} class={current==i? \'active\': \'\'}><a href="#">{i}</a></li>\n    {/list}\n  {/if}\n  <li on-click={ this.nav(current + 1)} class=\'pagenxt {current==total? "disabled": ""}\'><a  href=\'#\' >{ @(ntext || \'NEXT\') }</a></li>\n</ul>\n';

	exports['default'] = _regularjs2['default'].extend({

	  name: "pagination",

	  template: tpl,

	  config: function config(data) {

	    var count = 5;
	    var show = data.show = Math.floor(count / 2);
	    data.current = parseInt(data.current || 1, 10);
	    data.total = parseInt(data.total || 1, 10);

	    this.$watch(['current', 'total'], function (current, total) {
	      if (current > total) return this.nav(total);

	      data.begin = current - show;
	      data.end = current + show;

	      if (data.begin < 2) data.begin = 2;
	      if (data.end > data.total - 1) data.end = data.total - 1;
	      if (current - data.begin <= 1) data.end = data.end + show + data.begin - current;
	      if (data.end - current <= 1) data.begin = data.begin - show - current + data.end;
	    });
	  },

	  nav: function nav(page) {
	    var data = this.data;
	    if (page < 1 || page > data.total || page === data.current) return false;
	    var evObj = { page: page };
	    this.$emit('nav', evObj);

	    if (!evObj.stop) {
	      data.current = page;
	    }

	    return false;
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _regularjs = __webpack_require__(2);

	var _regularjs2 = _interopRequireDefault(_regularjs);

	var _utilUtil = __webpack_require__(6);

	var _utilUtil2 = _interopRequireDefault(_utilUtil);

	var tpl = '\n<li r-class=\'"dropdown-header": header, "divider": divider, "disabled": disabled\'>\n  {#if !divider}\n    {#if !header }\n      <a href="javascript:;" on-click={ this.$outer.pick(this)} >{#inc this.$body}</a>\n    {#else}\n      {#inc this.$body}\n    {/if}\n  {/if}\n</li>\n';

	var SelectItem = _regularjs2['default'].extend({

	  name: 'select-item',
	  template: tpl,

	  config: function config(data) {
	    this.$outer.data.items.push(this);
	    if (data.selected) this.$outer.data.selected = this;
	  }

	});

	exports['default'] = SelectItem;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Tooltip = __webpack_require__(1);

	var _Tooltip2 = _interopRequireDefault(_Tooltip);

	var tpl = '\n<div role=\'tooltip\' class=\'popover {placement} show\' style=\'position:relative\'>\n  <div class=\'arrow\'></div>\n  {#if title}<h3 class=\'popover-title\'>{title}</h3>{/if}\n  <div class=\'popover-content\' >{#inc this.$body}</div>\n</div>\n';

	// simplily replacing tooltip's  template, then we got Pophover
	exports['default'] = _Tooltip2['default'].extend({
	  name: 'pophover',
	  template: tpl
	});
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _regularjs = __webpack_require__(2);

	var _regularjs2 = _interopRequireDefault(_regularjs);

	var _utilUtil = __webpack_require__(6);

	var _utilUtil2 = _interopRequireDefault(_utilUtil);

	var _Mask = __webpack_require__(14);

	var _Mask2 = _interopRequireDefault(_Mask);

	var tpl = '\n<mask show={show} on-click={show=false}></mask>\n<div class="modal fade show in" r-anim=\'on:enter;class: in, 3; on: leave; class: in, 4\' tabindex="-1" role="dialog">\n  <div class="modal-dialog">\n    <div class="modal-content" role="document">\n      <div class="modal-header">\n        {#if closeButton}\n        <button class="close" aria-label="Close" on-click={show = false}>\n          <span aria-hidden="true">×</span>\n        </button>\n        {/if}\n        <h4 class="modal-title">{#inc head || \'Modal\'}</h4>\n      </div>\n      <div class="modal-body">\n        {#inc  body || this.$body }\n      </div>\n      <div class="modal-footer">\n        {#if foot} \n          {#inc foot } \n        {#else}\n          <button type="button" class="btn btn-default" on-click={ this.confirm(true) }>Confirm</button>\n          <button type="button" class="btn btn-default" on-click={ this.confirm(false) }>Cancel</button>\n        {/if}\n      </div>\n    </div>\n  </div>\n</div>\n';

	/**
	 * [description]
	 * @param  {Boolean} show     whether inject modal to target
	 * @param  {Node}    target   [Optinal] where to place modal, default is document.body
	 *
	 * @event   confirm  
	 *          @param {Boolean} accept 
	 *
	 * @return  {Modal}
	 */
	var Modal = _regularjs2['default'].extend({
	  name: "modal",
	  template: tpl,

	  node: function node() {},

	  config: function config(data) {},

	  init: function init() {
	    var data = this.data;
	    this.$watch('!!show', function (show, oshow) {
	      var body = data.container || document.body;
	      this.$inject(show ? body : false);
	    }, { init: true });
	  },
	  confirm: function confirm(accept) {
	    // this.$update can be used like `scope.apply` in angularjs
	    this.$update(function (data) {
	      this.$emit('confirm', accept);
	      if (data.autoClose) {
	        data.show = false;
	      }
	    });
	  }
	});

	['Head', 'Body', 'Foot'].forEach(function (name) {
	  var lname = name.toLowerCase();
	  Modal[name] = _regularjs2['default'].extend({
	    name: 'modal.' + lname,

	    init: function init() {
	      // this.$outer point to modal
	      this.$outer.data[lname] = this.$body;
	    }
	  });
	});

	var statics = {
	  alert: {
	    body: '<p>{#inc content}</p>',
	    foot: '<button type="button" class="btn btn-primary" on-click={ this.confirm(true) }>Confirm</button>'
	  },
	  prompt: {
	    body: '<div class="form-group">\n            <label class="control-label">{#inc content}:</label> \n            <input type="text" class="form-control" >\n           </div>'
	  },
	  confirm: {
	    body: '<p>{#inc content}</p>'
	  }
	};

	['alert', 'confirm', 'prompt'].forEach(function (name) {
	  var modal = new Modal({
	    $body: statics[name].body,
	    data: {
	      foot: statics[name].foot,
	      closeButton: true
	    }
	  });
	  Modal[name] = function (conf) {

	    if (typeof conf === 'string') conf = { content: conf };
	    if (!conf.title) conf.title = "message from " + location.origin;
	    conf.show = true;

	    modal.$update(conf);
	    return modal;
	  };
	});

	exports['default'] = Modal;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _regularjs = __webpack_require__(2);

	// template

	var _regularjs2 = _interopRequireDefault(_regularjs);

	var tpl = '\n  <div class="{layer}-backdrop {klass} fade in" \n    r-animation=\'on:enter;class: in,3; on:leave; class: in, 4\' \n    r-style="\'background-color\': bgColor"\n    on-click=\'click\' >\n    {#inc this.$body}\n  </div>\n';
	// ---
	//

	var Mask = _regularjs2['default'].extend({

	  name: "mask",
	  template: tpl,

	  node: function node() {},

	  config: function config(data) {
	    data.layer = data.layer || 'modal';
	  },
	  // after compile
	  init: function init() {
	    var data = this.data;
	    this.$watch('!!show', function (show, oshow) {
	      var body = data.container || document.body;
	      this.$inject(show ? body : false);
	    }, { init: true });

	    this.$on('click', function () {
	      if (data.autoClose) {
	        this.$update('show', false);
	      }
	    });
	  },
	  toggle: function toggle(force) {
	    var show = this.data.show;
	    this.$update('show', force != undefined ? force : !show);
	  }
	});

	var mask = Mask.mask = new Mask();
	Mask.show = function (options) {
	  if (options === true) options = { autoClose: true };
	  mask.$update({
	    bgColor: options.bgColor,
	    autoClose: options.autoClose !== false,
	    show: true
	  }, true);
	  return mask;
	};

	exports['default'] = Mask;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _regularjs = __webpack_require__(2);

	var _regularjs2 = _interopRequireDefault(_regularjs);

	var _ = _regularjs2['default'].util;

	var tpl = '\n  <ul class="nav nav-tabs">\n     {#inc this.$body}\n  </ul>\n  <div class=\'tab-content\' r-anim=\'on:switch;class:fade in\'>\n    {#inc selected.$body}\n  </div>\n';

	var Tab = _regularjs2['default'].extend({
	  name: 'tab',
	  template: tpl
	});

	var paneTpl = '\n  <li role="presentation" class={this.$outer.data.selected==this? \'active\':\'\'} on-click={this.pick()}>\n    <a href={href || \'javascript:;\'}>{#inc title}</a>\n  </li>\n';

	Tab.Pane = _regularjs2['default'].extend({
	  name: 'tab.pane',
	  template: paneTpl,
	  config: function config(data) {
	    if (data.selected) this.pick();
	  },
	  pick: function pick() {
	    if (!this.$outer) return;
	    this.$outer.$update('selected', this);
	  }
	});

	exports['default'] = Tab;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;