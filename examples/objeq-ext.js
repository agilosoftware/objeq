// Some Sample Extensions that are *not* imported by default
// These are also *not* tested, so use them at your own risk

$objeq.registerExtension({
  count: function _count(ctx, value) {
    return Array.isArray(value) ? value.length : 0;
  },

  min: function _min(ctx, value) {
    if ( Array.isArray(value) ) return Math.min.apply(Math, value);
    return typeof value === 'number' ? value : NaN;
  },

  max: function _max(ctx, value) {
    if ( Array.isArray(value) ) return Math.max.apply(Math, value);
    return typeof value === 'number' ? value : NaN;
  },

  floor: function _floor(ctx, value) {
    return Math.floor(value);
  },

  ceil: function _ceil(ctx, value) {
    return Math.ceil(value);
  },

  sum: function _sum(ctx, value) {
    if ( Array.isArray(value) ) {
      for ( var i = 0, res = 0, l = value.length; i < l; res += value[i++] );
      return res;
    }
    return typeof value === 'number' ? value : NaN;
  },

  avg: function _avg(ctx, value) {
    if ( Array.isArray(value) ) {
      if ( value.length === 0 ) return 0;
      for ( var i = 0, r = 0, l = value.length; i < l; r += value[i++] );
      return r / l;
    }
    return typeof value === 'number' ? value : NaN;
  },

  median: function _median(ctx, value) {
    if ( Array.isArray(value) ) {
      if ( value.length === 0 ) return 0;
      var temp = value.slice(0).sort();
      if ( temp.length % 2 === 0 ) {
        var mid = temp.length / 2;
        return (temp[mid-1] + temp[mid]) / 2;
      }
      return temp[(temp.length + 1) / 2];
    }
    return typeof value === 'number' ? value : NaN;
  },

  upper: function _upper(ctx, value) {
    return typeof value === 'string' ? value.toUpperCase() : value;
  },

  lower: function _lower(ctx, value) {
    return typeof value === 'string' ? value.toLowerCase() : value;
  },

  title: function _title(ctx, value) {
    if ( typeof value !== 'string' ) return value;
    return value.replace(/\w\S*/g, function(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  },

  string: function _string(ctx, value) {
    return String(value);
  },

  number: function _number(ctx, value) {
    return Number(value);
  }
});