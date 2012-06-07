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
 * objeq (JavaScript Object Querying)
 *
 * objeq is a simple library that allows POJSO's (Plain-Old JavaScript
 * Objects) to be queried in real-time.  As it relies on property setters,
 * it will only work in more recent browsers,
 *
 * @author Thom Bradford (github/bradford653)
 * @author Stefano Rago (github/sterago)
 */

(function() {
  var CurrentVersion = "0.0.1"
    , self = this || { $objeqParser: null };

  // Feature Checking *********************************************************

  var hasDefineProperty = Object.prototype.defineProperty
    , hasDefineSetter = Object.prototype.__defineSetter__;

  if ( !hasDefineProperty && !hasDefineSetter ) {
    throw new Error("Property definitions are not available!  Not Good!");
  }

  var objeqParser = null;
  if ( self.$objeqParser ) {
    objeqParser = self.$objeqParser;
  }
  else {
    if ( typeof require === 'function' ) {
      objeqParser = require('objeq-parser').parser;
    }
    else {
      throw new Error("The objeq Parser doesn't seem to be available!");
    }
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

  var defineProperty = hasDefineProperty ? defineProperty1 : defineProperty2
    , toString = Object.prototype.toString;

  var isArray = Array.isArray || function _isArray(obj) {
    return obj != null && toString.call(obj) === '[object Array]';
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

  var queue = []                // The queue of pending notifications
    , pending = {}              // Reverse Lookup: Target -> queue Entry
    , listeners = {}            // Property@Target -> Callbacks
    , targets = {}              // Reverse Lookup: Target -> Property@Target
    , inNotifyListeners = false // to avoid recursion with notifyListeners
    , MaxNotifyCycles = 128;    // to avoid locking up the browser in loops

  function hasListeners(target, key) {
    var pkey = key || '*'
      , tkey = getObjectId(target) || '*'
      , entryKey = pkey + '@' + tkey;

    return listeners[entryKey] || listeners[pkey + '@*'];
  }

  function addListener(target, key, callback) {
    var tkey = getObjectId(target) || '*'
      , entryKey = (key || '*') + '@' + tkey
      , callbacks = listeners[entryKey] || ( listeners[entryKey] = [] );

    if ( callbacks.indexOf(callback) !== -1 ) {
      return;
    }

    // Add it to the callbacks and the target reverse lookup
    callbacks.push(callback);
    var targetEntry = targets[tkey] || ( targets[tkey] = [] );
    targetEntry.push(entryKey);
  }

  function removeListener(target, key, callback) {
    var tkey = getObjectId(target) || '*'
      , entryKey = (key || '*') + '@' + tkey
      , callbacks = listeners[entryKey];

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

  var EmptyArray = [];

  function getCallbacks(target, key) {
    var tkey = getObjectId(target) || '*'
      , entryKey = (key || '*') + '@' + tkey
      , callbacks = listeners[entryKey]
      , wildcards = key ? listeners[key + '@*'] : null;

    if ( callbacks && wildcards ) {
      return callbacks.concat(wildcards);
    }
    return callbacks || wildcards || EmptyArray;
  }

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
          callbacks[j](target, key, event.value, event.prev);
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

    var tkey = getObjectId(target)
      , events = pending[tkey] || (pending[tkey] = {})
      , event = events[key];

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

  var DecoratedArrayMixin = {
    dynamic: dynamic, // for dynamic sub-queries
    query: query,     // for snapshot queries

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

    mixin(arr, DecoratedArrayMixin);

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
  var invalidated = {}
    , pendingRefresh = {};

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

  var regexCache = {}; // TODO: LRU Cache

  // TODO: Maybe break this up into separate function generators
  function createEvaluator(node) {
    if ( !isArray(node) || !node.isNode ) {
      return function() { return node; }
    }

    var op = node[0];

    // Resolving Operators
    switch ( op ) {
      case 'path':
        var index = node[1]
          , pathComponents;
                  
        if ( typeof index === 'number' ) {
          pathComponents = node.slice(2);
          return function _argpath(obj, args) {
            return getPath(args[index], pathComponents);
          };
        }
        else {
          pathComponents = node.slice(1);
          return function _localpath(obj, args) {
            return getPath(obj, pathComponents);
          };
        }

      case 'obj':
        // create evaluators for the values
        var hash = node[1], template = {};
        for ( var key in hash ) {
          var item = hash[key];
          var isNode = isArray(item) && item.isNode;
          template[key] = isNode ? createEvaluator(item) : item;
        }
        return function _obj(obj, args) {
          var result = {};
          for ( var key in template ) {
            var item = template[key];
            result[key] = typeof item === 'function' ? item(obj, args) : item;
          }
          return result;
        };

      case 'arr':
        // create evaluators for the items
        var items = node[1], template = [];
        for ( var i = 0, ilen = items.length; i < ilen; i++ ) {
          var item = items[i];
          var isNode = isArray(item) && item.isNode;
          template[i] = isNode ? createEvaluator(item) : item;
        }
        return function _arr(obj, args) {
          var result = [];
          for ( var i = 0, ilen = template.length; i < ilen; i++ ) {
            var item = template[i];
            result[i] = typeof item === 'function' ? item(obj, args) : item;
          }
          return result;
        };
    }

    // Unary Operators
    var lnode = node[1], left;
    if ( isArray(lnode) && lnode.isNode ) {
      left = createEvaluator(lnode);
    }

    switch ( op ) {
      case 'not':
        return function _not(obj, args) {
          return !(left ? left(obj, args) : lnode);
        };

      case 'neg':
        return function _neg(obj, args) {
          return -(left ? left(obj, args) : lnode);
        };
    }

    // Binary Operators
    var rnode = node[2], right;
    if ( isArray(rnode) && rnode.isNode ) {
      right = createEvaluator(rnode);
    }

    switch ( op ) {
      case 'and':
        return function _and(obj, args) {
          var lval = left ? left(obj, args) : lnode;
          return !lval ? lval : (right ? right(obj, args) : rnode);
        };

      case 'or':
        return function _or(obj, args) {
          var lval = left ? left(obj, args) : lnode;
          return left ? lval : (right ? right(obj, args) : rnode);
        };

      case 'add':
        return function _add(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval + rval;
        };

      case 'sub':
        return function _sub(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval - rval;
        };

      case 'mul':
        return function _mul(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval * rval;
        };

      case 'div':
        return function _mul(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval / rval;
        };

      case 'mod':
        return function _mod(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval % rval;
        };

      case 'eq':
        return function _eq(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval == rval;
        };

      case 'neq':
        return function _neq(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval != rval;
        };

      case 'gt':
        return function _gt(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval > rval;
        };

      case 'gte':
        return function _gte(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval >= rval;
        };

      case 'lt':
        return function _lt(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval < rval;
        };

      case 'lte':
        return function _lte(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          return lval <= rval;
        };

      case 'in':
        return function _in(obj, args) {
          var rval = right ? right(obj, args) : rnode;
          return rval && rval.indexOf(left ? left(obj, args) : lnode) != -1;
        };

      case 'regex':
        // TODO: This function needs to be a little more robust
        return function _regex(obj, args) {
          var lval = left ? left(obj, args) : lnode
            , rval = right ? right(obj, args) : rnode;
          var re = regexCache[lval] || (regexCache[lval] = new RegExp(lval));
          return re.test(rval);
        };
    }

    // This should hopefully never happen
    throw new Error('Invalid Parser Node: '+op);
  }

  // TODO: Eventually may want do create a dependency graph instead
  function addQueryListeners(paths, args, invalidateQuery, invalidateResults) {
    for ( var i = 0, ilen = paths.length; i < ilen; i++ ) {
      var node = paths[i]
        , index = node[1]
        , target, start, callback;

      if ( typeof index === 'number' ) {
        target = args[index]; start = 2; callback = invalidateQuery;
      }
      else {
        target = null; start = 1; callback = invalidateResults;
      }

      for ( var j = start, jlen = node.length; j < jlen; j++ ) {
        addListener(target, node[j], callback);
      }
    }
  }

  function createComparator(path, ascending) {
    if ( ascending ) {
      return function ascendingComparator(item1, item2) {
        var val1 = getPath(item1, path)
          , val2 = getPath(item2, path);
        return val1 == val2 ? 0 : val1 > val2 ? 1 : -1;
      };
    }
    else {
      return function descendingComparator(item1, item2) {
        var val1 = getPath(item1, path)
          , val2 = getPath(item2, path);
        return val1 == val2 ? 0 : val1 < val2 ? 1 : -1;
      };
    }
  }

  function createSorter(order) {
    var chain = [];
    for ( var i = 0, ilen = order.length; i < ilen; i++ ) {
      var item = order[i];
      chain.push(createComparator(item.path.slice(1), item.ascending));
    }

    return function(item1, item2) {
      for ( var i = 0, ilen = chain.length; i < ilen; i++ ) {
        var result = chain[i](item1, item2);
        if ( result !== 0 ) {
          return result;
        }
      }
      return 0;
    };
  }

  function yynode() {
    var result = makeArray(arguments);
    result.isNode = true;
    return result;
  }

  function yypath() {
    var args = makeArray(arguments)
      , result = ['path'].concat(args);
    result.isNode = true;
    this.paths.push(result);
    return result;
  }

  var parserPool = [],
      parseCache = {}, // TODO: LRU Cache
      EmptyPath = yynode('path');

  function parse(queryString) {
    var result = parseCache[queryString];
    if ( result ) {
      return result;
    }

    // Get a Parser from the pool, if possible
    var parser = parserPool.pop() || new objeqParser.Parser();
    parser.yy = { node: yynode, path: yypath, paths: [] };

    // Parse the Query, include paths and evaluators in the result
    var result = parseCache[queryString] = parser.parse(queryString);
    result.paths = parser.yy.paths;
    result.evaluate = createEvaluator(result.expr);
    result.select = createEvaluator(result.select || EmptyPath);
    result.sort = result.order && createSorter(result.order);

    // Push the Parser back onto the pool and return the result
    parserPool.push(parser);
    return result;
  }

  function processQuery(source, queryString, args, dynamic) {
    var root = parse(queryString)
      , results = decorateArray([])
      , evaluate = root.evaluate
      , select = root.select
      , sort = root.sort
      , sortFirst = root.sortFirst;

    // TODO: Right now this is brute force, but we need to do deltas
    function refreshResults() {
      var prev = -results.length;
      results.length = 0;

      if ( !sort || !sortFirst || select === EmptyPath ) {
        // Post-Drilldown Sorting
        for ( var i = 0, j = 0, ilen = source.length; i < ilen; i++ ) {
          var obj = source[i];
          if ( !evaluate(obj, args) ) {
            continue;
          }

          results[j++] = select(obj, args);
        }
        if ( sort ) {
          results.sort(sort);
        }
      }
      else {
        // Pre-Drilldown Sorting
        var temp = [];
        for ( var i = 0, j = 0, ilen = source.length; i < ilen; i++ ) {
          var obj = source[i];
          if ( evaluate(obj, args) ) {
            temp[j++] = obj;
          }
        }
        temp.sort(sort);
        for ( var i = 0, j = 0, ilen = temp.length; i < ilen; i++ ) {
          results[j++] = select(temp[i], args);
        }
      }

      if ( dynamic ) {
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

    if ( dynamic ) {
      addListener(source, getArrayContentKey(source), sourceListener);
      addQueryListeners(root.paths, args, queryListener, resultListener);
    }
    refreshResults();

    return results;
  }

  function dynamic() {
    // Process a "dynamic" query whose results update with data changes
    var args = makeArray(arguments)
      , queryString = args.shift();
    return processQuery(this, queryString, args, true);
  }

  function query() {
    // Process a "snapshot" query with static results
    var args = makeArray(arguments)
      , queryString = args.shift();
    return processQuery(this, queryString, args, false);
  }

  // Debug and Testing Interface **********************************************

  function debug() {
    return {
      CurrentVersion: CurrentVersion,
      self: self,
      hasDefineProperty: hasDefineProperty,
      hasDefineSetter: hasDefineSetter,
      objeqParser: objeqParser,
      defineProperty1: defineProperty1,
      defineProperty2: defineProperty2,
      defineProperty: defineProperty,
      toString: toString,
      isArray: isArray,
      queue: queue,
      pending: pending,
      listeners: listeners,
      targets: targets,
      makeArray: makeArray,
      hasListeners: hasListeners,
      addListener: addListener,
      removeListener: removeListener,
      getCallbacks: getCallbacks,
      inNotifyListeners: inNotifyListeners,
      notifyListeners: notifyListeners,
      queueEvent: queueEvent,
      createAccessors: createAccessors,
      nextObjectId: nextObjectId,
      decorateObject: decorateObject,
      ArrayFuncs: ArrayFuncs,
      DecoratedArrayMixin: DecoratedArrayMixin,
      wrapArrayFunction: wrapArrayFunction,
      decorateArray: decorateArray,
      decorate: decorate,
      invalidated: invalidated,
      pendingRefresh: pendingRefresh,
      invalidateQuery: invalidateQuery,
      refreshQueries: refreshQueries,
      getPath: getPath,
      regexCache: regexCache,
      addQueryListeners: addQueryListeners,
      createEvaluator: createEvaluator,
      createComparator: createComparator,
      createSorter: createSorter,
      yynode: yynode,
      yypath: yypath,
      parserPool: parserPool,
      parseCache: parseCache,
      parse: parse,
      processQuery: processQuery,
      dynamic: dynamic,
      query: query,
      objeq: objeq
    };
  }

  // Exported Function ********************************************************

  function objeq() {
    // TODO: For testing and debugging only
    if ( arguments.length === 0 ) {
      return debug();
    }

    var source = isDecorated(this) ? this : decorateArray([])
      , args = makeArray(arguments);

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
  objeq.VERSION = CurrentVersion;

  // Node.js and CommonJS Exporting
  if ( typeof exports !== 'undefined' ) {
    if ( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = objeq;
    }
    exports.$objeq = objeq;
  }
  else {
    // Global Exporting
    self.$objeq = objeq;
  }
})();
