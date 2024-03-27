// Importación de módulos
import homeController from '../api/controllers/home_controller.js';
/*import userController from '../api/controllers/user_controller';
import studentController from '../api/controllers/student_controller';
import loginController from '../api/controllers/login_controller';
import adminController from '../api/controllers/admin_controller';
import carrerController from '../api/controllers/carrer_controller';
import pokemonController from '../api/controllers/pokemon_controller';
import memberController from '../api/controllers/member_controller';
import exerciseController from '../api/controllers/exercise_controller';
import bodyPartController from '../api/controllers/body_part_controller';
import fileController from '../api/controllers/file_controller';
import errorController from '../api/controllers/error_controller';*/

// Exportación del middleware
export default (app) => {
  app.use('/', homeController);
  /*app.use('/user', userController);
  app.use('/student', studentController);
  app.use('/error', errorController);
  app.use('/admin', adminController);
  app.use('/carrer', carrerController);
  app.use('/login', loginController);
  app.use('/pokemon', pokemonController);
  app.use('/member', memberController);
  app.use('/exercise', exerciseController);
  app.use('/body_part', bodyPartController);
  app.use('/file', fileController);
  */
}
