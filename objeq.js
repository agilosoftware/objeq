/*
 * Copyright (c) 2012 Agilo Software GmbH
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * objeq (Object Querying) - is a simple library that allows POJSO's
 * (Plain-Old JavaScript Objects) to be queried in real-time.  As it
 * relies on property setters, it will only work in more recent
 * browsers,
 *
 * @author Thom Bradford
 * @author Stefano Rago
 */

// Here's our Global
var $objeq;

(function() {
  // Feature Checking *********************************************************
  var hasDefineProperty = Object.prototype.defineProperty;
  var hasDefineSetter = Object.prototype.__defineSetter__;
  if ( !hasDefineProperty && !hasDefineSetter ) {
    // TODO: Throw an error if this library will be unusable?
    console.log("Property definitions are not available!  Not Good!");
    return;
  }

  // By default, try to use standard ECMAScript defineProperty
  function defineProperty1(obj, key, getter, setter) {
    Object.defineProperty(obj, key, {
      get: getter,
      set: setter
    });
  }

  // Otherwise, well have to fall back to __defineSetter__ / __defineGetter
  function defineProperty2(obj, key, getter, setter) {
    if ( getter ) {
      obj.__defineGetter__(key, getter);
    }
    if ( setter ) {
      obj.__defineSetter__(key, setter);
    }
  }

  var defineProperty = hasDefineProperty ? defineProperty1 : defineProperty2;

  var toString = Object.prototype.toString;
  var isArray = Array.isArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Utility Functions ********************************************************

  function makeArray(arr) {
    return Array.prototype.slice.call(arr, 0);
  }

  // Listener Implementation **************************************************

  var queue = [];      // The queue of pending notifications
  var pending = {};    // Reverse Lookup: Target -> queue Entry
  var properties = {}; // Property Name -> Target -> Callbacks
  var targets = {};    // Reverse Lookup: Target -> properties Entry
  var EmptyArray = [];

  function hasListeners(target, key) {
    if ( !key ) {
      var targetEntry = targets[target];
      return targetEntry && targetEntry.length;
    }

    var propertyEntry = properties[key];
    return propertyEntry && ( propertyEntry[target] || propertyEntry['*'] );
  }

  function addListener(target, key, callback) {
    target = target || '*';
    var propertyEntry = properties[key] || ( properties[key] = {} );
    var callbacks = propertyEntry[target] || ( propertyEntry[target] = [] );

    if ( callbacks.indexOf(callback) != -1 ) {
      return;
    }

    // Add it to the callbacks and the target reverse lookup
    callbacks.push(callback);
    var targetEntry = targets[target] || ( targets[target] = [] );
    targetEntry.push(propertyEntry);
  }

  function removeListener(target, key, callback) {
    var propertyEntry = properties[key];
    if ( !propertyEntry ) {
      return;
    }

    target = target || '*';
    var callbacks = propertyEntry[target];
    if ( !callbacks ) {
      return;
    }

    var idx = callbacks.indexOf(callback);
    if ( idx == -1 ) {
      return;
    }

    // Remove it from the callbacks and the target reverse lookup
    callbacks.splice(idx, 1);
    var targetEntry = targets[target];
    targetEntry.splice(targetEntry.indexOf(propertyEntry), 1);
  }

  function getListeners(target, key) {
    var propertyEntry = properties[key];
    if ( !propertyEntry ) {
      return null;
    }

    if ( target ) {
      var callbacks = propertyEntry[target] || EmptyArray;
      var wildcards = propertyEntry['*'] || EmptyArray;
      return [].concat(callbacks, wildcards);
    }

    return [].concat(propertyEntry['*'] || EmptyArray);
  }

  function queueEvent(target, key, value, prev) {
    if ( value == prev || !hasListeners(target, key) ) {
      return;
    }

    var events = pending[target] || (pending[target] = {});
    var event = events[key];
    if ( event ) {
      if ( value == event.prev ) {
        // If we've reverted to the original value, remove from queue
        queue.splice(queue.indexOf(event), 1);
        delete events[key];
        return;
      }
      event.value = value;
    }
    else {
      queue.push({ target: target, key: key, value: value, prev: prev });
    }
  }

  function notifyListeners() {
    var currentQueue = [].concat(queue);
    pending = {};
    queue = [];

    for ( var i = 0, ilen = currentQueue.length; i < ilen; i++ ) {
      var event = currentQueue[i];
      var target = event.target, key = event.key;
      var listeners = getListeners(target, key);

      for ( var j = 0, jlen = listeners.length; j < jlen; j++ ) {
        var callback = listeners[j];
        if ( callback.once ) {
          removeListener(target, key, callback);
        }
        callback(target, key, event.value, event.prev);
      }
    }
  }

  // Object Decoration ********************************************************

  function createAccessors(wrapper, obj, key) {
    function setter(value) {
      var prev = obj[key];
      if ( value == prev ) {
        return;
      }

      obj[key] = value;
      queueEvent(obj, key, value, prev);
    }

    function getter() {
      return decorate(obj[key]);
    }

    defineProperty(wrapper, key, getter, setter);
  }

  function decorateObject(obj) {
    var wrap = {};
    for ( var key in obj ) {
      if ( !obj.hasOwnProperty(key) ) {
        continue;
      }
      createAccessors(wrap, obj, key);
    }

    // Read-only Properties
    defineProperty(wrap, '__objeq_target__', function() { return obj; });
    defineProperty(wrap, '__objeq_wrapper__', function() { return wrap; });
    defineProperty(obj, '__objeq_wrapper__', function() { return wrap; });
    // TODO: Should we add the objeq method to wrapped Objects as well?

    return wrap;
  }

  var Mutators = ['push', 'pop', 'reverse', 'shift', 'unshift', 'sort', 'splice'];

  function decorateArray(arr) {
    // TODO: There's gotta be a better way to decorate an array
    for ( var i = 0, ilen = arr.length; i < ilen; i++ ) {
      arr[i] = decorate(arr[i]);
    }

    // TODO: Can't sort on wrapped items, so need to do something special
    function wrapFunction(name) {
      var oldFunc = arr[name];
      arr[name] = function wrapped() {
        var prev = -arr.length;
        oldFunc.apply(arr, arguments);
        var value = arr.length;
        queueEvent(arr, name, value, prev);
      };
    }

    for ( var i = 0, ilen = Mutators.length; i < ilen; i++ ) {
      wrapFunction(Mutators[i]);
    }

    arr.item = function _item(index, value) {
      if ( value !== undefined ) {
        var prev = arr[index].__objeq_target__;
        value = arr[index] = decorate(value);
        queueEvent(arr, index, value.__objeq_target__, prev);
      }
      return arr[index];
    };

    // Read-only Properties
    defineProperty(arr, '__objeq_target__', function() { return arr; });
    defineProperty(arr, '__objeq_wrapper__', function() { return arr; });
    defineProperty(arr, 'objeq', function() { return objeq });

    return arr;
  }

  function decorate(value) {
    if ( value == undefined || value == null ) {
      return value;
    }

    // Already decorated?  Return our original wrapper
    var wrap = value.__objeq_wrapper__;
    if ( wrap ) {
      return wrap;
    }

    if ( isArray(value) ) {
      return decorateArray(value);
    }
    else if ( typeof value == 'object' ) {
      return decorateObject(value);
    }

    return value;
  }

  // Query Implementation *****************************************************

  function query($this, queryString, args) {
    var root = $objeqParser.parse(queryString);
    var resolvedArguments = [];
    while ( args.length ) {
      resolvedArguments.push(decorate(args.pop()));
    }
    var results = [].concat($this);
    var sourceInvalid = true, queryInvalid = true, resultsInvalid = true;

    function invalidateSource(target, key, value, prev) {
      sourceInvalid = true;
      console.log(queryString + ': source invalidated');
    }

    function invalidateQuery(target, key, value, prev) {
      queryInvalid = true;
      console.log(queryString + ': query invalidated');
    }

    function invalidateResults(target, key, value, prev) {
      resultsInvalid = true;
      console.log(queryString + ': results invalidated');
    }

    function addListeners(node) {
      if ( !isArray(node) ) {
        return;
      }

      if ( node[0] == 'path' ) {
        if ( typeof node[1] == 'string' ) {
          var target = null;
          var start = 1;
          var callback = invalidateResults;
        }
        else {
          var target = resolvedArguments[node[1]];
          var start = 2;
          var callback = invalidateQuery;
        }

        for ( var i = start, ilen = node.length; i < ilen; i++ ) {
          addListener(target, node[i], callback);
        }
        return;
      }

      for ( var i = 1, ilen = node.length; i < ilen; i++ ) {
        addListeners(node[i]);
      }
    }

    addListeners(root);

    return results;
  }

  // Exported Function ********************************************************

  function objeq() {
    var $this = this.__objeq_wrapper__ ? this : decorateArray([]);

    // TODO: This is just for testing... what we really want
    //       to have is a latent notification system
    if ( arguments.length == 0 ) {
      notifyListeners();
      return $this;
    }

    // Fast Path for Single Parameter Calls
    if ( arguments.length == 1 ) {
      var arg0 = arguments[0];
      if ( typeof arg0 == 'object' || isArray(arg0) ) {
        return decorate(arg0);
      }
    }

    var results = null;
    var args = makeArray(arguments).reverse();
    while ( args.length ) {
      var arg = args.pop();
      if ( typeof arg == 'string' ) {
        results = query($this, arg, args);
        break; // short circuit if it's a query
      }
      else {
        results = results || ( $this = results = decorateArray([]) );
        results.push(decorate(arg));
      }
    }
    return results;
  }

  // bind the function to its global variable
  $objeq = objeq;
})();
