const allowedCors = [
  'https://mestogram.frontend.nomoredomains.rocks/',
  'http://mestogram.frontend.nomoredomains.rocks/',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3000',
];
module.exports = (req, res, next) => {
  console.log(req.headers);
  const { origin } = req.headers;

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', res.header(origin));
    res.header('Access-Control-Allow-Credentials', 'true');
    console.log(res.headers);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    console.log(res.headers);
    return res.end();
  }
  next();
};
