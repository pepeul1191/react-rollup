// Importación de módulos
import homeController from '../api/controllers/home_controller.js';
import userController from '../api/controllers/user_controller.js';
/*import studentController from '../api/controllers/student_controller.js';
import adminController from '../api/controllers/admin_controller.js';
import carrerController from '../api/controllers/carrer_controller.js';
import pokemonController from '../api/controllers/pokemon_controller.js';
import memberController from '../api/controllers/member_controller.js';
import exerciseController from '../api/controllers/exercise_controller.js';
import fileController from '../api/controllers/file_controller.js';*/
import bodyPartController from '../api/controllers/body_part_controller.js';
import loginController from '../api/controllers/login_controller.js';
import errorController from '../api/controllers/error_controller.js';

// Exportación del middleware
export default (app) => {
  app.use('/', homeController);
  app.use('/user', userController);
  /*app.use('/student', studentController);
  app.use('/admin', adminController);
  app.use('/carrer', carrerController);
  app.use('/pokemon', pokemonController);
  app.use('/member', memberController);
  app.use('/exercise', exerciseController);
  app.use('/file', fileController);*/
  app.use('/body-part', bodyPartController);
  app.use('/', loginController);
  app.use('/error', errorController);
}
