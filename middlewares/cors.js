const allowedCors = [
  'https://mestogram.frontend.nomoredomains.rocks',
  'http://mestogram.frontend.nomoredomains.rocks',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3000',
];
module.exports = (req, res, next) => {
  console.log('заново');
  console.log('AAA');
  const { origin } = req.headers;
  const { method } = req;
  console.log(origin);
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    console.log('not opt');
    console.log(origin);
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    console.log('options');
    console.log(method);
    console.log(requestHeaders);
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
