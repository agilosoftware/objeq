/*!
 * objeq (JavaScript Object Querying)
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thom Bradford (github/kode4food)
 * @author Stefano Rago (github/sterago)
 */

(function (self, require, module) {
  "use strict";

  var CURRENT_VERSION = "0.6.1";

  // Feature Checking *********************************************************

  var ObjeqParser = null;

  function createParser() {
    if ( ObjeqParser ) {
      return new ObjeqParser();
    }

    if ( self.$objeq && self.$objeq.parser ) {
      // will be the case when running in the Browser
      ObjeqParser = self.$objeq.parser.Parser;
    }
    else {
      // Otherwise, perhaps we're using node.js?
      if ( require && module && typeof window === 'undefined' ) {
        ObjeqParser = require('./objeq-parser').Parser;
      }
      else {
        throw new Error("objeq Parser not available!");
      }
    }

    return new ObjeqParser();
  }

  // we control usage, so these shims don't have to be proper

  var defineProperty = Object.defineProperty
    , isDynamicSupported = true;

  if ( !defineProperty && Object.prototype.__defineSetter__) {
    defineProperty = function _defineProperty(obj, prop, descriptor) {
      if ( descriptor.set ) {
        obj.__defineSetter__(prop, descriptor.set);
      }
      if ( descriptor.get ) {
        obj.__defineGetter__(prop, descriptor.get);
      }
      else if ( descriptor.value ) {
        var value = descriptor.value;
        obj.__defineGetter__(prop, function _getter() { return value; });
      }
    };
  }

  if ( !defineProperty ) {
    isDynamicSupported = false;
    console.log("Warning! Dynamic queries are not supported on this platform");

    // A limited stub, so at least value setting is supported
    defineProperty = function _defineProperty(obj, prop, descriptor) {
      if ( descriptor.set || descriptor.get ) {
        throw new Error("Property set/get not supported by your browser!");
      }
      else if ( descriptor.value ) {
        obj[prop] = descriptor.value;
      }
    };
  }

  var defineProperties = Object.defineProperties;
  if ( !defineProperties ) {
    defineProperties = function _defineProperties(obj, props) {
      for ( var key in props ) {
        var descriptor = props[key];
        defineProperty(obj, key, descriptor);
      }
    };
  }

  var isArray = Array.isArray;
  if ( !isArray ) {
    isArray = function _isArray(obj) {
      return obj && obj.length && toString.call(obj) === '[object Array]';
    };
  }

  var filter = Array.prototype.filter;
  if ( !filter ) {
    filter = function _filter(callback, self) {
      // 'this' is the Array being filtered
      var result = [];
      for ( var i = 0, ilen = this.length; i < ilen; i++ ) {
        var obj = this[i];
        if ( callback.call(self, obj, i, this) ) {
          result.push(obj);
        }
      }
      return result;
    };
  }

  var toString = Object.prototype.toString;
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;
  var push = Array.prototype.push;

  // Utility Functions ********************************************************

  function makeArray(arr) {
    return slice.call(arr, 0);
  }

  function mergeArrays(arr1, arr2) {
    var spliceArgs = [0, arr2.length].concat(arr2)
      , result = slice.call(arr1, 0);
    splice.apply(result, spliceArgs);
    return result;
  }

  function arraysAreEqual(arr1, arr2) {
    if ( arr1.length !== arr2.length ) {
      return false;
    }

    for ( var i = arr1.length; i--; ) {
      if ( arr1[i] !== arr2[i] ) {
        return false;
      }
    }

    return true;
  }

  function isDecorated(value) {
    return value.__objeq_id__ ? true : false;
  }

  function getObjectId(value) {
    return value && value.__objeq_id__ || null;
  }

  function getArrayContentKey(arr) {
    return getObjectId(arr) + '_content';
  }

  function getArrayLengthKey(arr) {
    return getObjectId(arr) + '_length';
  }

  // Extension Functions ******************************************************

  var ext = {
    // We only have one Extension by default, and that is sub-query support
    query: function _query(ctx) {
      var source = ctx.source;
      return source.query.apply(source, makeArray(arguments).slice(1));
    }
  };

  function registerExtension(name, func) {
    var hash = typeof name === 'object' ? name : {};
    if ( typeof name === 'string' && typeof func === 'function' ) {
      hash[name] = func;
    }
    for ( var key in hash ) {
      if ( !hash.hasOwnProperty(key) ) {
        continue;
      }

      var value = hash[key];
      if ( typeof key === 'string' && typeof value === 'function' ) {
        ext[key.toLowerCase()] = value;
      }
    }
  }

  function getExtension(name) {
    var func = ext[name.toLowerCase()];
    if ( typeof func === 'function' ) {
      return func;
    }
    throw new Error("Extension '" + name + "' does not exist!");
  }

  // Listener Implementation **************************************************

  var MAX_NOTIFY = 128           // to avoid locking up the browser in loops
    , queue = []                 // The queue of pending notifications
    , listeners = {}             // Property@Target -> Callbacks
    , inNotifyListeners = false; // to avoid recursion with notifyListeners

  function hasListeners(target, key) {
    return listeners['*@*'] ||
           listeners[key + '@*'] ||
           listeners[key + '@' + getObjectId(target)];
  }

  function addListener(target, key, callback) {
    var targetKey = getObjectId(target) || '*'
      , entryKey = key + '@' + targetKey
      , callbacks = listeners[entryKey] || ( listeners[entryKey] = [] );

    if ( callbacks.indexOf(callback) !== -1 ) {
      return;
    }

    // Add it to the callbacks
    callbacks.push(callback);
  }

  function removeListener(target, key, callback) {
    var targetKey = getObjectId(target) || '*'
      , entryKey = key + '@' + targetKey
      , callbacks = listeners[entryKey];

    if ( !callbacks ) {
      return;
    }

    var idx = callbacks.indexOf(callback);
    if ( idx === -1 ) {
      return;
    }

    // Remove it from the callbacks
    callbacks.splice(idx, 1);
  }
  
  function removeCallbacks(callbacksToRemove) {
    var i, removeKeys = [];
    for ( var key in listeners ) {
      var callbacks = listeners[key];
      for ( i = callbacks.length; i--; ) {
        var callback = callbacks[i];
        if ( callbacksToRemove.indexOf(callback) != -1 ) {
          callbacks.splice(i, 1);
        }
      }
      if ( !callbacks.length ) {
        removeKeys.push(key);
      }
    }
    for ( i = removeKeys.length; i--; ) {
      delete listeners[removeKeys[i]];
    }
  }

  var EmptyArray = [];

  function getCallbacks(target, key) {
    var targetKey = getObjectId(target)
      , callbacks = listeners[key + '@' + targetKey] || EmptyArray
      , pCallbacks = listeners[key + '@*'] || EmptyArray
      , aCallbacks = listeners['*@*'] || EmptyArray;

    return callbacks.concat(pCallbacks, aCallbacks);
  }

  function notifyListeners() {
    var count = 0;

    inNotifyListeners = true;
    try {
      for ( ; queue.length && count < MAX_NOTIFY; count++ ) {
        var currentQueue = queue;
        queue = [];

        for ( var i = 0, ilen = currentQueue.length; i < ilen; i++ ) {
          var event = currentQueue[i]
            , callbacks = getCallbacks(event.target, event.key);

          for ( var j = 0, jlen = callbacks.length; j < jlen; j++ ) {
            var callback = callbacks[j];
            callback.apply(callback, event.args);
          }
        }

        refreshQueries();
      }
    }
    finally {
      inNotifyListeners = false;
    }
    if ( count === MAX_NOTIFY ) {
      throw new Error("Too many notification cycles!");
    }
  }

  function queueEvent(target, key) {
    if ( !hasListeners(target, key) ) {
      return;
    }

    queue.push({ target: target, key: key, args: arguments });

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
      queueEvent(obj, key, value, prev);
    }

    function getter() {
      return state[key];
    }

    defineProperty(obj, key, {
      get: getter,
      set: setter,
      enumerable: true
    });
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
    defineProperty(obj, '__objeq_id__', {
      value: objectId
    });

    return obj;
  }

  // Array Decoration *********************************************************

  var ArrayFuncs = [
    { name: 'push', additive: true },
    { name: 'unshift', additive: true },
    { name: 'splice', additive: true },
    { name: 'pop', additive: false },
    { name: 'reverse', additive: false },
    { name: 'shift', additive: false },
    { name: 'sort', additive: false }
  ];

  function decorateArrayItems(arr) {
    for ( var i = arr.length; i--; ) {
      arr[i] = decorate(arr[i]);
    }
    return arr;
  }

  function decorateArray(arr, queryCallbacks) {
    var callbackMapping = []
      , containsCache = null
      , isMonitored = false;

    addDecoratorMethods();

    // Read-only Properties
    var objectId = 'a' + (nextObjectId++);
    defineProperty(arr, '__objeq_id__', {
      value: objectId
    });

    var arrayContentKey = getArrayContentKey(arr);
    var arrayLengthKey = getArrayLengthKey(arr);

    return arr;

    // Array Event Methods ****************************************************

    function addDecoratorMethods() {
      defineProperties(arr, {
        query: { value: query },  // for snapshot sub-queries
        detach: {
          value: function _detach() {
            if ( queryCallbacks ) {
              removeCallbacks(queryCallbacks);
            }
          }
        },
        contains: {
          configurable: true,
          value: function _contains(value) {
            return arr.indexOf(value) !== -1;
          }
        },
        item: {
          configurable: true,
          value: function _item(index, value) {
            if ( typeof value !== 'undefined' ) {
              arr[index] = value;
            }
            return arr[index];
          }
        },
        attr: {
          value: function _attr(key, value) {
            if ( typeof value !== 'undefined' ) {
              for ( var i = arr.length; i--; ) {
                var item = arr[i];
                if ( typeof item !== 'object' ) {
                  continue;
                }
                item[key] = value;
              }
            }

            var first = arr[0];
            return typeof first === 'object' ? first[key] : null;
          }
        },
        on: {
          value: function _on(events, callback) {
            // If the Array isn't already monitored, then we need to
            if ( !isMonitored ) {
              addMonitoredMethods();
            }

            var evt = events.split(/\s/);
            for ( var i = evt.length; i--; ) {
              var info = getArrayListenerInfo(evt[i]);
              if ( !info.target ) {
                callback = wrapCallback(callback);
              }
              addListener(info.target, info.key, callback);
            }
            return arr;
          }
        },
        off: {
          value: function _off(events, callback) {
            var evt = events.split(/\s/);
            for ( var i = evt.length; i--; ) {
              var info = getArrayListenerInfo(evt[i]);
              if ( !info.target ) {
                callback = wrapCallback(callback);
              }
              removeListener(info.target, info.key, callback);
            }
            return arr;
          }
        }
      });

      if ( isDynamicSupported ) {
        defineProperty(arr, "dynamic", { value: dynamic });
      }
    }

    // Array Event Methods ****************************************************

    function addMonitoredMethods() {
      isMonitored = true;
      decorateArrayItems(arr);

        for ( var i = ArrayFuncs.length; i--; ) {
        var arrayFunc = ArrayFuncs[i];
        monitorArrayFunc(arrayFunc.name, arrayFunc.additive);
      }

      defineProperties(arr, {
        contains: {
          value: function _monitoredContains(obj) {
            if ( !arguments.length ) {
              containsCache = null;
              return false;
            }

            if ( !containsCache ) {
              containsCache = {};
              for ( var i = arr.length; i--; ) {
                var item = arr[i], id = getObjectId(item) || item;
                containsCache[id] = true;
              }
            }
            
            return containsCache[getObjectId(obj) || obj];
          }
        },
        item: {
          value: function _monitoredItem(index, value) {
            if ( typeof value !== 'undefined' ) {
              var oldLen = arr.length;
              arr[index] = decorate(value);
              var newLen = arr.length;
              containsCache = null;

              queueEvent(arr, arrayContentKey, newLen);
              if ( newLen !== oldLen ) {
                queueEvent(arr, arrayLengthKey, newLen, oldLen);
              }
            }
            return arr[index];
          }
        }
      });

    }

    function monitorArrayFunc(name, additive) {
      var oldFunction = arr[name];

      defineProperty(arr, name, {
        value: function _wrapped() {
          var oldLen = arr.length
            , result = oldFunction.apply(arr, arguments)
            , newLen = arr.length;

          if ( additive ) {
            decorateArrayItems(arr);
            containsCache = null;
          }

          queueEvent(arr, arrayContentKey, newLen);
          if ( newLen !== oldLen ) {
            queueEvent(arr, arrayLengthKey, newLen, oldLen);
          }

          return result;
        }
      });
    }

    function getArrayListenerInfo(name) {
      switch( name ) {
        case '.content': return { target: arr, key: arrayContentKey };
        case '.length': return { target: arr, key: arrayLengthKey };
        default: return { target: null, key: name };
      }
    }

    function wrapCallback(callback) {
      // If it's already wrapped, return the wrapper
      for ( var i = callbackMapping.length; i--; ) {
        var item = callbackMapping[i];
        if ( item.callback === callback ) {
          return item.wrapped;
        }
      }

      // Otherwise create the wrapper
      var wrapped = function _wrappedCallback(target, key, value, prev) {
        arr.contains(target) && callback(target, key, value, prev);
      };
      callbackMapping.push({ callback: callback, wrapped: wrapped });
      return wrapped;
    }
  }

  function decorate(value) {
    if ( value === null || value === undefined || isDecorated(value) ) {
      return value;
    }

    if ( isArray(value) ) {
      return decorateArray(value);
    }
    else if ( typeof value === 'object' && isDynamicSupported ) {
      return decorateObject(value);
    }

    return value;
  }

  // 'Compilation' Functions **************************************************

  function arrayEvalTemplate(items) {
    var template = [];
    for ( var i = 0, ilen = items.length; i < ilen; i++ ) {
      var item = items[i], isNode = isArray(item) && item.isNode;
      template.push(isNode ? createEvaluator(item) : item);
    }
    return template;
  }

  function evalPath(evalRoot, pathComponents) {
    var path = arrayEvalTemplate(pathComponents);
    return function _path(ctx, obj) {
      var value = evalRoot(ctx, obj);
      for ( var i = 0, ilen = path.length; i < ilen; i++ ) {
        // If we're drilling in, resolve the first Item
        if ( isArray(value) ) {
          if ( value.length === 0 ) {
            return null;
          }
          value = value[0];
        }
        if ( value === null || value === undefined ) {
          return value;
        }

        var comp = path[i];
        value =  value[typeof comp === 'function' ? comp(ctx, obj) : comp];
      }
      return value;
    };
  }

  function evalArgPath(index, pathComponents) {
    return evalPath(evalArgPathRoot, pathComponents);

    function evalArgPathRoot(ctx /* , obj */) {
      return ctx.params[index];
    }
  }

  function evalLocalPath(pathComponents) {
    return evalPath(evalLocalPathRoot, pathComponents);

    function evalLocalPathRoot(ctx, obj) {
      return obj;
    }
  }

  function createEvaluator(node) {
    if ( !isArray(node) || !node.isNode ) {
      return node;
    }

    // Resolving Operators
    var op = node[0];
    switch ( op ) {
      case 'path':
        var index = node[1];
        if ( typeof index !== 'number' ) {
          return evalLocalPath(node.slice(1));
        }
        return evalArgPath(index, node.slice(2));

      case 'obj':
        return evalObj(objectEvalTemplate(node[1]));

      case 'arr':
        return evalArr(arrayEvalTemplate(node[1]));

      case 'func':
        var func = getExtension(node[1]);
        return evalFunc(func, arrayEvalTemplate(node[2]));
    }

    // Unary Operators
    var n1 = createEvaluator(node[1]), n1Eval, n1Lit;
    typeof n1 === 'function' ? n1Eval = n1 : n1Lit = n1;

    switch ( op ) {
      case 'not': return evalNOT();
      case 'neg': return evalNEG();
    }

    // Binary Operators
    var n2 = createEvaluator(node[2]), n2Eval, n2Lit;
    typeof n2 === 'function' ? n2Eval = n2 : n2Lit = n2;

    switch ( op ) {
      case 'and': return evalAND();
      case 'or':  return evalOR();
      case 'add': return evalADD();
      case 'sub': return evalSUB();
      case 'mul': return evalMUL();
      case 'div': return evalDIV();
      case 'mod': return evalMOD();
      case 'eq':  return evalEQ();
      case 'neq': return evalNEQ();
      case 'gt':  return evalGT();
      case 'gte': return evalGTE();
      case 'lt':  return evalLT();
      case 'lte': return evalLTE();
      case 'in':  return evalIN();
      case 're':  return evalRE();
    }

    // Ternary Operator
    if ( op === 'tern' ) {
      var n3 = createEvaluator(node[3]), n3Eval, n3Lit;
      typeof n3 === 'function' ? n3Eval = n3 : n3Lit = n3;
      return evalTern();
    }

    // Should hopefully never happen
    throw new Error("Invalid parser node: " + op);

    // Evaluator Generation ***************************************************

    function objectEvalTemplate(hash) {
      var template = {};
      for ( var key in hash ) {
        var item = hash[key], isNode = isArray(item) && item.isNode;
        template[key] = isNode ? createEvaluator(item) : item;
      }
      return template;
    }

    function evalObj(template) {
      return function _obj(ctx, obj) {
        var result = {};
        for ( var key in template ) {
          var item = template[key];
          result[key] = typeof item === 'function' ? item(ctx, obj) : item;
        }
        return result;
      };
    }

    function evalArr(template) {
      return function _arr(ctx, obj) {
        var result = [];
        for ( var i = 0, ilen = template.length; i < ilen; i++ ) {
          var item = template[i];
          result.push(typeof item === 'function' ? item(ctx, obj) : item);
        }
        return result;
      };
    }

    function evalFunc(func, template) {
      return function _func(ctx, obj) {
        var funcArgs = [];
        for ( var i = 0, ilen = template.length; i < ilen; i++ ) {
          var item = template[i];
          funcArgs.push(typeof item === 'function' ? item(ctx, obj) : item);
        }
        return func.apply(obj, [ctx].concat(funcArgs));
      };
    }

    function evalNOT() {
      if ( !n1Eval ) {
        return !n1Lit;
      }
      return function _not(ctx, obj) {
        return !n1Eval(ctx, obj);
      };
    }

    function evalNEG() {
      if ( !n1Eval ) {
        return -n1Lit;
      }
      return function _neg(ctx, obj) {
        return -n1Eval(ctx, obj);
      };
    }

    function evalAND() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit && n2Lit;
      }
      return function _and(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit;
        return !lval ? lval : (n2Eval ? n2Eval(ctx, obj) : n2Lit);
      };
    }

    function evalOR() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit || n2Lit;
      }
      return function _or(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit;
        return lval ? lval : (n2Eval ? n2Eval(ctx, obj) : n2Lit);
      };
    }

    function evalADD() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit + n2Lit;
      }
      return function _add(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval + rval;
      };
    }

    function evalSUB() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit - n2Lit;
      }
      return function _sub(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval - rval;
      };
    }

    function evalMUL() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit * n2Lit;
      }
      return function _mul(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval * rval;
      };
    }

    function evalDIV() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit / n2Lit;
      }
      return function _div(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval / rval;
      };
    }

    function evalMOD() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit % n2Lit;
      }
      return function _mod(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval % rval;
      };
    }

    function evalEQ() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit == n2Lit;
      }
      return function _eq(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval == rval;
      };
    }

    function evalNEQ() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit != n2Lit;
      }
      return function _neq(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval != rval;
      };
    }

    function evalGT() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit > n2Lit;
      }
      return function _gt(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval > rval;
      };
    }

    function evalGTE() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit >= n2Lit;
      }
      return function _gte(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval >= rval;
      };
    }

    function evalLT() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit < n2Lit;
      }
      return function _lt(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval < rval;
      };
    }

    function evalLTE() {
      if ( !n1Eval && !n2Eval ) {
        return n1Lit <= n2Lit;
      }
      return function _lte(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        return lval <= rval;
      };
    }

    function evalIN() {
      function _in(ctx, obj) {
        var rval = n2Eval ? n2Eval(ctx, obj) : n2Lit;
        if ( isArray(rval) ) {
          return rval.indexOf(n1Eval ? n1Eval(ctx, obj) : n1Lit) !== -1;
        }
        else if ( typeof rval === 'object' ) {
          return (n1Eval ? n1Eval(ctx, obj) : n1Lit) in rval;
        }
        else if ( rval !== null && rval !== undefined ) {
          return (n1Eval ? n1Eval(ctx, obj) : n1Lit) == rval;
        }
        return false;
      }

      return n1Eval || n2Eval ? _in : _in();
    }

    function evalRE() {
      var regexCache = {};
      
      function _re(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , rval = n2Eval ? n2Eval(ctx, obj) : n2Lit
          , re, key;
        
        if ( typeof lval !== 'string' && !isArray(lval) ) {
          return false;
        }
        
        if ( typeof lval === 'string' ) {
          lval = [lval];
        }

        key = lval.join('/');
        re = regexCache[key] || (regexCache[key] = RegExp.apply(null, lval));
        return re.test(rval);
      }

      return n1Eval || n2Eval ? _re : _re();
    }

    function evalTern() {
      function _tern(ctx, obj) {
        var cval = n1Eval ? n1Eval(ctx, obj) : n1Lit
          , tval = n2Eval ? n2Eval(ctx, obj) : n2Lit
          , fval = n3Eval ? n3Eval(ctx, obj) : n3Lit;
        return cval ? tval : fval;
      }

      return n1Eval || n2Eval || n3Eval ? _tern : _tern();
    }
  }

  function wrapExpression(node) {
    var result = createEvaluator(node);
    if ( typeof result !== 'function' ) {
      return function _evalWrapper() {
        return result;
      };
    }
    return result;
  }

  function createSelector(select) {
    var evalSelect = wrapExpression(select[1])
      , temp = [];

    switch ( select[0] ) {
      case 'select':
        return function _select(ctx, obj) {
          temp[0] = evalSelect(ctx, obj);
          return temp;
        };

      case 'contract':
        return function _contract(ctx, obj) {
          var result = evalSelect(ctx, obj);
          if ( isArray(result) ) {
            if ( result.length ) {
              temp[0] = result[0];
              return temp;
            }
          }
          else if ( result !== null && result !== undefined ) {
            temp[0] = result;
            return temp;
          }
          return EmptyArray;
        };

      case 'expand':
        return function _expand(ctx, obj) {
          var result = evalSelect(ctx, obj);
          if ( isArray(result) ) {
            return result;
          }
          else if ( result !== null && result !== undefined ) {
            temp[0] = result;
            return temp;
          }
          return EmptyArray;
        };

      default:
        throw new Error("Invalid selector node: " + select[0]);
    }
  }

  function createSorter(order) {
    var getPaths = [];
    for ( var i = 0, ilen = order.length; i < ilen; i++ ) {
      var item = order[i];
      getPaths.push(evalLocalPath(item.path.slice(1)));
    }

    return function _sorter(ctx, arr) {
      var comparators = [];
      for ( var i = 0, ilen = order.length; i < ilen; i++ ) {
        var item = order[i];
        comparators.push(createComparator(getPaths[i], item.ascending));
      }

      arr.sort(sortFunction);

      function sortFunction(item1, item2) {
        for ( var i = 0, ilen = comparators.length; i < ilen; i++ ) {
          var result = comparators[i](item1, item2);
          if ( result !== 0 ) {
            return result;
          }
        }
        return 0;
      }

      function createComparator(getPath, ascending) {
        if ( ascending ) {
          return function _ascendingComparator(item1, item2) {
            var val1 = getPath(ctx, item1)
              , val2 = getPath(ctx, item2);
            return val1 == val2 ? 0 : val1 > val2 ? 1 : -1;
          };
        }
        else {
          return function _descendingComparator(item1, item2) {
            var val1 = getPath(ctx, item1)
              , val2 = getPath(ctx, item2);
            return val1 == val2 ? 0 : val1 < val2 ? 1 : -1;
          };
        }
      }
    };
  }

  function createAggregator(aggregate) {
    var extensions = [];
    for ( var i = 0, ilen = aggregate.length; i < ilen; i++ ) {
      extensions.push(getExtension(aggregate[i]));
    }

    var temp = [];
    return function _aggregator(ctx, arr) {
      var result = arr, args = [ctx, result];
      for ( var i = 0, ilen = extensions.length; i < ilen; i++ ) {
        args[1] = result = extensions[i].apply(arr, args);
      }
      if ( isArray(result) ) {
        return result;
      }
      else if ( result !== null && result !== undefined ) {
        temp[0] = result;
        return temp;
      }
      return EmptyArray;
    };
  }

  // Parsing Functions ********************************************************

  function yynode() {
    var result = makeArray(arguments);
    result.isNode = true;
    return result;
  }

  function yypath() {
    // 'this' is the Parser's YY object
    var result = ['path'].concat(makeArray(arguments));

    result.isNode = true;
    var paths = this.paths[this.step];
    if ( !paths ) {
      paths = this.paths[this.step] = [];
    }
    paths.push(result);
    return result;
  }

  var parserPool = [];

  function parse(queryString) {
    // Get a Parser from the pool, if possible
    var parser = parserPool.pop() || createParser();
    var paths = [];
    parser.yy = { node: yynode, path: yypath, paths: paths, step: 0 };

    // Parse the Query, include paths and evaluators in the result
    var steps = parser.parse(queryString)
      , result = [];

    for ( var i = 0, ilen = steps.length; i < ilen; i++ ) {
      var step = steps[i];

      result.push({
        evaluator: step.expr && wrapExpression(step.expr),
        selector: step.select && createSelector(step.select),
        sorter: step.order && createSorter(step.order),
        sortFirst: step.sortFirst,
        aggregator: step.aggregate && createAggregator(step.aggregate),
        paths: paths[i]
      });
    }

    // Push the Parser back onto the pool and return the result
    parserPool.push(parser);
    return result;
  }

  // Query Processing Functions ***********************************************

  // Invalidated Queries are marked and processed after notifyListeners
  var invalidated = {}
    , pendingRefresh = {};

  function invalidateQuery(results, refreshFunction) {
    var targetKey = getObjectId(results);
    if ( !pendingRefresh[targetKey] ) {
      invalidated[targetKey] = refreshFunction;
    }
  }

  function refreshQueries() {
    pendingRefresh = invalidated;
    invalidated = {};
    for ( var key in pendingRefresh ) {
      var refreshFunc = pendingRefresh[key];
      delete pendingRefresh[key];
      refreshFunc();
    }
  }

  function addQueryListeners(ctx, paths, invalidateQuery, invalidateResults) {
    for ( var i = paths.length; i--; ) {
      var node = paths[i]
        , index = node[1]
        , target, start, callback;

      if ( typeof index === 'number' ) {
        target = ctx.params[index]; start = 2; callback = invalidateQuery;
      }
      else {
        target = null; start = 1; callback = invalidateResults;
      }

      for ( var j = start, jlen = node.length; j < jlen; j++ ) {
        addListener(target, node[j], callback);
      }
    }
  }

  function processQuery(source, steps, params, callback, dynamic) {
    var results = source
      , ctx = {};

    defineProperties(ctx, {
      source: { value: source },
      params: { value: params }
    });

    for ( var i = 0, ilen = steps.length; i < ilen; i++ ) {
      results = processStep(ctx, results, steps[i], dynamic);
    }

    if ( callback ) {
      var arrayContentKey = getArrayContentKey(results);
      addListener(results, arrayContentKey, callback);
      queueEvent(results, arrayContentKey, results.length);
    }

    return results;
  }

  function processStep(ctx, source, step, dynamic) {
    var evaluator = step.evaluator
      , selector = step.selector
      , sorter = step.sorter
      , sortFirst = step.sortFirst
      , aggregator = step.aggregator
      , paths = step.paths
      , cleanupInfo = [setListener, itemListener]
      , results = decorateArray([], cleanupInfo);

    var refreshSet, refreshItem;
    if ( dynamic ) {
      refreshSet = refreshDynamicSet;
      refreshItem = refreshDynamicItem;
      source.on('.content', setListener);
      addQueryListeners(ctx, paths, setListener, itemListener);
    }
    else {
      refreshSet = refreshItem = evalResults;
    }

    refreshSet();
    return results;

    // Result Refresh Functions ***********************************************

    // NOTE: This is completely *unoptimized* - The initial goal was
    // functionality rather than performance

    function evalResults() {
      var evaluated, selected, aggregated;
      results.length = 0;

      // Evaluation Step
      if ( evaluator ) {
        // In this case, we need to sort between filtering and selecting
        evaluated = filter.call(source, evalObject);
      }
      else {
        // Otherwise take a snapshot of the source
        evaluated = slice.call(source, 0);
      }

      // Pre-Select Sorting Step
      if ( sorter && sortFirst ) sorter(ctx, evaluated);

      // Select Step
      if ( selector ) {
        selected = [];
        for ( var i = 0, ilen = evaluated.length; i < ilen; i++ ) {
          spliceArrayItems(selected, selector(ctx, evaluated[i]));
        }
      }
      else {
        selected = evaluated;
      }

      // Post-Select Sorting Step
      if ( sorter && !sortFirst ) sorter(ctx, selected);

      // Aggregation Step
      aggregated = aggregator ? aggregator(ctx, selected) : selected;

      // Splice Results
      spliceArrayItems(results, aggregated);

      if ( results.contains ) {
        // Calling with no arguments clears its cache
        results.contains();
      }
    }

    function evalObject(obj) {
      return evaluator(ctx, obj);
    }

    function spliceArrayItems(arr, items) {
      var spliceArgs = [arr.length, 0].concat(items);
      // Don't use splice() from arr, as it may be a decorated version
      splice.apply(arr, spliceArgs);
    }

    function setListener(/* target, key, value, prev */) {
      invalidateQuery(results, refreshSet);
    }

    function itemListener(/* target, key, value, prev */) {
      invalidateQuery(results, refreshItem);
    }

    function refreshDynamicSet() {
      var oldResults = slice.call(results, 0);
      evalResults();
      if ( arraysAreEqual(oldResults, results) ) {
        return;
      }
      queueEvent(results, getArrayContentKey(results), results.length);
    }

    function refreshDynamicItem() {
      evalResults();
      queueEvent(results, getArrayContentKey(results), results.length);
    }
  }

  function processArguments(args, compiled) {
    var i = 0, ilen = args.length, result = { params: [] }
      , isFirstItemArray = isArray(args[0]);

    if ( isFirstItemArray ) {
      result.source = decorate(args[i++]);
    }
    else if ( compiled ) {
      throw new Error("No source Array passed to query");
    }

    if ( !compiled && typeof args[i] === 'string' ) {
      result.queryString = args[i++];
    }

    while ( i < ilen ) {
      var item = args[i++];
      if ( typeof item === 'function' ) {
        result.callback = item;
        return result;
      }
      result.params.push(item);
    }

    return result;
  }

  function compile(processed) {
    var queryString = processed.queryString
      , steps = parse(queryString);

    defineProperty(compiledQuery, "query", { value: compiledQuery });
    if ( isDynamicSupported ) {
      defineProperty(compiledQuery, "dynamic", { value: compiledDynamicQuery });
    }

    return compiledQuery;

    function compiledQuery() {
      var result = processArguments(makeArray(arguments), true)
        , params = mergeArrays(processed.params, result.params)
        , callback = result.callback ||  processed.callback;
      decorateArrayItems(params);
      return processQuery(result.source, steps,  params, callback, false);
    }

    function compiledDynamicQuery() {
      var result = processArguments(makeArray(arguments), true)
        , params = mergeArrays(processed.params, result.params)
        , callback = result.callback ||  processed.callback;
      return processQuery(result.source, steps,  params, callback, true);
    }
  }

  function dynamic() {
    // 'this' will be the Decorated Array that called us
    var args = [this].concat(makeArray(arguments))
      , result = processArguments(args)
      , steps = parse(result.queryString)
      , params = decorateArrayItems(result.params);
    return processQuery(result.source, steps, params, result.callback, true);
  }

  function query() {
    // 'this' will be the Decorated Array that called us
    var args = [this].concat(makeArray(arguments))
      , result = processArguments(args)
      , steps = parse(result.queryString);
    return processQuery(result.source, steps, result.params, result.callback);
  }

  // Exported Function ********************************************************

  function objeq() {
    // Fast Path for creating a new Array
    if ( !arguments.length ) {
      return decorateArray([]);
    }

    // Fast Path for decorating an existing Array or Object
    if ( arguments.length === 1 && typeof arguments[0] === 'object' ) {
      var arg0 = arguments[0];
      return isArray(arg0) ? decorate(arg0) : decorateArray([arg0]);
    }

    var processed = processArguments(makeArray(arguments))
      , source = processed.source;

    if ( processed.queryString ) {
      var compiled = compile(processed);
      return source ? compiled(source) : compiled;
    }

    return source;
  }

  defineProperties(objeq, {
    VERSION: { value: CURRENT_VERSION },
    registerExtension: { value: registerExtension }
  });

  // Node.js and CommonJS Exporting
  if ( module && module.exports ) {
    module.exports = objeq.objeq = objeq;
  }
  else {
    // Global Exporting
    if ( self.$objeq && self.$objeq.parser ) {
      // If the Parser has already been defined, pull it in
      objeq.parser = self.$objeq.parser;
    }
    self.$objeq = objeq;
  }
})(this,
   typeof require === 'function' ? require : null,
   typeof module === 'object' ? module : null);
