const http = require('http');

const PORT = process.env.PORT || 8080;

setTimeout(() => {
  http.get(`http://127.0.0.1:${PORT}/health`, (res) => {
    if (res.statusCode === 200) {
      console.log('TEST PASSED');
      process.exit(0);
    } else {
      console.log('TEST FAILED: status', res.statusCode);
      process.exit(1);
    }
  }).on('error', (err) => {
    console.log('TEST FAILED:', err.message);
    process.exit(1);
  });
}, 1000);
