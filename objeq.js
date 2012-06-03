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
 * objeq (Object Querying)
 *
 * objeq is a simple library that allows POJSO's (Plain-Old JavaScript
 * Objects) to be queried in real-time.  As it relies on property setters,
 * it will only work in more recent browsers,
 *
 * @author Thom Bradford (github/bradford653)
 * @author Stefano Rago (github/sterago)
 */

// TODO: Make CommonJS Compatible

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
    obj.__defineGetter__(key, getter);
    if ( setter ) {
      obj.__defineSetter__(key, setter);
    }
  }

  var defineProperty = hasDefineProperty ? defineProperty1 : defineProperty2;

  var toString = Object.prototype.toString;
  var isArray = Array.isArray || function _isArray(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Utility Functions ********************************************************

  function makeArray(arr) {
    return Array.prototype.slice.call(arr, 0);
  }

  function mixin(obj) {
    for ( var i = 1, ilen = arguments.length; i < ilen; i++ ) {
      var hash = arguments[i];
      for ( var key in hash ) {
        obj[key] = hash[key];
      }
    }
  }

  function isDecorated(value) {
    return value.__objeq_id__ ? true : false;
  }

  function getObjectId(value) {
    return value && value.__objeq_id__ || null;
  }

  function getArrayContentKey(value) {
    return getObjectId(value) + '_content';
  }

  // Listener Implementation **************************************************

  var queue = [];      // The queue of pending notifications
  var pending = {};    // Reverse Lookup: Target -> queue Entry
  var listeners = {};  // Property@Target -> Callbacks
  var targets = {};    // Reverse Lookup: Target -> Property@Target Set
  var EmptyArray = [];

  function hasListeners(target, key) {
    var pkey = key || '*';
    var tkey = getObjectId(target) || '*';
    var entryKey = pkey + '@' + tkey;
    return listeners[entryKey] || listeners[pkey + '@*'];
  }

  function addListener(target, key, callback) {
    var tkey = getObjectId(target) || '*';
    var entryKey = (key || '*') + '@' + tkey;
    var callbacks = listeners[entryKey] || ( listeners[entryKey] = [] );

    if ( callbacks.indexOf(callback) !== -1 ) {
      return;
    }

    // Add it to the callbacks and the target reverse lookup
    callbacks.push(callback);
    var targetEntry = targets[tkey] || ( targets[tkey] = [] );
    targetEntry.push(entryKey);
  }

  function removeListener(target, key, callback) {
    var tkey = getObjectId(target) || '*';
    var entryKey = (key || '*') + '@' + tkey;
    var callbacks = listeners[entryKey];
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
    targetEntry.splice(targetEntry.indexOf(entryKey), 1);
  }

  function getCallbacks(target, key) {
    var tkey = getObjectId(target) || '*';
    var entryKey = (key || '*') + '@' + tkey;

    var callbacks = listeners[entryKey];
    var wildcards = key ? listeners[key + '@*'] : null;
    if ( callbacks && wildcards ) {
      return callbacks.concat(wildcards);
    }
    return callbacks || wildcards || EmptyArray;
  }

  // Allow a Developer the ability to debug a problem rather than having to
  // forcefully restart their browser (I'm looking at *YOU* Safari)
  var MaxNotifyCycles = 128;

  // To avoid recursion when queueEvent calls notifyListeners
  var inNotifyListeners = false;

  function notifyListeners() {
    inNotifyListeners = true;
    for ( var count = 0; queue.length && count < MaxNotifyCycles; count++ ) {
      var currentQueue = [].concat(queue);
      pending = {};
      queue = [];

      for ( var i = 0, ilen = currentQueue.length; i < ilen; i++ ) {
        var event = currentQueue[i];
        var target = event.target, key = event.key;
        var callbacks = getCallbacks(target, key);

        for ( var j = 0, jlen = callbacks.length; j < jlen; j++ ) {
          var callback = callbacks[j];
          callback(target, key, event.value, event.prev);
        }
      }

      refreshQueries();
    }
    inNotifyListeners = false;
    if ( count === MaxNotifyCycles ) {
      throw new Error('Too Many Notification Cycles');
    }
  }

  function queueEvent(target, key, value, prev) {
    if ( value === prev || !hasListeners(target, key) ) {
      return;
    }

    var tkey = getObjectId(target);
    var events = pending[tkey] || (pending[tkey] = {});
    var event = events[key];
    if ( !event ) {
      queue.push({ target: target, key: key, value: value, prev: prev });
    }
    else {
      if ( value === event.prev ) {
        // If we've reverted to the original value, remove from queue
        queue.splice(queue.indexOf(event), 1);
        delete events[key];
        return;
      }
      event.value = value;
    }
    if ( !inNotifyListeners ) {
      notifyListeners();
    }
  }

  // Object Decoration ********************************************************

  // We have to keep track of objects with IDs for dictionary lookups
  var nextObjectId = 1;

  function createAccessors(obj, state, key) {
    state[key] = obj[key];

    function setter(value) {
      value = decorate(value);

      var prev = state[key];
      if ( value === prev ) {
        return;
      }

      state[key] = value;
      queueEvent(this, key, value, prev);
    }

    function getter() {
      return state[key];
    }

    defineProperty(obj, key, getter, setter);
  }

  function decorateObject(obj) {
    var state = {};
    for ( var key in obj ) {
      if ( !obj.hasOwnProperty(key) || typeof obj[key] === 'function' ) {
        continue;
      }
      createAccessors(obj, state, key);
    }

    // Read-only Property
    var objectId = 'o' + (nextObjectId++);
    defineProperty(obj, '__objeq_id__', function() { return objectId; });

    return obj;
  }

  var ArrayFuncs = [
    { name: 'push', additive: true },
    { name: 'unshift', additive: true },
    { name: 'splice', additive: true },
    { name: 'pop', additive: false },
    { name: 'reverse', additive: false },
    { name: 'shift', additive: false },
    { name: 'sort', additive: false }
  ];

  function wrapArrayFunction(arr, name, additive) {
    var oldFunc = arr[name];
    if ( !oldFunc ) {
      console.log('Attempting to wrap an Array, but it is missing: '+name);
      return;
    }

    arr[name] = function wrapped() {
      var prev = -this.length;
      oldFunc.apply(this, arguments);
      if ( additive ) {
        // TODO: This is not ideal because we only care about new items
        for ( var i = 0, ilen = this.length; i < ilen; i++ ) {
          this[i] = decorate(this[i]);
        }
      }
      var value = this.length;
      queueEvent(this, getArrayContentKey(this), value, prev);
    };
  }

  var decoratedArrayMixin = {
    query: query,       // for live sub-queries
    snapshot: snapshot, // for snapshot queries

    item: function _item(index, value) {
      if ( typeof value !== 'undefined' ) {
        var prev = this[index];
        this[index] = decorate(value);
        queueEvent(this, getArrayContentKey(this), value, prev);
      }
      return this[index];
    },

    on: function _on(events, callback) {
      var evt = events.split(/\s/);
      for ( var i = 0, ilen = evt.length; i < ilen; i++ ) {
        switch( evt[i] ) {
          case 'change':
            addListener(this, getArrayContentKey(this), callback);
        }
      }
    },

    off: function _off(events, callback) {
      var evt = events.split(/\s/);
      for ( var i = 0, ilen = evt.length; i < ilen; i++ ) {
        switch( evt[i] ) {
          case 'change':
            removeListener(this, getArrayContentKey(this), callback);
        }
      }
    },

    destroy: function() {
      // TODO: Check if there are child arrays depending on this one
      //       If none, then we can remove all listeners
    }
  };

  function decorateArray(arr) {
    for ( var i = 0, ilen = arr.length; i < ilen; i++ ) {
      arr[i] = decorate(arr[i]);
    }

    for ( var i = 0, ilen = ArrayFuncs.length; i < ilen; i++ ) {
      var arrayFunc = ArrayFuncs[i];
      wrapArrayFunction(arr, arrayFunc.name, arrayFunc.additive);
    }

    mixin(arr, decoratedArrayMixin);

    // Read-only Properties
    var objectId = 'a' + (nextObjectId++);
    defineProperty(arr, '__objeq_id__', function() { return objectId; });

    return arr;
  }

  function decorate(value) {
    if ( value == null || isDecorated(value) ) {
      return value;
    }

    if ( isArray(value) ) {
      return decorateArray(value);
    }
    else if ( typeof value === 'object' ) {
      return decorateObject(value);
    }

    return value;
  }

  // Query Implementation *****************************************************

  // Invalidated Queries are marked and processed after notifyListeners
  var invalidated = {}, pendingRefresh = {};

  function invalidateQuery(results, refreshFunction) {
    var tkey = getObjectId(results);
    if ( !pendingRefresh[tkey] ) {
      invalidated[tkey] = refreshFunction;
    }
  }

  function refreshQueries() {
    pendingRefresh = invalidated;
    invalidated = {};
    for ( var key in pendingRefresh ) {
      var refreshFunction = pendingRefresh[key];
      delete pendingRefresh[key];
      refreshFunction();
    }
  }

  function getPath(node, path) {
    for ( var i = 0, ilen = path.length; node && i < ilen; i++ ) {
      if ( isArray(node) && isDecorated(node) ) {
        if ( node.length === 0 ) {
          return null;
        }
        node = node[0];
      }
      node = node[path[i]];
      if ( node == null ) {
        return node;
      }
    }
    return node;
  }

  function evaluate(node, obj, args) {
    if ( !isArray(node) || !node.isNode ) {
      return node;
    }

    // Resolve all the children first
    var child = [];
    for ( var i = 1, ilen = node.length; i < ilen; i++ ) {
      child.push(evaluate(node[i], obj, args));
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
      case 'in':  return child[1].indexOf(child[0]) != -1;
      case 'not': return !child[0];
      case 'neg': return -child[0];

      case 'path':
        var target, start;
        if ( typeof node[1] === 'number' ) {
          target = args[node[1]]; start = 2;
        }
        else {
          target = obj; start = 1;
        }
        return getPath(target, node.slice(start));

      default: // we assume
        return child[0];
    }

    // This should hopefully never happen
    throw new Error('Invalid Parser Node: '+node[0]);
  }

  // TODO: Eventually may want do create a dependency graph here
  function addQueryListeners(node, args, invalidateQuery, invalidateResults) {
    if ( !isArray(node) ) {
      return;
    }

    if ( node[0] === 'path' ) {
      var target, start, callback;
      if ( typeof node[1] === 'number' ) {
        target = args[node[1]]; start = 2; callback = invalidateQuery;
      }
      else {
        target = null; start = 1; callback = invalidateResults;
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

  function createComparator(path, ascending) {
    if ( ascending ) {
      return function ascendingComparator(item1, item2) {
        var val1 = getPath(item1, path);
        var val2 = getPath(item2, path);
        return val1 == val2 ? 0 : val1 > val2 ? 1 : -1;
      };
    }
    else {
      return function descendingComparator(item1, item2) {
        var val1 = getPath(item1, path);
        var val2 = getPath(item2, path);
        return val1 == val2 ? 0 : val1 < val2 ? 1 : -1;
      };
    }
  }

  function createSortFunction(order) {
    var chain = [];
    for ( var i = 0, len = order.length; i < len; i++ ) {
      var item = order[i];
      chain.push(createComparator(item.path.slice(1), item.ascending));
    }

    return function(item1, item2) {
      for ( var i = 0, len = chain.length; i < len; i++ ) {
        var result = chain[i](item1, item2);
        if ( result !== 0 ) {
          return result;
        }
      }
      return 0;
    }
  }

  function node() {
    var result = makeArray(arguments);
    result.isNode = true;
    return result;
  }

  $objeqParser.yy = {
    node: node
  };

  function parse(queryString) {
    return $objeqParser.parse(queryString);
  }

  var EmptyPath = node('path');

  function processQuery(source, queryString, args, live) {
    var root = parse(queryString);
    var results = decorateArray([]);

    var expr = root.expr;
    var select = root.select || EmptyPath;
    var sortFirst = root.sortFirst;
    var sortFunction = root.order ? createSortFunction(root.order) : null;

    // TODO: Right now this is brute force, but we need to do deltas
    function refreshResults() {
      var prev = -results.length;
      results.length = 0;

      if ( !sortFunction || !sortFirst || select === EmptyPath ) {
        // Post-Drilldown Sorting
        for ( var i = 0, j = 0, ilen = source.length; i < ilen; i++ ) {
          var obj = source[i];
          if ( !evaluate(expr, obj, args) ) {
            continue;
          }

          obj = evaluate(select, obj, args);
          if ( obj ) {
            results[j++] = obj;
          }
        }
        if ( sortFunction ) {
          results.sort(sortFunction);
        }
      }
      else {
        // Pre-Drilldown Sorting
        var temp = [];
        for ( var i = 0, j = 0, ilen = source.length; i < ilen; i++ ) {
          var obj = source[i];
          if ( evaluate(expr, obj, args) ) {
            temp[j++] = obj;
          }
        }
        temp.sort(sortFunction);
        for ( var i = 0, j = 0, ilen = temp.length; i < ilen; i++ ) {
          obj = evaluate(select, temp[i], args);
          if ( obj ) {
            results[j++] = obj;
          }
        }
      }

      if ( live ) {
        queueEvent(results, getArrayContentKey(results), results.length, prev);
      }
    }

    function sourceListener(target, key, value, prev) {
      console.log(queryString + ': source invalidated');
      invalidateQuery(results, refreshResults);
    }

    function queryListener(target, key, value, prev) {
      console.log(queryString + ': query invalidated');
      invalidateQuery(results, refreshResults);
    }

    function resultListener(target, key, value, prev) {
      console.log(queryString + ': results invalidated');
      invalidateQuery(results, refreshResults);
    }

    if ( live ) {
      addListener(source, getArrayContentKey(source), sourceListener);
      addQueryListeners(root.expr, args, queryListener, resultListener);
    }
    refreshResults();

    return results;
  }

  function query() {
    // Process a "live" query whose results update with data changes
    var args = makeArray(arguments);
    var queryString = args.shift();
    return processQuery(this, queryString, args, true);
  }

  function snapshot() {
    // Process a "snapshot" query with static results
    var args = makeArray(arguments);
    var queryString = args.shift();
    return processQuery(this, queryString, args, false);
  }

  // Debug and Testing Interface **********************************************

  function debug() {
    return {
      queue: queue,
      pending: pending,
      listeners: listeners,
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
      getCallbacks: getCallbacks,
      notifyListeners: notifyListeners,
      queueEvent: queueEvent,
      createAccessors: createAccessors,
      decorateObject: decorateObject,
      wrapArrayFunction: wrapArrayFunction,
      decorateArray: decorateArray,
      decorate: decorate,
      invalidated: invalidated,
      pendingRefresh: pendingRefresh,
      invalidateQuery: invalidateQuery,
      refreshQueries: refreshQueries,
      getPath: getPath,
      match: match,
      addQueryListeners: addQueryListeners,
      createComparator: createComparator,
      createSortFunction: createSortFunction,
      node: node,
      parse: parse,
      processQuery: processQuery,
      query: query,
      snapshot: snapshot,
      objeq: objeq
    };
  }

  // Exported Function ********************************************************

  function objeq() {
    // TODO: For testing and debugging only
    if ( arguments.length === 0 ) {
      return debug();
    }

    var source = isDecorated(this) ? this : decorateArray([]);
    var args = makeArray(arguments);

    // Fast Path for Single Array Parameter Calls
    if ( args.length === 1 && isArray(args[0]) ) {
      return decorate(args[0]);
    }

    // TODO: If we pass multiple arrays, maybe we flatten them?
    var results = null;
    while ( args.length ) {
      var arg = args.shift();
      if ( typeof arg === 'string' ) {
        results = processQuery(source, arg, args, true);
        break; // short circuit if it's a query
      }
      else {
        results = results || ( source = results = decorateArray([]) );
        results.push(decorate(arg));
      }
    }
    return results;
  }

  // bind the function to its global variable
  $objeq = objeq;
})();
