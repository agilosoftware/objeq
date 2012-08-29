/*!
 * objeq (JavaScript Object Querying)
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thom Bradford (github/bradford653)
 * @author Stefano Rago (github/sterago)
 */

(function (self) {
  "use strict";

  var CURRENT_VERSION = "0.3.0";

  // Feature Checking *********************************************************

  var ObjeqParser = null;

  function createParser() {
    if ( ObjeqParser ) {
      return new ObjeqParser();
    }

    if ( self.$objeq && self.$objeq.parser ) {
      // This will be the case when running in the Browser
      ObjeqParser = self.$objeq.parser.Parser;
    }
    else {
      // Otherwise, perhaps we're using node.js?
      if ( typeof require === 'function' ) {
        ObjeqParser = require('./objeq-parser').Parser;
      }
      else {
        throw new Error("objeq Parser not available!");
      }
    }

    return new ObjeqParser();
  }

  // we control usage, so these shims don't have to be proper

  var defineProperty = Object.defineProperty;
  if ( !defineProperty ) {
    if ( !Object.prototype.__defineSetter__) {
      throw new Error("Property Definitions not available!");
    }

    defineProperty = function _defineProperty(obj, prop, descriptor) {
      obj.__defineGetter__(prop, descriptor.get);
      if ( descriptor.set ) {
        obj.__defineSetter__(prop, descriptor.set);
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
      return obj != null && toString.call(obj) === '[object Array]';
    };
  }

  var toString = Object.prototype.toString;

  // Utility Functions ********************************************************

  function makeArray(arr) {
    return Array.prototype.slice.call(arr, 0);
  }

  function arraysAreEqual(arr1, arr2) {
    if ( arr1.length !== arr2.length ) {
      return false;
    }

    for ( var i = 0, ilen = arr1.length; i < ilen; i++ ) {
      if ( arr1[i] !== arr2[i] ) {
        return false;
      }
    }

    return true;
  }

  // we control usage, so we don't need to check for hasOwnProperty
  function mixin(obj) {
    for ( var i = 1, ilen = arguments.length; i < ilen; i++ ) {
      var hash = arguments[i];
      for ( var key in hash ) {
        obj[key] = hash[key];
      }
    }
  }

  function isMonitored(value) {
    return value.__objeq_mon__;
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
    // We only have one Extension by default, and that is sub-select support
    select: function _select(ctx) {
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
    if ( !func || typeof func !== 'function' ) {
      throw new Error("Extension '" + name + "' does not exist!");
    }
    return func;
  }

  // Listener Implementation **************************************************

  var MAX_NOTIFY = 128           // to avoid locking up the browser in loops
    , queue = []                 // The queue of pending notifications
    , listeners = {}             // Property@Target -> Callbacks
    , targets = {}               // Reverse Lookup: Target -> Property@Target
    , inNotifyListeners = false; // to avoid recursion with notifyListeners

  function hasListeners(target, key) {
    return listeners['*@*']
        || listeners[key + '@*']
        || listeners[key + '@' + getObjectId(target)];
  }

  function addListener(target, key, callback) {
    var tkey = getObjectId(target) || '*'
      , entryKey = key + '@' + tkey
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
      , entryKey = key + '@' + tkey
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
    var tkey = getObjectId(target)
      , callbacks = listeners[key + '@' + tkey] || EmptyArray
      , pCallbacks = listeners[key + '@*'] || EmptyArray
      , aCallbacks = listeners['*@*'] || EmptyArray;

    return callbacks.concat(pCallbacks, aCallbacks);
  }

  function notifyListeners() {
    inNotifyListeners = true;
    try {
      for ( var count = 0; queue.length && count < MAX_NOTIFY; count++ ) {
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
      enumerable: true,
      configurable: true
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
      get: function () { return objectId; }
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
    { name: 'order', additive: false }
  ];

  var DecoratedArrayMixin = {
    dynamic: dynamic, // for dynamic sub-queries
    query: query,     // for snapshot queries

    item: function _item(index, value) {
      if ( typeof value !== 'undefined' ) {
        this[index] = value;
      }
      return this[index];
    },

    attr: function _attr(key, value) {
      if ( typeof value !== 'undefined' ) {
        for ( var i = 0, ilen = this.length; i < ilen; i++ ) {
          var item = this[i];
          if ( typeof item !== 'object' ) {
            continue;
          }
          item[key] = value;
        }
      }

      var first = this[0];
      return typeof first === 'object' ? first[key] : null;
    }
  };

  function decorateArray(arr) {
    var callbackMapping = [];

    mixin(arr, DecoratedArrayMixin);
    addEventMethods();

    // Read-only Properties
    var objectId = 'a' + (nextObjectId++);
    defineProperty(arr, '__objeq_id__', {
      get: function () { return objectId; }
    });

    var arrayContentKey = getArrayContentKey(arr);
    var arrayLengthKey = getArrayLengthKey(arr);

    return arr;

    // Array Event Methods ****************************************************

    function addEventMethods() {
      arr.on = function _on(events, callback) {
        // If the Array isn't already monitored, then we need to
        if ( !isMonitored(arr) ) {
          monitorArray();
        }

        var evt = events.split(/\s/);
        for ( var i = 0, ilen = evt.length; i < ilen; i++ ) {
          var info = getArrayListenerInfo(evt[i]);
          if ( !info.target ) {
            callback = wrapCallback(callback);
          }
          addListener(info.target, info.key, callback);
        }
        return arr;
      };

      arr.off = function _off(events, callback) {
        var evt = events.split(/\s/);
        for ( var i = 0, ilen = evt.length; i < ilen; i++ ) {
          var info = getArrayListenerInfo(evt[i]);
          if ( !info.target ) {
            callback = wrapCallback(callback);
          }
          removeListener(info.target, info.key, callback);
        }
        return arr;
      };
    }

    function monitorArray() {
      for ( var i = 0, ilen = arr.length; i < ilen; i++ ) {
        arr[i] = decorate(arr[i]);
      }

      for ( i = 0, ilen = ArrayFuncs.length; i < ilen; i++ ) {
        var arrayFunc = ArrayFuncs[i];
        monitorArrayFunc(arrayFunc.name, arrayFunc.additive);
      }

      arr.item =  function _monitoredItem(index, value) {
        if ( typeof value !== 'undefined' ) {
          var oldLen = arr.length;
          arr[index] = decorate(value);
          var newLen = arr.length;
          queueEvent(arr, arrayContentKey, newLen);
          if ( newLen != oldLen ) {
            queueEvent(arr, arrayLengthKey, newLen, oldLen);
          }
        }
        return arr[index];
      };

      defineProperty(arr, '__objeq_mon__', {
        get: function() { return true; }
      });
    }

    function monitorArrayFunc(name, additive) {
      var oldFunc = arr[name];
      if ( !oldFunc ) {
        throw new Error("Missing Array function: " + name);
      }

      arr[name] = function _wrapped() {
        var oldLen = arr.length;
        oldFunc.apply(arr, arguments);
        var newLen = arr.length;
        if ( additive ) {
          for ( var i = 0, ilen = arr.length; i < ilen; i++ ) {
            arr[i] = decorate(arr[i]);
          }
        }
        queueEvent(arr, arrayContentKey, newLen);
        if ( newLen != oldLen ) {
          queueEvent(arr, arrayLengthKey, newLen, oldLen);
        }
      };
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
      for ( var i = 0, ilen = callbackMapping.length; i < ilen; i++ ) {
        var item = callbackMapping[i];
        if ( item.callback === callback ) {
          return item.wrapped;
        }
      }

      // Otherwise create the wrapper
      var wrapped = function _wrappedCallback(target, key, value, prev) {
        // TODO: Use a hash lookup instead of an Array scan
        arr.indexOf(target) !== -1 && callback(target, key, value, prev);
      };
      callbackMapping.push({ callback: callback, wrapped: wrapped });
      return wrapped;
    }
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

  // 'Compilation' Functions **************************************************

  var regexCache = {};

  function arrayEvalTemplate(items) {
    var template = [];
    for ( var i = 0, ilen = items.length; i < ilen; i++ ) {
      var item = items[i], isNode = isArray(item) && item.isNode;
      template[i] = isNode ? createEvaluator(item) : item;
    }
    return template;
  }

  function evalPath(evalRoot, pathComponents) {
    var path = arrayEvalTemplate(pathComponents);
    return function _path(ctx, obj) {
      var value = evalRoot(ctx, obj);
      for ( var i = 0, ilen = path.length; i < ilen; i++ ) {
        // If we're drilling in, resolve the first Item
        if ( isArray(value) && isDecorated(value) ) {
          if ( value.length === 0 ) {
            return null;
          }
          value = value[0];
        }
        if ( value == null ) {
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

    function evalArgPathRoot(ctx, obj) {
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
        var index = node[1], isNumber = typeof index === 'number';
        if ( !isNumber ) {
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

    // This should hopefully never happen
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
          result[i] = typeof item === 'function' ? item(ctx, obj) : item;
        }
        return result;
      };
    }

    function evalFunc(func, template) {
      return function _func(ctx, obj) {
        var funcArgs = [];
        for ( var i = 0, ilen = template.length; i < ilen; i++ ) {
          var item = template[i];
          funcArgs[i] = typeof item === 'function' ? item(ctx, obj) : item;
        }
        return func.apply(obj, [ctx].concat(funcArgs));
      }
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
        else if ( rval != null ) {
          return (n1Eval ? n1Eval(ctx, obj) : n1Lit) == rval;
        }
        return false
      }

      return n1Eval || n2Eval ? _in : _in();
    }

    function evalRE() {
      function _re(ctx, obj) {
        var lval = n1Eval ? n1Eval(ctx, obj) : n1Lit;
        if ( typeof lval !== 'string' ) {
          return false;
        }
        var rval = n2Eval ? n2Eval(ctx, obj) : n2Lit
          , re = regexCache[lval] || (regexCache[lval] = new RegExp(lval));
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
          else if ( result != null ) {
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
          else if ( result != null ) {
            temp[0] = result;
            return temp;
          }
          return EmptyArray;
        };
    }
  }

  function createSorter(order) {
    var chain = [];
    for ( var i = 0, ilen = order.length; i < ilen; i++ ) {
      var item = order[i];
      chain.push(createComparator(item.path.slice(1), item.ascending));
    }

    return function _sorter(arr) {
      arr.sort(sortFunction);
    };

    function sortFunction(item1, item2) {
      for ( var i = 0, ilen = chain.length; i < ilen; i++ ) {
        var result = chain[i](item1, item2);
        if ( result !== 0 ) {
          return result;
        }
      }
      return 0;
    };

    function createComparator(path, ascending) {
      var getPath = evalLocalPath(path)
        , ctx = { source: [], params: [] };

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
  }

  function createAggregator(aggregate) {
    var chain = [];
    for ( var i = 0, ilen = aggregate.length; i < ilen; i++ ) {
      var aggregateStep = aggregate[i];
      chain.push(getExtension(aggregateStep));
    }

    var temp = [];
    return function _aggregator(ctx, obj) {
      var result = obj;
      for ( var i = 0, ilen = chain.length; i < ilen; i++ ) {
        result = chain[i](ctx, result);
      }
      if ( isArray(result) ) {
        return result;
      }
      else if ( result != null ) {
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

  function yystep(index) {
    this.step = index;
  }

  function yypath() {
    var args = makeArray(arguments)
      , result = ['path'].concat(args);

    result.isNode = true;
    var paths = this.paths[this.step];
    if ( !paths ) {
      paths = this.paths[this.step] = [];
    }
    paths.push(result);
    return result;
  }

  var parserPool = []
    , parseCache = {};

  function parse(queryString) {
    var result = parseCache[queryString];
    if ( result ) {
      return result;
    }

    // Get a Parser from the pool, if possible
    var parser = parserPool.pop() || createParser();
    var paths = [];
    parser.yy = { node: yynode, path: yypath, paths: paths, step: 0 };

    // Parse the Query, include paths and evaluators in the result
    var steps = parser.parse(queryString);
    result = parseCache[queryString] = [];

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
    var tkey = getObjectId(results);
    if ( !pendingRefresh[tkey] ) {
      invalidated[tkey] = refreshFunction;
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
    for ( var i = 0, ilen = paths.length; i < ilen; i++ ) {
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

  function processQuery(source, queryString, params, callback, dynamic) {
    var steps = parse(queryString)
      , results = source
      , ctx = {};

    defineProperties(ctx, {
      source: {
        get: function () { return source; }
      },
      params: {
        get: function () { return params; }
      }
    });

    for ( var i = 0, ilen = steps.length; i < ilen; i++ ) {
      results = processStep(ctx, results, steps[i], params, dynamic);
    }

    if ( callback ) {
      addListener(results, getArrayContentKey(results), callback);
      queueEvent(results, getArrayContentKey(results), results.length);
    }

    return results;
  }

  function processStep(ctx, source, step, params, dynamic) {
    var evaluator = step.evaluator
      , selector = step.selector
      , sorter = step.sorter
      , sortFirst = step.sortFirst
      , aggregator = step.aggregator
      , paths = step.paths
      , results = decorateArray([]);

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

    function evalResults() {
      var evaluated, selected, aggregated;
      results.length = 0;

      // Evaluation Step
      if ( evaluator ) {
        // In this case, we need to sort between filtering and selecting
        evaluated = [];
        for ( var i = 0, j = 0, ilen = source.length; i < ilen; i++ ) {
          var obj = source[i];
          if ( evaluator(ctx, obj) ) {
            evaluated[j++] = obj;
          }
        }
      }
      else {
        // Take a snapshot of the source
        evaluated = source.slice(0);
      }

      // Pre-Select Sorting Step
      if ( sorter && sortFirst ) sorter(evaluated);

      // Select Step
      if ( selector ) {
        var selected = [];
        for ( var i = 0, ilen = evaluated.length; i < ilen; i++ ) {
          spliceArrayItems(selected, selector(ctx, evaluated[i]));
        }
      }
      else {
        selected = evaluated;
      }

      // Post-Select Sorting Step
      if ( sorter && !sortFirst ) sorter(selected);

      // Aggregation Step
      aggregated = aggregator ? aggregator(ctx, selected) : selected;

      // Splice Results
      spliceArrayItems(results, aggregated);
    }

    function spliceArrayItems(arr, items) {
      var args = [arr.length, 0].concat(items);
      // Don't use splice() from arr, as it may be a decorated version
      args.splice.apply(arr, args);
    }

    function setListener(target, key, value, prev) {
      invalidateQuery(results, refreshSet);
    }

    function itemListener(target, key, value, prev) {
      invalidateQuery(results, refreshItem);
    }

    function refreshDynamicSet() {
      var oldResults = results.slice(0);
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

  function processArguments() {
    var params = []
      , result = { queryString: arguments[0], params: params };

    for ( var i = 1, ilen = arguments.length; i < ilen; i++ ) {
      var item = arguments[i];
      if ( typeof item === 'function' ) {
        result.callback = item;
        return result;
      }
      params.push(item);
    }

    return result;
  }

  function dynamic() {
    // Process a "dynamic" query whose results update with data changes
    var result = processArguments.apply(this, arguments)
      , queryString = result.queryString
      , params = result.params
      , callback = result.callback;

    // Decorate the Items, but no need to decorate the Array
    for ( var i = 0, ilen = params.length; i < ilen; i++ ) {
      params[i] = decorate(params[i]);
    }

    return processQuery(this, queryString, params, callback, true);
  }

  function query() {
    // Process a "snapshot" query with static results
    var result = processArguments.apply(this, arguments)
      , queryString = result.queryString
      , params = result.params
      , callback = result.callback;

    return processQuery(this, queryString, params, callback, false);
  }

  // Debug and Testing Interface **********************************************

  function debug() {
    return {
      self: self,
      ObjeqParser: ObjeqParser,
      queue: queue,
      listeners: listeners,
      targets: targets,
      nextObjectId: nextObjectId,
      invalidated: invalidated,
      pendingRefresh: pendingRefresh,
      regexCache: regexCache,
      parserPool: parserPool,
      parseCache: parseCache,
      parse: parse,
      dynamic: dynamic,
      query: query
    };
  }

  // Exported Function ********************************************************

  function objeq() {
    var self = this || EmptyArray;

    // Fast Path for decorating an existing Array
    if ( arguments.length === 1 && isArray(arguments[0]) ) {
      return decorate(arguments[0]);
    }

    // Fast Path for creating a new Array
    if ( arguments.length === 0 ) {
      return decorateArray([]);
    }

    var args = makeArray(arguments)
      , source = isDecorated(self) ? self : decorateArray([])
      , results = null;

    while ( args.length ) {
      var arg = args.shift();
      if ( typeof arg === 'string' ) {
        // short circuit if it's a query
        return processQuery(source, arg, args, true);
      }
      else {
        results = results || ( source = results = decorateArray([]) );
        results.push.apply(results, isArray(arg) ? arg : [arg]);
      }
    }
    return results;
  }

  defineProperty(objeq, 'VERSION', {
    get: function () { return CURRENT_VERSION; }
  });

  objeq.registerExtension = registerExtension;
  objeq.debug = debug;

  // Node.js and CommonJS Exporting
  if ( typeof exports !== 'undefined' ) {
    if ( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = objeq;
    }
    exports.objeq = objeq;
  }
  else {
    // Global Exporting
    if ( self.$objeq && self.$objeq.parser ) {
      // If the Parser has already been defined, pull it in
      objeq.parser = self.$objeq.parser;
    }
    self.$objeq = objeq;
  }
})(this);
