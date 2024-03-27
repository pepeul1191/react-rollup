import dotenv from 'dotenv';

dotenv.config();

var constants = {}

if (process.env.ENV === 'local') {
  constants = {
    base_url: 'http://localhost:3000/',
    static_url: 'http://localhost:3000/',
    socket_url: 'ws://localhost:3000/',
    static: 'dev',
    session: true,
    csrf: {
      secret: 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
      key: 'csrf_val'
    },
  };
}

if (process.env.ENV === 'heroku') {
  constants = {
    base_url: 'http://heroke.com',
    static_url: 'http://heroke.com',
    socket_url: 'ws://heroke.com',
    static: 'dev',
    session: true,
    csrf: {
      secret: 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
      key: 'csrf_val'
    },
  };
}

export default constants;
