(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#sideNav",
  });

  $(window).on("load", function () {
    $("body").addClass("loaded");
  });
})(jQuery); // End of use strict

// make audio work

function playSound(el, soundfile) {
  if (el.mp3) {
    if (el.mp3.paused) el.mp3.play();
    else el.mp3.pause();
  } else {
    el.mp3 = new Audio(soundfile);
    el.mp3.play();
  }
}

//show diff tabs
// CHANGE FOR DEBUGGING
var currentTab = debug ? 0 : 1;
initTab(currentTab);

function initTab(n) {
  let tabs = document.getElementsByClassName("tab");
  for (i = 0; i < tabs.length; i++) {
    if (i !== n) {
      tabs[i].style.opacity = "0";
    } else {
      tabs[i].style.opacity = "1";
    }
  }
}

function showTab(n) {
  let tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    if (i !== n) {
      tabs[i].style.opacity = "0";
      setTimeout(function () {
        disappear(tabs[i]);
      }, 700);
    } else {
      tabs[i].style.opacity = "1";
      setTimeout(function () {
        appear(tabs[i]);
      }, 700);
    }
  }
}
function appear(element) {
  console.log(element);
  element.style.display = "block";
}

function disappear(element) {
  console.log(element);
  element.style.display = "none";
}

function openMain() {
  // const body = document.querySelector("#page-top")
  // const mq = window.matchMedia( "(min-width: 992px)" );
  // if (mq.matches){
  //       body.style["padding-left"] = "17rem";
  // }
  // else body.style["padding-top"] = "54px"
  showTab(0);
}
//make canvas work
var c = document.getElementsByClassName("intro")[0];
var ctx = c.getContext("2d");
var cH;
var cW;
var bgColor = "#000";
var animations = [];
var circles = [];

var colorPicker = (function () {
  var colors = ["#000", "#fff"];
  var index = 0;
  function next() {
    index = index++ < colors.length - 1 ? index : 0;
    return colors[index];
  }
  function current() {
    return colors[index];
  }
  return {
    next: next,
    current: current,
  };
})();

function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

function addClickListeners() {
  document.addEventListener("touchstart", handleEvent);
  document.addEventListener("mousedown", handleEvent);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function getRndColor() {
  which = getRandomInt(1, 4);
  //  if (which == 1){
  //   var r = getRandomInt(0, 122),
  //   g = getRandomInt(200, 255),
  //   b = getRandomInt(0, 122)
  //   return 'rgb(' + r + ',' + g + ',' + b + ')';
  //  }
  //  else if (which ==2){
  //   var r = getRandomInt(0, 122),
  //   g = getRandomInt(0, 122),
  //   b = getRandomInt(200, 255)
  //   return 'rgb(' + r + ',' + g + ',' + b + ')';
  //  }
  //  else {
  var r = getRandomInt(200, 255),
    g = getRandomInt(0, 122),
    b = getRandomInt(0, 122);
  return "rgb(" + r + "," + g + "," + b + ")";
  //  }
}
function handleEvent(e) {
  document.removeEventListener("mousedown", handleEvent);
  document.removeEventListener("touchstart", handleEvent);
  if (e.touches) {
    e.preventDefault();
    e = e.touches[0];
  }
  var currentColor = colorPicker.current();
  var nextColor = colorPicker.next();
  var targetR = calcPageFillRadius(e.pageX, e.pageY);
  var rippleSize = Math.min(200, cW * 0.4);
  var minCoverDuration = 750;
  if (!e.isTrusted) {
    var pageFill = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextColor,
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration: Math.max(targetR / 2, minCoverDuration) + 1500,
      easing: "easeOutQuart",
      complete: function () {
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      },
    });

    var ripple = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor,
      },
      opacity: 1,
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 0,
      complete: removeAnimation,
    });

    var particles = [];
    for (var i = 0; i < 36; i++) {
      var particle = new Circle({
        x: e.pageX,
        y: e.pageY,
        fill: getRndColor(),
        r: anime.random(12, 24),
      });
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function (particle) {
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function (particle) {
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(2500, 3800),
      complete: removeAnimation,
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    setTimeout(function () {
      c.classList.toggle("finished");
      showTab(0);
      window.removeEventListener("scroll", noScroll);
    }, 1500);
  } else {
    var pageFill = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextColor,
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration: Math.max(targetR / 2, minCoverDuration),
      easing: "easeOutQuart",
      complete: function () {
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      },
    });

    var ripple = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor,
      },
      opacity: 1,
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 0,
      complete: removeAnimation,
    });

    var particles = [];
    for (var i = 0; i < 36; i++) {
      var particle = new Circle({
        x: e.pageX,
        y: e.pageY,
        fill: getRndColor(),
        r: anime.random(12, 24),
      });
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function (particle) {
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function (particle) {
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1500, 2000),
      complete: removeAnimation,
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    setTimeout(function () {
      c.classList.toggle("finished");
      showTab(0);
      window.removeEventListener("scroll", noScroll);
    }, 500);
  }
}

function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var Circle = function (opts) {
  extend(this, opts);
};

Circle.prototype.draw = function () {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
};

var animate = anime({
  duration: Infinity,
  update: function () {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cW, cH);
    animations.forEach(function (anim) {
      anim.animatables.forEach(function (animatable) {
        animatable.target.draw();
      });
    });
  },
});

var resizeCanvas = function () {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  addClickListeners();
  handleInactiveUser();
})();

function handleInactiveUser() {
  var inactive = setTimeout(function () {
    fauxClick(cW / 2, cH / 2);
  }, 2000);

  function clearInactiveTimeout() {
    clearTimeout(inactive);
    document.removeEventListener("mousedown", clearInactiveTimeout);
    document.removeEventListener("touchstart", clearInactiveTimeout);
  }

  document.addEventListener("mousedown", clearInactiveTimeout);
  document.addEventListener("touchstart", clearInactiveTimeout);
}

function fauxClick(x, y) {
  var fauxClick = new Event("mousedown");
  fauxClick.pageX = x;
  fauxClick.pageY = y;
  document.dispatchEvent(fauxClick);
}
