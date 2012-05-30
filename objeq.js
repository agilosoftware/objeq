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

// Here's our global
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
    return toString.call(obj) === '[object Array]';
  };

  // Utility Functions ********************************************************

  function makeArray(arr) {
    return Array.prototype.slice.call(arr, 0);
  }

  function isDecorated(value) {
    return value.__objeq_id__ ? true : false;
  }

  function getObjectId(value) {
    return value && value.__objeq_id__ || null;
  }

  // Listener Implementation **************************************************

  var queue = [];      // The queue of pending notifications
  var pending = {};    // Reverse Lookup: Target -> queue Entry
  var properties = {}; // Property Name -> Target -> Callbacks
  var targets = {};    // Reverse Lookup: Target -> properties Entry
  var EmptyArray = [];

  function hasListeners(target, key) {
    var tkey = getObjectId(target);

    if ( !key ) {
      var targetEntry = targets[tkey];
      return targetEntry && targetEntry.length;
    }

    var propertyEntry = properties[key];
    return propertyEntry && ( propertyEntry[tkey] || propertyEntry['*'] );
  }

  function addListener(target, key, callback) {
    var tkey = getObjectId(target) || '*';
    var propertyEntry = properties[key] || ( properties[key] = {} );
    var callbacks = propertyEntry[tkey] || ( propertyEntry[tkey] = [] );

    if ( callbacks.indexOf(callback) !== -1 ) {
      return;
    }

    // Add it to the callbacks and the target reverse lookup
    callbacks.push(callback);
    var targetEntry = targets[tkey] || ( targets[tkey] = [] );
    targetEntry.push(propertyEntry);
  }

  function removeListener(target, key, callback) {
    var propertyEntry = properties[key];
    if ( !propertyEntry ) {
      return;
    }

    var tkey = getObjectId(target) || '*';
    var callbacks = propertyEntry[tkey];
    if ( !callbacks ) {
      return;
    }

    var idx = callbacks.indexOf(callback);
    if ( idx === -1 ) {
      return;
    }

    // Remove it from the callbacks and the target reverse lookup
    callbacks.splice(idx, 1);
    var targetEntry = targets[tkey];
    targetEntry.splice(targetEntry.indexOf(propertyEntry), 1);
  }

  function getListeners(target, key) {
    var propertyEntry = properties[key];
    if ( !propertyEntry ) {
      return null;
    }

    if ( target ) {
      var callbacks = propertyEntry[getObjectId(target)] || EmptyArray;
      var wildcards = propertyEntry['*'] || EmptyArray;
      return [].concat(callbacks, wildcards);
    }

    return [].concat(propertyEntry['*'] || EmptyArray);
  }

  function queueEvent(target, key, value, prev) {
    if ( value === prev || !hasListeners(target, key) ) {
      return;
    }

    var tkey = getObjectId(target);
    var events = pending[tkey] || (pending[tkey] = {});
    var event = events[key];
    if ( event ) {
      if ( value === event.prev ) {
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
    var count = 0;
    for ( var count = 0; queue.length && count < 100; count++ ) {
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
    if ( count === 100 ) {
      throw new Error('Too Many Notification Cycles');
    }
  }

  // Object Decoration ********************************************************

  var nextObjectId = 1;

  function createAccessors(obj, state, key) {
    state[key] = obj[key];

    function setter(value) {
      var prev = state[key];
      if ( value === prev ) {
        return;
      }

      state[key] = value;
      queueEvent(obj, key, value, prev);
    }

    function getter() {
      return decorate(state[key]);
    }

    defineProperty(obj, key, getter, setter);
  }

  function decorateObject(obj) {
    var state = {};
    for ( var key in obj ) {
      if ( !obj.hasOwnProperty(key) ) {
        continue;
      }
      createAccessors(obj, state, key);
    }

    // Read-only Property
    var objectId = 'o'+nextObjectId++;
    defineProperty(obj, '__objeq_id__', function() { return nextObjectId; });

    return obj;
  }

  var Mutators = ['push', 'pop', 'reverse', 'shift', 'unshift', 'sort', 'splice'];

  function wrapArrayFunction(arr, name) {
    var oldFunc = arr[name];
    arr[name] = function wrapped() {
      var prev = -this.length;
      oldFunc.apply(this, arguments);
      var value = this.length;
      queueEvent(this, 'array', value, prev);
    }
  }

  function decorateArray(arr) {
    // TODO: There's gotta be a better way to decorate an array
    for ( var i = 0, ilen = arr.length; i < ilen; i++ ) {
      arr[i] = decorate(arr[i]);
    }

    for ( var i = 0, ilen = Mutators.length; i < ilen; i++ ) {
      wrapArrayFunction(arr, Mutators[i]);
    }

    arr.item = function _item(index, value) {
      if ( typeof value === 'undefined' ) {
        var prev = this[index].__objeq_target__;
        value = this[index] = decorate(value);
        queueEvent(this, 'array', value.__objeq_target__, prev);
      }
      return this[index];
    };

    // Read-only Properties
    var objectId = 'a'+nextObjectId++;
    defineProperty(arr, '__objeq_id__', function() { return objectId; });
    defineProperty(arr, 'objeq', function() { return objeq });

    return arr;
  }

  function decorate(value) {
    if ( typeof value === 'undefined' || value === null ) {
      return value;
    }

    // Already decorated?  Just return the value
    if ( value.__objeq_id__ ) {
      return value;
    };

    if ( isArray(value) ) {
      return decorateArray(value);
    }
    else if ( typeof value === 'object' ) {
      return decorateObject(value);
    }

    return value;
  }

  // Query Implementation *****************************************************

  function getPath(node, path) {
    for ( var i = 0, ilen = path.length; node && i < ilen; i++ ) {
      if ( isArray(node) && isDecorated(node) ) {
        if ( node.length === 0 ) {
          return null;
        }
        node = node[0];
      }
      node = node[path[i]];
      if ( typeof node === 'undefined' || node === null ) return node;
    }
    return node;
  }

  function match(node, obj, args) {
    if ( !isArray(node) ) {
      return node;
    }

    // Resolve all the children first
    var child = [];
    for ( var i = 1, ilen = node.length; i < ilen; i++ ) {
      child.push(match(node[i], obj, args));
    }

    switch ( node[0] ) {
      case 'add': return child[0] + child[1];
      case 'sub': return child[0] - child[1];
      case 'mul': return child[0] * child[1];
      case 'div': return child[0] / child[1];
      case 'mod': return child[0] % child[1];
      case 'and': return child[0] && child[1];
      case 'or':  return child[0] || child[1];
      case 'eq':  return child[0] == child[1];
      case 'neq': return child[0] != child[1];
      case 'gt':  return child[0] > child[1];
      case 'gte': return child[0] >= child[1];
      case 'lt':  return child[0] < child[1];
      case 'lte': return child[0] <= child[1];
      case 'not': return !child[0];
      case 'neg': return -child[0];

      case 'path':
        if ( typeof node[1] == 'string' ) {
          var target = obj, start = 1;
        }
        else {
          var target = args[node[1]], start = 2;
        }
        return getPath(target, node.slice(start));
    }

    // This should hopefully never happen
    throw new Error('Invalid Parser Node: '+node[0]);
  }

  // TODO: Eventually may want do create a dependency graph here
  function addQueryListeners(node, args, invalidateQuery, invalidateResults) {
    if ( !isArray(node) ) {
      return;
    }

    if ( node[0] == 'path' ) {
      if ( typeof node[1] == 'string' ) {
        var target = null, start = 1, callback = invalidateResults;
      }
      else {
        var target = args[node[1]], start = 2, callback = invalidateQuery;
      }

      for ( var i = start, ilen = node.length; i < ilen; i++ ) {
        addListener(target, node[i], callback);
      }
      return;
    }

    for ( var i = 1, ilen = node.length; i < ilen; i++ ) {
      addQueryListeners(node[i], args, invalidateQuery, invalidateResults);
    }
  }

  function query(source, queryString, argStack) {
    var root = $objeqParser.parse(queryString);
    var args = [];
    while ( argStack.length ) {
      args.push(decorate(argStack.pop()));
    }

    var results = decorateArray([]);

    function generateResults() {
      results.length = 0;
      for ( var i = 0, ilen = source.length; i < ilen; i++ ) {
        var obj = source[i];
        if ( match(root, obj, args) ) {
          results.push(obj);
        }
      }
    }

    var sourceInvalid = false, queryInvalid = false, resultsInvalid = false;

    function invalidateSource(target, key, value, prev) {
      sourceInvalid = true;
      generateResults();
      console.log(queryString + ': source invalidated');
    }

    function invalidateQuery(target, key, value, prev) {
      queryInvalid = true;
      generateResults();
      console.log(queryString + ': query invalidated');
    }

    function invalidateResults(target, key, value, prev) {
      resultsInvalid = true;
      generateResults();
      console.log(queryString + ': results invalidated');
    }

    addListener(source, 'array', invalidateSource);
    addQueryListeners(root, args, invalidateQuery, invalidateResults);
    generateResults();

    return results;
  }

  // Debug and Testing Interface **********************************************

  var debug = {
    queue: queue,
    pending: pending,
    properties: properties,
    targets: targets,
    defineProperty1: defineProperty1,
    defineProperty2: defineProperty2,
    defineProperty: defineProperty,
    toString: toString,
    isArray: isArray,
    makeArray: makeArray,
    hasListeners: hasListeners,
    addListener: addListener,
    removeListener: removeListener,
    getListeners: getListeners,
    queueEvent: queueEvent,
    notifyListeners: notifyListeners,
    createAccessors: createAccessors,
    decorateObject: decorateObject,
    decorateArray: decorateArray,
    decorate: decorate,
    getPath: getPath,
    match: match,
    addQueryListeners: addQueryListeners,
    query: query,
    objeq: objeq
  };

  // Exported Function ********************************************************

  function objeq() {
    var $this = this.__objeq_id__ ? this : decorateArray([]);

    // TODO: For testing and debugging only
    if ( arguments.length == 0 ) {
      notifyListeners();
      debug.queue = queue;
      debug.pending = pending;
      return debug;
    }

    // Fast Path for Single Array Parameter Calls
    if ( arguments.length == 1 && isArray(arguments[0]) ) {
      return decorate(arguments[0]);
    }

    // TODO: If we pass multiple arrays, maybe we flatten them?
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
