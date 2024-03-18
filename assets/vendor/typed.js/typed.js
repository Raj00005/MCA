/*!
 * typed.js - A JavaScript Typing Animation Library
 * Author: Matt Boldt <me@mattboldt.com>
 * Version: v2.0.11
 * Url: https://github.com/mattboldt/typed.js
 * License(s): MIT
 */
(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object')
    exports["Typed"] = factory();
  else
    root["Typed"] = factory();
})(this, function () {
  'use strict';

  // ----------------- DEFAULTS AND UTILS -----------------

  const defaults = {
    strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
    typeSpeed: 0,
    startDelay: 0,
    backSpeed: 0,
    smartBackspace: true,
    shuffle: false,
    backDelay: 700,
    fadeOut: false,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500,
    loop: false,
    loopCount: Infinity,
    showCursor: true,
    cursorChar: '|',
    attr: null,
    bindInputFocusEvents: false,
    contentType: 'html',
    onBegin: function onBegin() {},
    onComplete: function onComplete() {},
    preStringTyped: function preStringTyped() {},
    onStringTyped: function onStringTyped() {},
    onLastStringBackspaced: function onLastStringBackspaced() {},
    onTypingPaused: function onTypingPaused() {},
    onTypingResumed: function onTypingResumed() {},
    onReset: function onReset() {},
    onStop: function onStop() {},
    onStart: function onStart() {},
    onDestroy: function onDestroy() {}
  };

  const initializer = (function () {
    function initializer() {}

    initializer.load = function (self, options, elementId) {
      // chosen element to manipulate text
      if (typeof elementId === 'string') {
        self.el = document.querySelector(elementId);
      } else {
        self.el = elementId;
      }

      self.options = Object.assign({}, defaults, options);

      // attribute to type into
      self.isInput = self.el.tagName.toLowerCase() === 'input';
      self.attr = self.options.attr;
      self.bindInputFocusEvents = self.options.bindInputFocusEvents;

      // show cursor
      self.showCursor = self.isInput ? false : self.options.showCursor;

      // custom cursor
      self.cursorChar = self.options.cursorChar;

      // Is the cursor blinking
      self.cursorBlinking = true;

      // text content of element
      self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;

      // html or plain text
      self.contentType = self.options.contentType;

      // typing speed
      self.typeSpeed = self.options.typeSpeed;

      // add a delay before typing starts
      self.startDelay = self.options.startDelay;

      // backspacing speed
      self.backSpeed = self.options.backSpeed;

      // only backspace what doesn't match the previous string
      self.smartBackspace = self.options.smartBackspace;

      // amount of time to wait before backspacing
      self.backDelay = self.options.backDelay;

      // Fade out instead of backspace
      self.fadeOut = self.options.fadeOut;
      self.fadeOutClass = self.options.fadeOutClass;
      self.fadeOutDelay = self.options.fadeOutDelay;

      // variable to check whether typing is currently paused
      self.isPaused = false;

      // input strings of text
      self.strings = self.options.strings.map(s => s.trim());

      // div containing strings
      if (typeof self.options.stringsElement === 'string') {
        self.stringsElement =
