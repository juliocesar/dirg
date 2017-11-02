// Dirg JS
// =======

(function() {
  var defaultScale = {
    fontSize: '13px',
    gridUnit: '18px',
    factor: 1.3
  }

  var numberFromValue = function(value) {
    return parseFloat(value, 10)
  }

  var sizingUnitFromValue = function(value) {
    return value.match(/([a-z]+$)/)[0]
  }

  var fontScale = function(x, scale) {
    var sizeScale = scale || defaultScale
    var number = numberFromValue(sizeScale.fontSize)
    var sizingUnit = sizingUnitFromValue(sizeScale.fontSize)

    return Math.ceil(number * Math.pow(sizeScale.factor, x)) + sizingUnit
  }

  var units = function(x, scale) {
    var sizeScale = scale || defaultScale
    var number = numberFromValue(sizeScale.gridUnit)
    var unit = sizingUnitFromValue(sizeScale.gridUnit)

    return Math.ceil(number * x) + unit
  }

  var columns = function(x, scale) {
    return units(4 * x, scale)
  }

  var fontSize = function(x, scale) {
    var sizeScale = scale || defaultScale
    var lineHeight = numberFromValue(sizeScale.gridUnit)
    var lineHeightUnit = sizingUnitFromValue(sizeScale.gridUnit)
    var fontSize = fontScale(x, scale)
    var fontSizeNumber = numberFromValue(fontSize)

    while (lineHeight < fontSizeNumber) {
      lineHeight += numberFromValue(sizeScale.gridUnit)
    }

    return { fontSize: fontSize, gridUnit: lineHeight + lineHeightUnit }
  }

  var fontSizeCss = function(x, scale) {
    const output = fontSize(x, scale)
    return [
      'font-size: ' + output.fontSize,
      'line-height: ' + output.gridUnit
    ].join(';')
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
    window.dirg = dirg
  }
})()
