function analyze(){

  //
  // Getting To Know the Data
  //

  heading('Examples')

  ask('how many measurements were included in this dataset?', example1)

  ask('how many samples does each measurement contain?', example2)

  ask('at the 10-th measurement, what are valid sample values (> 0)?', example3)
  // a sample value is valid if it is greater than zero

  heading('Measurements and Samples')

  ask('how many unique non-zero, non-negative sample values in this dataset? what are they?', func1)

  ask('what is the average time (seconds) between two measurements?', func2)

  ask('at 09:57:18, how many samples in this measurement have the value 7?', func3)

  ask('which measurement has the most number of samples with the value 3?', func4)

  ask('how many measurements have no sample value greater than zero?', func5)

  ask('which valid (i.e., greater than zero) sample value is the most common?', func6)

  heading('Mapping')

  ask('when was the boat furthest away from NYC (40.7127 N, 74.0059 W)? what was the distance?', func7)
  // use Leaflet to draw a line between NYC and this "furtherest away" location

  ask('what was the path of the boat?', func8)
  // use Leaflet to draw a line between every two locations

  ask('where were the most common sample value measured?', func9)
  // say, your answer to Question Six is 13, draw a marker for each measurement that has
  // at least one sample whose value is 13

  ask('how does the desensity of valid sample values change across the geographical area?', func10)
  // use the brightness to indicate high number of valid sample values each
  // for each measurement, draw a marker,
  // use the brightness to represent the number of valid samples
  // the brighter a spot, the higher the number
  // for those measurements without a valid sample, draw nothing

  heading('Science')

  ask('what is the distribution of fish?', func11)

  ask('what is the distribution of  are schools of zooplankton?', func12)


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  })
  toggleSourecode()
}

function example1(){
  return items.length
}

function example2(){
  return items[0].Samples.length
}

function example3(){
  return _.filter(items[9].Samples, function(d){
    return d > 0
  }).join(', ')
}

function func1(){
  //item[0] -> samples[1000]
  return _.chain(items)
    .map('Samples')
    .flatten()
    .filter(function(sample){
      return  sample > 0
    })
    .uniq()
    .value()
}

function func2(){
  return (items[334]['Ping time'] - items[0]['Ping time'])/355
}

function func3(){
  return _.chain(items)
          .filter(function(item){
            return item['Ping_time'] == '09:57:18'
          })
          .pluck('Samples')
          .filter(function(sample){
            return  sample == 7
          })
          .value().length
}

function func4(){
  var counts = _.chain(items)
          .mapValues(function(item){
            return _.filter(item.Samples, function(i){
              return i == 3
            }).length
          })
          .value()  
  return items[_.last(_.pairs(_.invert(counts)))[1]]['Ping_time']
}

function func5(){
  return _.filter(items, function(item){
      return _.every(item.Samples, function(i){
                return i <= 0
              })
  }).length
}

function func6(){
  return _.chain(items)
    .map('Samples')
    .flatten()
    .filter(function(d) { return d > 0 })
    .groupBy()
    .mapValues('length')
    .pairs()
    .max(function(d) { return d[1] })
    .value()
}

function func7(){
  // this sample code shows how to display a map and put a marker to visualize
  // the location of the first item (i.e., measurement data)
  // you need to adapt this code to answer the question
  var NYC = [40.7127, 74.0059]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height

  var longest = _.max(items, function(item){
    var pos = [item.Latitude, item.Longitude]
    var d = geolib.getDistance(NYC, pos)
    return geolib.convertUnit('mi', d)
  })

  var map = createMap(el, [longest.Latitude, longest.Longitude], 5)

  var circle = L.circle([longest.Latitude, longest.Longitude], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);
  return '...'
}

function func8(){
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 11)

  _.each(items, function(item){
    var pos = [item.Latitude, item.Longitude]
    var circle = L.circle(pos, 20, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
  })
  return '...'
}

function func9(){
  var common = _.chain(items)
    .map('Samples')
    .flatten()
    .filter(function(d) { return d > 0 })
    .groupBy()
    .mapValues('length')
    .pairs()
    .max(function(d) { return d[1] })
    .value()[0]

  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 11)

  _.forEach(items, function(item){
    if (_.includes(item.Samples, common)){
      var pos = [item.Latitude, item.Longitude]
      var circle = L.circle(pos, 20, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.8
      }).addTo(map);
    }
  })
  return '...'
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return "rgb(" + Math.round(r * 255) + ',' + Math.round(g * 255)  + ',' +  Math.round(b * 255) + ')'
}

function func10(){
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 11)

  _.forEach(items, function(item){
      var density = (_.sum(item.Samples, function(n){
        if (n>0){
          return n
        }
      }))/1000
      if (density > 1) {density = 1}
      var pos = [item.Latitude, item.Longitude]
      var circle = L.circle(pos, 20, {
        color: HSVtoRGB(0,density, 1),
        fillColor: HSVtoRGB(0,density, 1),
        fillOpacity: 0.5
      }).addTo(map);
  })
}


function func11(){
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 11)
  var colors = ['']
  _.forEach(items, function(item){
      var density = (_.sum(item.Samples, function(n){
        //only counting the big fish, not plankton
        if (n > 0 && n < 10){
          return n
        }
      }))/250
      if (density > 1) {density = 1}
      var pos = [item.Latitude, item.Longitude]
      var circle = L.circle(pos, 20, {
        color: HSVtoRGB(0,density, 1),
        fillColor: HSVtoRGB(0,density, 1),
        fillOpacity: 0.5
      }).addTo(map);
  })
}

function func12(){
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 11)
  var colors = ['']
  _.forEach(items, function(item){
      var density = (_.sum(item.Samples, function(n){
        //only counting the big fish, not plankton
        if (n == 7 || n == 13){
          return 1
        }
      }))/20
      if (density > 1) {density = 1}
      var pos = [item.Latitude, item.Longitude]
      var circle = L.circle(pos, 20, {
        color: HSVtoRGB(0,density, 1),
        fillColor: HSVtoRGB(0,density, 1),
        fillOpacity: 0.5
      }).addTo(map);
  })
}

