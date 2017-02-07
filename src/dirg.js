// Dirg JS
// =======

(function() {
  var scales = {
    default: {
      fontSize: '14px',
      gridUnit: '21px',
      factor: 1.35
    }
  }

  var resolveScale = function(name, localScales) {
    var scale = (localScales || scales)[name || 'default']
    if (!scale) {
      throw new Error('Scale not found: ' + name)
    }

    return scale
  }

  var numberFromValue = function(value) {
    return parseFloat(value, 10)
  }

  var sizingUnitFromValue = function(value) {
    return value.match(/([a-z]+$)/)[0]
  }

  var fontScale = function(x, scaleName, localScales) {
    var sizeScale = resolveScale(scaleName, localScales)
    var number = numberFromValue(sizeScale.fontSize)
    var sizingUnit = sizingUnitFromValue(sizeScale.fontSize)

    return Math.ceil(number * Math.pow(sizeScale.factor, x)) + sizingUnit
  }

  var units = function(x, scaleName, localScales) {
    var sizeScale = resolveScale(scaleName, localScales)
    var number = numberFromValue(sizeScale.gridUnit)
    var unit = sizingUnitFromValue(sizeScale.gridUnit)

    return Math.ceil(number * x) + unit
  }

  var columns = function(x, scaleName, localScales) {
    return units(4, scaleName, localScales)
  }

  var fontSize = function(x, scaleName, localScales) {
    var sizeScale = resolveScale(scaleName, localScales)
    var lineHeight = numberFromValue(sizeScale.gridUnit)
    var lineHeightUnit = sizingUnitFromValue(sizeScale.gridUnit)
    var fontSize = fontScale(x, scaleName, localScales)
    var fontSizeNumber = numberFromValue(fontSize)

    while (lineHeight < fontSizeNumber) {
      lineHeight += numberFromValue(sizeScale.gridUnit)
    }

    return [
      'font-size: ' + fontSize,
      'line-height: ' + lineHeight + lineHeightUnit
    ].join("; ")
  }

  var dirg = {
    fontScale: fontScale,
    units: units,
    columns: columns,
    fontSize: fontSize
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = dirg
  } else {
    window.dirg = dig
  }
})()
