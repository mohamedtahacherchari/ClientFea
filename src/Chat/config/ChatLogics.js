
export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};


  /*export const getSender = (loggedUser, users) => {
    console.log('loggedUser:', loggedUser);
    console.log('users[0]:', users[0]);
    console.log('users[1]:', users[1]);
    return users[0]._id === loggedUser._id ? users[1].firstName : users[0].firstName ;
  };*/
  //on a modifier loggedUser.data to loggedUser.data._id

 /* export const getSender = (loggedUser, users) => {
    if (users[0] && users[1]) {
      return users[0]._id === loggedUser._id
      ? users[1].firstName + ' ' + users[1].lastName
      : users[0].firstName + ' ' + users[1].lastName;
      // return users[0]._id === loggedUser._id ? users[1].firstName+users[1].lastName : users[0].firstName+users[1].lastName;
    } else {
      return "";
    }
  };*/
/*  export const getSender = (loggedUser, users) => {
    if (users && users.length >= 2) {
      const sender = users.find(user => user._id !== loggedUser._id);
  
      if (sender) {
        return sender.firstName + ' ' + sender.lastName;
      }
    }
      return "Nom de l'expéditeur manquant";
};*/

/*export const getSender = (loggedUser, users) => {
  console.log("Logged User:", loggedUser);
  console.log("Users:", users);

  if (users && users.length >= 2) {
    const sender = users.find(user => user._id !== loggedUser._id);

    console.log("Sender:", sender);

    if (sender) {
      return sender.firstName + ' ' + sender.lastName;
    }
  }

  console.log("Nom de l'expéditeur manquant");
  return "Nom de l'expéditeur manquant";
};*/

/*export const getSender = (loggedUser, users) => {
  console.log("Logged User:", loggedUser);
  console.log("Users:", users);

  if (users && users.length > 0) {
    const sender = users.length > 1
      ? users.find(user => user._id !== loggedUser._id)
      : users[0];

    console.log("Sender:", sender);

    if (sender) {
      return sender.firstName + ' ' + sender.lastName;
    }
  }

  console.log("Nom de l'expéditeur manquant");
  return "Nom de l'expéditeur manquant";
};*/
/*export const getSender = (loggedUser, users) => {
  console.log("Logged User:", loggedUser);
  console.log("Users:", users);

  if (users && users.length > 0) {
    const sender = users.find(user => user._id !== loggedUser._id) || loggedUser;

    console.log("Sender:", sender);

    return sender.firstName + ' ' + sender.lastName;
  }

  console.log("Nom de l'expéditeur manquant");
  return "Nom de l'expéditeur manquant";
};*/
/*export const getSender = (loggedUser, users) => {
  console.log("Logged User:", loggedUser);
  console.log("Users:", users);

  // Assurez-vous que users est défini et a une longueur supérieure à 0
  if (users && users.length > 0) {
    // Trouvez l'utilisateur qui n'est pas l'utilisateur connecté
    const sender = users.find(user => user._id !== loggedUser._id) || null;

    // Vérifiez que l'expéditeur a été trouvé
    if (sender) {
      console.log("Sender:", sender);

      // Retournez le nom complet de l'expéditeur
      return sender.firstName + ' ' + sender.lastName;
    } else {
      console.log("Nom de l'expéditeur manquant");
      return "Nom de l'expéditeur manquant";
    }
  } else {
    console.log("Aucun utilisateur trouvé");
    return "Aucun utilisateur trouvé";
  }
};
*/
export const getSender = (loggedUser, users) => {
  console.log("Logged User:", loggedUser);
  console.log("Users:", users);

  if (users && users.length > 0) {
    const sender = users.find(user => user._id !== loggedUser._id) || loggedUser;

    console.log("Sender:", sender);

    return sender.firstName + ' ' + sender.lastName;
  }

  console.log("Nom de l'expéditeur manquant");
  return "Nom de l'expéditeur manquant";
};

/*export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};  
*/
export const getSenderFull = (loggedUser, users) => {
  // Assurez-vous que users est défini et a au moins deux éléments
  if (users && users?.length >= 2) {
    return users[0]?._id === loggedUser?._id ? users[1] : users[0];
  } else {
    // Gérez le cas où users n'est pas défini ou n'a pas assez d'éléments
    return null; // ou une autre valeur par défaut selon votre logique
  }
};