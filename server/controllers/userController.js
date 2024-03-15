const axios = require('axios');
require('dotenv').config();

const { User } = require('../db');

const getAllUsers = async (limit = 5, offset = 0) => {
  try {
    return await User.findAll({where:{active: true},limit, offset});

  } catch (error) {
      throw new Error(error);
  }
}

module.exports = {
  getAllUsers
}