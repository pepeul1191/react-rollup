const socketMiddleware = (socketReq, socketRes, next) => {
  console.log('middleware socket');
  return next();
};

export default socketMiddleware;
