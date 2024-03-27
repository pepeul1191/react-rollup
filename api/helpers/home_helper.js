import constants from '../../config/constants.js';

const indexCss = () => {
  let resp = [];
  if (constants.static === 'dev') {
    resp = ['build/bundle'];
  } else if (constants.static === 'build') {
    resp = ['dist/test.min'];
  }
  return resp;
};

const indexJs = () => {
  let resp = [];
  if (constants.static === 'dev') {
    resp = ['build/bundle'];
  }
  return resp;
};

export { indexCss, indexJs };
