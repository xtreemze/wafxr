'use strict'
/* globals dat */

var fx = require('.')



// settings object
var settings = {
    duration: 0.2   ,
    volume: 0,
    frequency: 500,
    freqSweepMult: 1,
    source: "sine",
    harmonics: 0,
    bitcrush: 0,
    envelope: {
        sustain: 0.9,
        attack: 0.01,
        decay: 0.01,
        release: 0.01,
    },
    tremolo: 0,
    tremoloFreq: 10,
}


var others = {
    sourceNum: 0,
    sourceName: 'sine',
}

var sourceNames = ['sine', 'square', 'triangle', 'sawtooth', 'white noise', 'brown noise', 'pink noise']

function setWave() {
    var name = sourceNames[others.sourceNum]
    others.sourceName = name
    settings.source = name
}




function go() {
    fx.play(settings)
}
window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 32) go()
})


/*
 * 		Building the dat-gui
*/

var gui = new dat.GUI({
    autoPlace: false,
    hideable: false,
    width: 450,
})
document.querySelector('#ui').appendChild(gui.domElement)


// // main

var f = gui.addFolder('Wave')
f.add(others, 'sourceNum', 0, sourceNames.length - 1).step(1).onChange(function () { setWave(); go() })
f.add(others, 'sourceName').listen()
f.add(settings, 'harmonics', 0, 6).step(1).onChange(function () { setWave(); go() })

f = gui.addFolder('Shape')
f.add(settings, 'volume', -50, 50).step(1).onChange(go)
f.add(settings, 'duration', 0.01, 1).step(0.01).onChange(go)
f.add(settings.envelope, 'sustain', 0, 1).step(0.1).onChange(go)
f.add(settings.envelope, 'attack', 0, 1).step(0.001).onChange(go)
f.add(settings.envelope, 'decay', 0, 1).step(0.001).onChange(go)
f.add(settings.envelope, 'release', 0, 1).step(0.001).onChange(go)

f = gui.addFolder('Pitch')
f.add(settings, 'frequency', 100, 2000).step(1).onChange(go)
f.add(settings, 'freqSweepMult', 0.2, 3.0).step(0.1).onChange(go)

f = gui.addFolder('Effects')
f.add(settings, 'tremolo', 0, 1).step(0.01).onChange(go)
f.add(settings, 'tremoloFreq', 0, 20).step(0.5).onChange(go)
f.add(settings, 'bitcrush', 0, 8).step(1).onChange(go)



window.gui = gui
for (var s in gui.__folders) {
    gui.__folders[s].open()
}
console.clear()


