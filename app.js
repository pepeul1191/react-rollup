// Importación de módulos
import express from 'express';
import os from 'os';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import logger from 'morgan';
import bootstrap from './config/bootstrap.js';
//import sockets from './config/sockets';
import error404 from './api/middlewares/error_404.js';
//import preResponse from './api/middlewares/pre_response';
import cors from 'cors';
//import expressWs from 'express-ws';
const osName = os.platform();
// Inicialización de Express
const app = express();
const __dirname = (osName != 'linux' ?  new URL('.', import.meta.url).pathname.substring (1) : new URL('.', import.meta.url).pathname);
//expressWs(app);
// Configuración del motor de vistas y middlewares
app.set('views', join(process.cwd(), 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(preResponse);
app.use(cors());
app.use(express.static(join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['WYHHoSbCWyOaEjVnGWlbzodNIXvKlYCPFdhcnKyWhISThcZtfI'],
  // Opciones de cookie
  maxAge: 24 * 60 * 60 * 1000 // 24 horas
}));
// Carga de controladores y sockets
bootstrap(app);
//sockets(app);
// Redirección personalizada para capturar errores 404 y enviarlos al manejador de errores
app.use(error404);
// Manejador de errores de Express
app.use((err, req, res, next) => {
  // Establecer variables locales, proporcionando solo el error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});
// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
