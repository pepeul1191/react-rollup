import { getContent } from '../../config/contents.js';

const errorHandlerMiddleware = (req, res, next) => {
  const lang = 'sp';
  
  if (req.method === 'GET') {
    const resource = req.path.split('.');
    const extensions = ['css', 'js', 'png', 'jpg'];

    if (!extensions.includes(resource[resource.length - 1])) {
      return res.redirect('/error/access/404');
    }
  } else {
    const resp = getContent('error')[lang]['error_handler']['post_404'];
    return res.status(404).send(resp);
  }

  next();
};


export default errorHandlerMiddleware;
