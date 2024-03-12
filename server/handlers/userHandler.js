const { getAllUsers } = require('../controllers/userController') ;
const { User } = require('../db');
const bcrypt = require('bcryptjs');

// create user handler
const postUserHandler = ('/', async (req, res)=>{
  console.log(req.body);
  try {
    let {
      username,
      email,
      password,
      active,
      isAdmin,
      firstLogin,
      googleImage,
      googleId
    } = req.body;

    // Hashing the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
      active,
      isAdmin,
      firstLogin,
      googleImage,
      googleId
    });

    res.status(201).send(userCreated);

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// read all users handler
const userHandler = ('/', async (req, res)=>{
  try {
    const allUsers = await getAllUsers();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// update product handler
const updateUserHandler = (async (req, res) => {
  try {
    console.log(req.body)
    const {id} = req.params;
    const { username,  email, password, active, isAdmin, firstLogin, googleImage, googleId} = req.body;

    // Hash password if updated
    let updatedUserData = {username,  email, password, active, isAdmin, firstLogin, googleImage, googleId};
    if(password){
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedUserData.password = hashedPassword;
    }

    const updatedUser = await User.update(updateUserHandler,  {where: {id: id}, returning: true} );
    

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