const makeXhrRequest = (cb, method, path, body = '') => {
  const XHR = new XMLHttpRequest();
  XHR.onload = () => {
    if (XHR.status === 200) {
      return cb(XHR);
    }
    console.log('Error in fetching', method, path);
  };
  XHR.open(method, path);
  XHR.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  XHR.send(body);
};

const get = (url, cb) => makeXhrRequest(cb, 'GET', url);

const post = (url, body, cb) => makeXhrRequest(cb, 'POST', url, body);

const deleteMethod = (url, body, cb) => makeXhrRequest(cb, 'DELETE', url, body);
