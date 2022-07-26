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

const GET = (url, cb) => makeXhrRequest(cb, 'GET', url);

const POST = (url, body, cb) => makeXhrRequest(cb, 'POST', url, body);

const DELETE = (url, body, cb) => makeXhrRequest(cb, 'DELETE', url, body);
