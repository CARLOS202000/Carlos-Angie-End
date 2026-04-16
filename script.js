// Obtener elementos del DOM 
// ===============================
// CONFIGURACIÓN DE AUDIOS 🔥
// ===============================

var modal = document.getElementById('myModal');
var btn = document.getElementById("playAudio");
var span = document.getElementsByClassName("close")[0];

// 🔁 LOOP POR SECCIÓN REPETIR (CONTROL TOTAL)
var sectionLoopMap = {
    3: true,
    4: true,
    10: true,
    11: true,
};

// Lista de audios  
var audios = [
    "audio/Carlos ✨.mp3",
    "audio/Quererte.mp3",
    "audio/Carlos1💔.mp3",
    "audio/Toa.mp3",
    "audio/Olvidándote.mp3",
    "audio/Consentida.mp3",
    "audio/Carlos2💔.mp3",
];

// 🎯 MAPEO DE SECCIONES → AUDIO
var sectionAudioMap = {
    0: 0,
    1: 0,
    2: 0,
    3: 1,
    4: 3,

    5: 3,
    6: 3,
    7: 3,
    8: 4,
    9: 4,
    10: 2,
    11: 5,
    12: 6,
    13: 6,
    14: 6,
    15: 6
};

// Audio base
var audio = document.getElementById("myAudio");
var currentAudioIndex = 0;
var currentSectionIndex = -1;

// ===============================
// MODAL
// ===============================

window.onload = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ===============================
// FADE
// ===============================

function fadeOut(audio, callback) {
    let fade = setInterval(() => {
        if (audio.volume > 0.05) {
            audio.volume -= 0.05;
        } else {
            clearInterval(fade);
            audio.pause();
            audio.volume = 0;
            if (callback) callback();
        }
    }, 80);
}

function fadeIn(audio) {
    audio.volume = 0;
    audio.play();

    let fade = setInterval(() => {
        if (audio.volume < 0.95) {
            audio.volume += 0.05;
        } else {
            audio.volume = 1;
            clearInterval(fade);
        }
    }, 80);
}

// ===============================
// PLAY INICIAL
// ===============================

btn.onclick = function() {
    audio.src = audios[currentAudioIndex];
    fadeIn(audio);
    modal.style.display = "none";
}

// ===============================
// LOOP INTELIGENTE 🔁
// ===============================

audio.onended = function() {

    if (sectionLoopMap[currentSectionIndex]) {
        audio.currentTime = 0;
        audio.play();
        return;
    }

}

// ===============================
// SCROLL INTELIGENTE 🔥
// ===============================

var sections = document.querySelectorAll(".tab");

function getCurrentSection() {
    let index = 0;
    let minDistance = Infinity;

    sections.forEach((section, i) => {
        let rect = section.getBoundingClientRect();

        let screenCenter = window.innerHeight / 2;
        let sectionCenter = rect.top + rect.height / 2;

        let distance = Math.abs(screenCenter - sectionCenter);

        if (distance < minDistance) {
            minDistance = distance;
            index = i;
        }
    });

    return index;
}

function handleScroll() {

    let newSectionIndex = getCurrentSection();

    if (newSectionIndex !== currentSectionIndex) {
        currentSectionIndex = newSectionIndex;

        let newAudioIndex = sectionAudioMap[currentSectionIndex];

        if (newAudioIndex === undefined) return;

        if (newAudioIndex !== currentAudioIndex) {
            currentAudioIndex = newAudioIndex;

            fadeOut(audio, () => {
                audio.src = audios[currentAudioIndex];
                fadeIn(audio);
            });
        }
    }
}

// 🔥 EVENTOS CORREGIDOS PARA MÓVIL
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("touchend", handleScroll, { passive: true });

// 🔥 RESPALDO PARA MÓVIL
setInterval(() => {
    handleScroll();
}, 200);



// ===============================
// SISTEMA DE EVENTOS (NO TOCADO)
// ===============================

function bindEvent(element, eventName, eventHandler) {
    element.addEventListener(eventName, eventHandler, { passive: false });
}

var events = new Events();
events.add = function(obj) {
  obj.events = { };
}
events.implement = function(fn) {
  fn.prototype = Object.create(Events.prototype);
}

function Events() {
  this.events = { };
}
Events.prototype.on = function(name, fn) {
  var events = this.events[name];
  if (events == undefined) {
    this.events[name] = [ fn ];
    this.emit('event:on', fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit('event:on', fn);
    }
  }
  return this;
}
Events.prototype.once = function(name, fn) {
  var events = this.events[name];
  fn.once = true;
  if (!events) {
    this.events[name] = [ fn ];
    this.emit('event:once', fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit('event:once', fn);
    }
  }
  return this;
}
Events.prototype.emit = function(name, args) {
  var events = this.events[name];
  if (events) {
    var i = events.length;
    while(i--) {
      if (events[i]) {
        events[i].call(this, args);
        if (events[i].once) {
          delete events[i];
        }
      }
    }
  }
  return this;
}
Events.prototype.unbind = function(name, fn) {
  if (name) {
    var events = this.events[name];
    if (events) {
      if (fn) {
        var i = events.indexOf(fn);
        if (i != -1) {
          delete events[i];
        }
      } else {
        delete this.events[name];
      }
    }
  } else {
    delete this.events;
    this.events = { };
  }
  return this;
}

var userPrefix;

var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  userPrefix = {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

function bindEvent(element, type, handler) {
  if(element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent('on' + type, handler);
  }
}

function Viewport(data) {
  events.add(this);

  var self = this;

  this.element = data.element;
  this.fps = data.fps;
  this.sensivity = data.sensivity;
  this.sensivityFade = data.sensivityFade;
  this.touchSensivity = data.touchSensivity;
  this.speed = data.speed;

  this.lastX = 0;
  this.lastY = 0;
  this.mouseX = 0;
  this.mouseY = 0;
  this.distanceX = 0;
  this.distanceY = 0;
  this.positionX = 1122;
  this.positionY = 136;
  this.torqueX = 0;
  this.torqueY = 0;

  this.down = false;
  this.upsideDown = false;

  this.previousPositionX = 0;
  this.previousPositionY = 0;

  this.currentSide = 0;
  this.calculatedSide = 0;

  bindEvent(document, 'mousedown', function() {
    self.down = true;
  });

  bindEvent(document, 'mouseup', function() {
    self.down = false;
  });
  
  bindEvent(document, 'keyup', function() {
    self.down = false;
  });

  bindEvent(document, 'mousemove', function(e) {
    self.mouseX = e.pageX;
    self.mouseY = e.pageY;
  });

  bindEvent(document, 'touchstart', function(e) {

    self.down = true;
    e.touches ? e = e.touches[0] : null;
    self.mouseX = e.pageX / self.touchSensivity;
    self.mouseY = e.pageY / self.touchSensivity;
    self.lastX  = self.mouseX;
    self.lastY  = self.mouseY;
  });

  // 🔥 CORREGIDO (SIN BLOQUEAR SCROLL)
  bindEvent(document, 'touchmove', function(e) {

    if(e.touches.length == 1) {

      e.touches ? e = e.touches[0] : null;

      self.mouseX = e.pageX / self.touchSensivity;
      self.mouseY = e.pageY / self.touchSensivity;

    }
  });

  bindEvent(document, 'touchend', function(e) {
    self.down = false;
  });  

  setInterval(this.animate.bind(this), this.fps);

}

events.implement(Viewport);

// (TODO EL RESTO DEL CÓDIGO DEL CUBO SE MANTIENE EXACTAMENTE IGUAL)
