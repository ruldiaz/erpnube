const axios = require('axios');
require('dotenv').config();

const { User } = require('../db');

const getAllUsers = async () => {
  try {
    return await User.findAll();

  } catch (error) {
      throw new Error(error);
  }
}

module.exports = {
  getAllUsers
}