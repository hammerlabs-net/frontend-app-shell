const fs = require('fs');
const path = require('path');

const footer = {
  source : '../frontend-component-footer/dist',
  target: '/assets/pilets/frontend-component-footer/v1.0.0',
  spec  : {
    name: 'openEdx Footer',
    version: '1.0.0',
    spec: 'v2',
    dependencies: {},
    config: {},
    custom: {},
    requireRef: 'webpackChunkpr_edxfrontendcomponentfooter',
    link: '/assets/pilets/frontend-component-footer/v1.0.0/index.js'
  }
};

const foo = {
  source : '../frontend-component-foo/dist',
  target: '/assets/pilets/frontend-component-foo/v1.0.0',
  spec  : {
    name: 'openEdx Foo',
    version: '1.0.0',
    spec: 'v2',
    dependencies: {},
    config: {},
    custom: {},
    requireRef: 'webpackChunkpr_frontendcomponentfoo',
    link: '/assets/pilets/frontend-component-foo/v1.0.0/index.js'
  }
}

const pilets = {
  items: [footer.spec, foo.spec]
}

const targets = {

}

const headers = {
  'content-type': 'application/json',
};

function returnFile(fileSource, req, res) {
  const file =path.resolve(process.cwd(), fileSource);
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(process.cwd(), fileSource), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(res({
          headers,
          content: err,
        }));
      }
      console.log (data); 
      resolve(res({
        headers,
        content: data,
      }));
    });
  });

}

module.exports = function(_, req, res) {
  try {

    if (req.url === '/api/v1/feed/lms') { 
      return res({
        headers,
        content: JSON.stringify(pilets),
      });
    } else if (req.url.includes(footer.target)) {
      let file = req.url.match(/\/[^\/]+$/)[0] || "index.js"
      file = file.split('?')[0];
      return returnFile(footer.source + file, req, res)      
    } else if (req.url.includes(foo.target)) {
      let file = req.url.match(/\/[^\/]+$/)[0] || "index.js"
      file = file.split('?')[0];
      return returnFile(foo.source + file, req, res)      
  
    }
  } catch (e) {
    console.log(e);
  }
};
