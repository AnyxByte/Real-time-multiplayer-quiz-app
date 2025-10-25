export const handleSocket = (wss) => {
  wss.on("connection", (socket) => {
    console.log("A user has connected");

    //broadcast to everyone with message event including sender
    const msg = "hello from backend";
    wss.emit("message", msg);

    console.log(socket, "socket");
  });

  // socket.userId == room.createdBy
  // if yes then listen for start event and if the user starts the quiz
  //    calculate everyone score and tell which user is 1st and which is 2nd and which is 3rd , show the complete leaderboard ( run a timer )
  // after time'sup , send a message as timeup  , then send the final score ....
  //   admin displays the final score
  //
};
