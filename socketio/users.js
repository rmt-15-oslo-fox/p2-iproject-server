const users = [];

//user join room chat
function joinRoom(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

//dapetin user yg baru gabung
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

//user leaves chat
function userLeaveChat(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomChat(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  joinRoom,
  getCurrentUser,
  userLeaveChat,
  getRoomChat,
};
