var utils = {

addClass: function(element, classes) {
    if(typeof classes === 'undefined' || classes === null || classes === '' || !classes) {
        return;
    }
    var classList = (classes.indexOf(' ') > -1) ? classes.split(' ') : classes;
    if(Array.isArray(classList)) {
        for(var i = 0; i < classList.length; i++) {
            element.classList.add(classList[i]);
        }
    } else {
        element.classList.add(classList);
    }
    return element;
},
  escapeHtml: function (source) {
    if (source == null) {
        source = '';
    }

    return source
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
  },
  stringToHtmlElement: function(html) {
      var frame = document.createElement('iframe');
      frame.style.display = 'none';
      document.body.appendChild(frame);
      frame.contentDocument.open();
      frame.contentDocument.write(html);
      frame.contentDocument.close();
      var el = frame.contentDocument.body.firstChild;
      document.body.removeChild(frame);
      return el;
  },
  extend: function ( defaults, options ) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
  },

  isElementVisible: function(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none' || style.visibility == 'hidden')
  },

  design: {
    easing: {
        linear: function(progress) {
            return progress;
        },
        quadratic: function(progress) {
            return Math.pow(progress, 2);
        },
        swing: function(progress) {
            return 0.5 - Math.cos(progress * Math.PI) / 2;
        },
        circ: function(progress) {
            return 1 - Math.sin(Math.acos(progress));
        },
        back: function(progress, x) {
            return Math.pow(progress, 2) * ((x + 1) * progress - x);
        },
        bounce: function(progress) {
            for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (progress >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                }
            }
        },
        elastic: function(progress, x) {
            return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
        }
    },
    animate: function(options) {
        var start = new Date;
        var id = setInterval(function() {
            var timePassed = new Date - start;
            var progress = timePassed / options.duration;
            if (progress > 1) {
                progress = 1;
            }
            options.progress = progress;
            var delta = options.delta(progress);
            options.step(delta);
            if (progress == 1) {
                clearInterval(id);
                if (typeof options.complete === 'function') {
                  options.complete();
                }
            }
        }, options.delay || 10);
        return id;
    },
    fadeOut: function(element, options) {
        var to = 1;
        var easing = options.easing || 'swing';
        return this.animate({
            duration: options.duration,
            delta: function(progress) {
                progress = this.progress;
                return utils.design.easing[easing](progress);
            },
            complete: options.complete,
            step: function(delta) {
                element.style.opacity = to - delta;
            }
        });
    },
    fadeIn: function(element, options) {
        var to = 0;
        var easing = options.easing || 'swing';
        return this.animate({
            duration: options.duration,
            delta: function(progress) {
                progress = this.progress;
                return utils.design.easing[easing](progress);
            },
            complete: options.complete,
            step: function(delta) {
                element.style.opacity = to + delta;
            }
        });
    }
  }
};

module.exports = utils;