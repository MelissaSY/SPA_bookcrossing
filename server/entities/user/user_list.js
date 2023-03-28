const User = require('./user');
const storage = require("../../services/storage/mysql_manager");

let users = [];

const searchUser = (propName, value) => {
    let user = null;
    let i = 0;
    while(i < users.length && users[i][propName] !== value) {
        i++;
    }
    if(i < users.length) {
        user = users[i];
    }
    return user;
}

const addUser = (login, password, email) => {
    let id = getNextId();
    let newUser = new User(id, login, password, email);
    users.push(newUser);
    return newUser;
    // try {
    //     //storage.addUser(newUser);
    // } catch (err) {
    //     throw err;
    // }
}

const getAllUsers = async () => {
    return users;
}


const deleteUser = (id) => {
    let i = 0;
    while(i < users.length && users[i].id !== id) {
        i++;
    }

    if(i < users.length) {
        users.splice(i, 1);
        try {
           // storage.deleteUser(id);
        } catch(err) {
            throw err;
        }
    }
}

const getNextId = () => {
    let maxId = -1;
    for(let user of users) {
        if(user.id > maxId) {
            maxId = user.id;
        }
    }
    maxId++;
    return maxId;
  }

  const updateUser = (user) => {
    let i = 0;
    while(i < users.length && users[i].id !== id) {
        i++;
    }
    if(i < users.length) {
        users[i] = user;
        try {
           // storage.editUser(user);
        } catch(err) {
            throw err;
        }
    }
  }


  module.exports = {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
    searchUser,
};
  