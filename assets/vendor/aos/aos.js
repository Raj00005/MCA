import MutationObserver from 'mutation-observer';

const isSupported = () => 'MutationObserver' in window;

const ready = (callback) => {
  if (isSupported()) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      removedNodes: true,
    });
  } else {
    console.warn('MutationObserver is not supported on this browser. Code mutations observing has been disabled.');
  }
};

export default { isSupported, ready };


const getOffset = (element, offset) => {
  const rect = element.getBoundingClientRect();
  return rect.top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0) + (offset || 0);
};

const getScrollTop = () => (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

const getWindowHeight = () => window.innerHeight || document.documentElement.clientHeight;

export { getOffset, getScrollTop, getWindowHeight };


import { getOffset } from './aos-utils';

const animateElements = (elements, threshold) => {
  const scrollTop = getScrollTop();
  const windowHeight = getWindowHeight();

  elements.forEach((element) => {
    if (getOffset(element, threshold) < scrollTop + windowHeight) {
      element.classList.add('aos-animate');
    }
  });
};

export default animateElements;


import { getOffset } from './aos-utils';

const initElements = (elements, config) => {
  elements.forEach((element) => {
    element.classList.add('aos-init');
    element.dataset.aosPosition = getOffset(element, config.offset);
  });
};

export default initElements;


const defaultConfig = {
  offset: 120,
};

const getConfig = (element) => {
  const config = {};
  Object.keys(defaultConfig).forEach((key) => {
    const value = element.dataset[`aos-${key}`];
    if (value) {
      config[key] = value;
    }
  });
  return { ...defaultConfig, ...config };
};

export default getConfig;


import aos from './aos';
import animateElements from './aos-animate';
import initElements from './aos-init';
import getConfig from './aos-config';
import { getWindowHeight } from './aos-utils';

const initAOS = () => {
  const elements = document.querySelectorAll('[data-aos]');
  const config = getConfig(elements[0]);

  const observer = new aos.MutationObserver(() => {
    const elementsArray = Array.from(elements);
    initElements(elementsArray, config);
    animateElements(elementsArray, config.offset);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('scroll', () => {
    animateElements(elementsArray, config.offset);
  });

  window.addEventListener('resize', () => {
    config.offset = getWindowHeight() * (config.offset / 100);
  });
};

if (aos.isSupported()) {
  initAOS();
}
