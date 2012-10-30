// Some Sample Extensions that are *not* imported by default
// These are also *not* tested, so use them at your own risk

if ( typeof require === 'function' && typeof window === 'undefined' ) {
  // Then we're most likely running in Node.js
  var $objeq = require('../objeq');
}

$objeq.registerExtension({

  // Extensions from Math Module **********************************************
  abs:   function _abs(ctx, number)    { return Math.abs(number); },
  acos:  function _acos(ctx, number)   { return Math.acos(number); },
  asin:  function _asin(ctx, number)   { return Math.asin(number); },
  atan:  function _atan(ctx, number)   { return Math.atan(number); },
  atan2: function _atan2(ctx, x, y)    { return Math.atan2(x, y); },
  ceil:  function _ceil(ctx, number)   { return Math.ceil(number); },
  cos:   function _cos(ctx, number)    { return Math.cos(number); },
  exp:   function _exp(ctx, number)    { return Math.exp(number); },
  floor: function _floor(ctx, number)  { return Math.floor(number); },
  log:   function _log(ctx, number)    { return Math.log(number); },
  pow:   function _pow(ctx, base, exp) { return Math.pow(base, exp); },
  round: function _round(ctx, number)  { return Math.round(number); },
  sin:   function _sin(ctx, number)    { return Math.sin(number); },
  sqrt:  function _sqrt(ctx, number)   { return Math.sqrt(number); },
  tan:   function _tan(ctx, number)    { return Math.tan(number); },

  // Other Math Extensions ****************************************************
  avg: function _avg(ctx, value) {
    if ( Array.isArray(value) ) {
      if ( value.length === 0 ) return 0;
      for ( var i = 0, r = 0, l = value.length; i < l; r += value[i++] );
      return r / l;
    }
    return typeof value === 'number' ? value : NaN;
  },

  count: function _count(ctx, value) {
    return Array.isArray(value) ? value.length : 0;
  },

  max: function _max(ctx, value) {
    if ( Array.isArray(value) ) return Math.max.apply(Math, value);
    return typeof value === 'number' ? value : NaN;
  },

  median: function _median(ctx, value) {
    if ( Array.isArray(value) ) {
      if ( value.length === 0 ) return 0;
      var temp = value.slice(0).order();
      if ( temp.length % 2 === 0 ) {
        var mid = temp.length / 2;
        return (temp[mid-1] + temp[mid]) / 2;
      }
      return temp[(temp.length + 1) / 2];
    }
    return typeof value === 'number' ? value : NaN;
  },

  min: function _min(ctx, value) {
    if ( Array.isArray(value) ) return Math.min.apply(Math, value);
    return typeof value === 'number' ? value : NaN;
  },

  number: function _number(ctx, value) {
    return Number(value);
  },

  sum: function _sum(ctx, value) {
    if ( Array.isArray(value) ) {
      for ( var i = 0, res = 0, l = value.length; i < l; res += value[i++] );
      return res;
    }
    return typeof value === 'number' ? value : NaN;
  },

  // Array Extensions *********************************************************
  first: function _first(ctx, value) {
    if ( Array.isArray(value) ) return value[0];
    return value;
  },

  last: function _last(ctx, value) {
    if ( Array.isArray(value) ) {
      if ( value.length ) return value[value.length-1];
      return null;
    }
    return value;
  },

  // String Extensions ********************************************************
  lower: function _lower(ctx, value) {
    return typeof value === 'string' ? value.toLowerCase() : value;
  },

  split: function _split(ctx, value, delim, idx) {
    var val = String(value).split(delim || ' \n\r\t');
    return typeof idx !== 'undefined' ? val[idx] : val;
  },

  string: function _string(ctx, value) {
    return String(value);
  },

  title: function _title(ctx, value) {
    if ( typeof value !== 'string' ) return value;
    return value.replace(/\w\S*/g, function(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  },

  upper: function _upper(ctx, value) {
    return typeof value === 'string' ? value.toUpperCase() : value;
  }
});
