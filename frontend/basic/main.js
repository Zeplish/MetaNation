/* Moralis init code */
Moralis.initialize(appId);
Moralis.serverURL = serverUrl

init = async () => {
  window.web3 = await Moralis.Web3.enable();
  window.tokenContract = new web3.eth.Contract(
    tokenContractAbi,
    TOKEN_CONTRACT_ADDRESS
  );
  // if the login session has not expired
  let user = Moralis.User.current();
  if (user) {
    let userAddress = user.get("ethAddress");
    console.log(userAddress);
    hideElement(btnLogin);
    showElement(btnLogout);
    showElement(btnProfile);
    showElement(btnCreate);
  }
};

// // if the login session has not expired
// let user = Moralis.User.current();
// if (user) {
//   let userAddress = user.get("ethAddress");
//   console.log(userAddress);
//   hideElement(btnLogin);
//   showElement(btnLogout);
//   showElement(btnProfile);
//   showElement(btnCreate);

//   // btnProfile.innerText = userAddress.substring(0,8).concat('...');
// }

/* login */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "PLease Log in" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        hideElement(btnLogin);
        showElement(btnLogout);
        showElement(btnProfile);
        showElement(btnCreate);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//logOut
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  hideElement(btnProfile);
  hideElement(btnLogout);
  hideElement(btnCreate);
  showElement(btnLogin);
}

// get user profile
async function showUserProfile() {
  user = await Moralis.User.current();
  if (user) {
    let email = user.get("email");
    if (email) {
      userEmail.value = email;
    } else {
      userEmail.value = "";
    }

    userName.value = user.get("username");
    let avatar = user.get("avatar");

    if (avatar) {
      userAvatar.src = avatar.url();
      showElement(userAvatar);
    } else {
      hideElement(userAvatar);
    }
    showElement(userProfile);
  } else {
    login();
  }
}

// save user profile
async function saveUserProfile() {
  user.set("email", userEmail.value);
  user.set("username", userName.value);

  if (uploadUserAvatar.files.length > 0) {
    const avatar = new Moralis.File("avatar name", uploadUserAvatar.files[0]);
    user.set("avatar", avatar);
  }

  await user.save();
}

// publish stream
async function publishStream() {
  if (streamThumbnail.files.length == 0) {
    alert("Please select a thumbnail");
    return;
  } else if (streamTitle.value.length == 0) {
    alert("Please enter a title for your stream");
    return;
  }

  const nftFile = new Moralis.File(
    streamThumbnail.files[0].name,
    streamThumbnail.files[0]
  );
  await nftFile.saveIPFS();

  const nftFilePath = nftFile.ipfs();
  const nftFileHash = nftFile.hash();

  const metadata = {
    name: streamTitle.value,
    streamURL: streamURL.value,
    description: streamDescription.value,
    image: nftFilePath,
  };

  const metadataFile = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });
  await metadataFile.saveIPFS();

  const metadataFilePath = metadataFile.ipfs();
  const metadataFileHash = metadataFile.hash();

  const nftId = await mintNFT(metadataFilePath);

  // Now save this file on Moralis server to then Mint it as NFT
  // For this we will ceate a new object that will create a new table in the database
  // to store all the stream information
  const Stream = Moralis.Object.extend("Stream");

  const stream = new Stream();
  stream.set('name', streamTitle.value);
  stream.set('URL', streamURL.value);
  stream.set('description', streamDescription.value);
  stream.set('nftFilePath', nftFilePath);
  stream.set('nftFileHash', nftFileHash);
  stream.set('metadataFilePath', metadataFilePath);
  stream.set('metadataFileHash', metadataFileHash);
  stream.set('nftId', nftId);
  stream.set('nftContractAddress', TOKEN_CONTRACT_ADDRESS);
  await stream.save();

  console.log(stream);
}


//mint stream as NFT

mintNFT = async (metadataUrl) => {
  const receipt = await tokenContract.methods.createStream(metadataUrl).send({from: ethereum.selectedAddress});
  console.log(receipt);
  return receipt.events.Transfer.returnValues.tokenId;
}

/* button clicks */

btnProfile.onclick = showUserProfile;
// close button
btnCloseUserProfile.onclick = () => hideElement(userProfile);
//login
btnLogin.onclick = login;
//logout
btnLogout.onclick = logOut;
//save
btnSaveUserProfile.onclick = saveUserProfile;
//create
btnCreate.onclick = () => showElement(createStream);
// close stream card
btnCloseStreamCard.onclick = () => hideElement(createStream);
//publish stream
btnPublishStream.onclick = publishStream;


init();