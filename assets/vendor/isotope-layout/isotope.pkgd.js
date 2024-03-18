/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
  // universal module definition
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery-bridget/jquery-bridget'], function (jQueryBridget) {
      return factory(window, jQueryBridget);
    });
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery-bridget')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }
}(window, function factory(window, jQueryBridget) {
  'use strict';

  // ----- utils ----- //

  var arraySlice = Array.prototype.slice;

  // helper function for logging errors
  // $.error breaks jQuery chaining
  var console = window.console;
  var logError = typeof console === 'undefined' ? function () {} :
    function (message) {
      console.error(message);
    };

  // ----- jQueryBridget ----- //

  function jQueryBridget(namespace, PluginClass, $) {
    $ = $ || jQuery || window.jQuery;
    if (!$ || !$) {
      return;
    }

    // add option method -> $().plugin('option', {...})
    if (!PluginClass.prototype.option) {
      // option setter
      PluginClass.prototype.option = function (opts) {
        // bail out if not an object
        if (typeof opts !== 'object') {
          return;
        }
        this.options = $.extend(true, this.options, opts);
      };
    }

    // make jQuery plugin
    $.fn[namespace] = function (arg0, arg1) {
      if (typeof arg0 === 'string') {
        // method call $().plugin( 'methodName', { options } )
        // shift arguments by 1
        var args = arraySlice.call(arguments, 1);
        return methodCall(this, arg0, args);
      }
      // just $().plugin({ options })
      plainCall(this, arg0);
      return this;
    };

    // $().plugin('methodName')
    function methodCall($elems, methodName, args) {
      var returnValue;
      var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

      $elems.each(function (i, elem) {
        // get instance
        var instance = $.data(elem, namespace);
        if (!instance) {
          logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
            pluginMethodStr);
          return;
        }

        var method = instance[methodName];
        if (!method || methodName.charAt(0) === '_') {
          logError(pluginMethodStr + ' is not a valid method');
          return;
        }

        // apply method, get return value
        var value = method.apply(instance, args);
        // set return value if value is returned, use only first value
        returnValue = returnValue === undefined ? value : returnValue;
      });

      return returnValue !== undefined ? returnValue : $elems;
    }

    function plainCall($elems, options) {
      $elems.each(function (i, elem) {
        var instance = $.data(elem, namespace);
        if (instance) {
          // set options & init
          instance.option(options);
          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass(elem, options);
          $.data(elem, namespace, instance);
        }
      });
    }

    updateJQuery($);

  }

  // ----- updateJQuery ----- //

  // set $.bridget for v1 backwards compatibility
  function updateJQuery($) {
    if (!$ || ($ && $.bridget)) {
      return;
    }
    $.bridget = jQueryBridget;
  }

  updateJQuery(jQuery || window.jQuery);

  // -----  ----- //

  return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
  // universal module definition
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['ev-emitter/ev-emitter'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    global.EvEmitter = factory();
  }

}(typeof window !== 'undefined' ? window : this, function () {



  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[eventName] = events[eventName] || [];
    // only add once
    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
