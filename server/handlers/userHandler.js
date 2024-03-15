const { getAllUsers } = require('../controllers/userController') ;
const { User } = require('../db');
const bcrypt = require('bcryptjs');



// create user handler
const postUserHandler = ('/', async (req, res)=>{
  console.log(req.body);
  try {
    
    const { username, email, password, rol, google } = req.body;

    // verify if email already exists before creating one in helpers
   
    // Hashing the password before saving it
    const saltRounds = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    let userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
      rol,
      google
    });

    const { password: omitPassword, ...userWithoutPassword} = userCreated.toJSON(); // hide password on screen

    res.status(201).send(userWithoutPassword);

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// read all users handler
const userHandler = ('/', async (req, res)=>{
  try {
    let {limit = 5, offset = 0} = req.query;
    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);

    const total = await User.count();

    const allUsers = await getAllUsers(limit, offset);
    res.status(200).send({total, allUsers});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// update user handler
const updateUserHandler = (async (req, res) => {
  try {
    console.log(req.body)
    const {id} = req.params;
    const { password, google, email, ...rest } = req.body;

    // Hash password if updated
    if(password){
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      rest.password = hashedPassword;
    }

    const updatedUser = await User.update(rest,  {where: {id: id}, returning: true} );
    
    res.status(200).send(updatedUser[1][0]);

} catch (error) {
    console.error(error);
    res.status(404).json({error: error.message})
}
});

// delete user handler
const deleteUserHandler = (async (req, res)=>{
  try {
    const id = req.params.id;
    console.log(id);
    await User.destroy({where: {id: id}});
    res.status(200).json({message: 'Usuario borrado.'})

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = {userHandler, postUserHandler, deleteUserHandler, updateUserHandler};