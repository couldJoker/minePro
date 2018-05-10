let baseUrl = '';
let user = 'server';

if (user === 'server') {
  baseUrl = 'http://127.0.0.1:3000';
} else if (user === 'website') {
  baseUrl = 'http://140.143.3.129/8080';
}

export {
  baseUrl
}

