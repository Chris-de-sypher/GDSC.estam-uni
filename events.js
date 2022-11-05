/** @format */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAw2WyHlWYEiNsV5UQFG8U9x3yYKNPl-HI",
  authDomain: "trial-for-knowledge.firebaseapp.com",
  databaseURL: "https://trial-for-knowledge-default-rtdb.firebaseio.com",
  projectId: "trial-for-knowledge",
  storageBucket: "trial-for-knowledge.appspot.com",
  messagingSenderId: "448665083255",
  appId: "1:448665083255:web:af45da9197a707bc7e5572",
  measurementId: "G-6172HGWR3P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  update,
  set,
  get,
  remove,
  child,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const db = getDatabase();

// ----------reference--------//
var nameboxs = document.getElementById("Namebox");
var rollbox = document.getElementById("rolbox");
var sectbox = document.getElementById("Secbox");
var genbox = document.getElementById("Genderbox");

// var insbtn = document.getElementById("Insert");
// var selbtn = document.getElementById("select");
var upbtn = document.getElementById("update");
var delbtn = document.getElementById("Delete");
var venues = document.querySelector("#venue");
var title = document.querySelector("#title");
var banner = document.querySelector("#banner");
var area = document.querySelector("#location");
var hrs = document.querySelector("#hour");
var date = document.querySelector("#date");
var mins = document.querySelector("#minutes");
var sec = document.querySelector("#sect");
var text = document.querySelector("#text");

// ----------insert data --------//
function insertData() {
  set(ref(db, "EstamDatabase/" + rollbox.value), {
    title: nameboxs.value,
    EventNumber: rollbox.value,
    Area: sectbox.value,
    venue: genbox.value,
  })
    .then(() => alert("Data saved successfully"))
    .then(() => location.reload())
    .then((err) => {
      throw new Error(err);
    })
    .catch((error) =>
      console.log(
        "sorry we couldn't save the data, check your work code" + error
      )
    );
}

const card = document.querySelector(".card");
const eventNot = document.querySelector(".event-not");
const sets = document.querySelector("#set");
sets.addEventListener("click", (e) => {
  e.preventDefault();
  setInterval(() => {
    times();
  }, 1000);
  GetImagefromFirestore();
  selectbox();
  card.style.display = "block";
  eventNot.style.display = "none";
});

const publish = document.querySelector("#publish");

function publishs() {
  publish.addEventListener("click", (e) => {
    e.preventDefault();
    if (card.style.display == "block") {
      if (!window.Notification) return;

      Notification.requestPermission().then(showNotification);
    } else {
      alert("No event created");
    }
  });
}

function showNotification(permission) {
  try {
    if (permission !== "granted") return;

    let notification = new Notification(`${x} created an event`, {
      body: "Click to see notification and register for the event",
      icon: "googledev.png",
      image: xx,
    });

    notification.onclick = () =>
      (window.location.href = "https://gdsc.community.dev/estam-university/");
  } catch (err) {
    alert("error passing " + err);
  }
}
publishs();

// select the data to the boxes--------//
function selectbox() {
  const reffordb = ref(db);

  get(child(reffordb, "EstamDatabase/" + rollbox.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        (title.innerHTML = snapshot.val().title),
          (area.innerHTML = snapshot.val().Area),
          (venues.innerHTML = snapshot.val().venue);
      } else {
        console.log("Data not found in the database");
      }
    })
    .catch((error) => console.log("Please try again" + error));
}
// -----------update data-----------//
function UpdateData() {
  update(ref(db, "EstamDatabase/" + rollbox.value), {
    NameOfStd: namebox.value,
    Section: sectbox.value,
    Gender: genbox.value,
  })
    .then(() => {
      console.log("Data Updated successfully");
    })
    .then(() => location.reload())
    .catch((error) => console.log("Fail to update data" + error));
}
// -------remove---------//
function deleteData() {
  remove(ref(db, "TheStudent/" + rollbox.value))
    .then(() => {
      console.log("Data Deleted successfully");
    })
    .then(() => location.reload())
    .catch(() => console.log("Fail to Delete data" + error));
}
// ----------add event to insert button ------//
//insbtn.addEventListener('click', insertData);
// ----------add event to select button ------//
// selbtn.addEventListener("click", selectbox);
// ---------updateData-----//
upbtn.addEventListener("click", UpdateData);
// ---------delete data-----//
delbtn.addEventListener("click", deleteData);

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";

const dbd = getStorage();

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

const clouddb = getFirestore();

//   -------create an array to store the images--------//
let files = [];
var reader = new FileReader();

var namebox = document.getElementById("textfield");
let extbox = document.getElementById("extlab");
let imgbox = document.getElementById("image");
var upgbox = document.getElementById("upprogress");
var upbox = document.getElementById("upload");
var selbox = document.getElementById("selects");
var rebox = document.getElementById("retrieve");

var input = document.createElement("input");
input.type = "file";

input.onchange = (e) => {
  files = e.target.files;

  var extension = GetFileExt(files[0]);
  var name = GetfileName(files[0]);

  namebox.value = name;
  extbox.innerHTML = extension;

  reader.readAsDataURL(files[0]);
};

reader.addEventListener("load", (e) => {
  e.preventDefault();
  let upload_image = reader.result;
  imgbox.src = upload_image;
});

selbox.onclick = function () {
  input.click();
};

function GetFileExt(file) {
  var temp = file.name.split(".");
  var ext = temp.slice(temp.length - 1, temp.length);
  return "." + ext[0];
}
function GetfileName(file) {
  var temp = file.name.split(".");
  var fname = temp.slice(0, -1).join(".");
  return fname;
}

async function uploadbtn() {
  var imgUpLoad = files[0];

  var ImgName = namebox.value + extbox.innerHTML;

  const metaData = {
    contentType: imgUpLoad.type,
  };

  const storage = dbd;
  const storageRef = sRef(storage, "Image/" + ImgName);
  const UploadTask = uploadBytesResumable(storageRef, imgUpLoad, metaData);
  UploadTask.on(
    "state-changed",
    (snapshot) => {
      var progress = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      upgbox.innerHTML = "upload" + progress + "%";
    },
    (error) => {
      console.log("error: not uploaded" + error);
    },
    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        saveURLtoFirestore(downloadURL);
      });
    }
  );
}

async function saveURLtoFirestore(url) {
  let name = namebox.value;
  let ext = extbox.innerHTML;

  var ref = doc(clouddb, "ImageLinks/" + name);

  await setDoc(ref, {
    ImgName: name + ext,
    ImageURL: url,
  });
}

async function GetImagefromFirestore() {
  let name = namebox.value;

  let ref = doc(clouddb, "ImageLinks/" + name);

  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    imgbox.src = docSnap.data().ImageURL;
    banner.src = docSnap.data().ImageURL;
  }
}

// setting a count down for the website
function times() {
  const t = text.value;
  const r = new Date(t).getTime();
  const now = new Date();
  const gap = r - now;
  console.log(gap);

  // calculate the times
  const seconds = 1000;
  const minutes = 60 * seconds;
  const hour = 60 * minutes;
  const day = 24 * hour;

  // divide them now
  const daysAhead = Math.floor(gap / day);
  const horAhead = Math.floor((gap % day) / hour);
  const minutesAhead = Math.floor((gap % hour) / minutes);
  const secondsAhead = Math.floor((gap % minutes) / seconds);

  date.innerText = `${daysAhead}Days`;
  hrs.innerText = `${horAhead}h`;
  mins.innerText = `${minutesAhead}m`;
  sec.innerText = `${secondsAhead}s`;
}

// setting for save button
const run = document.getElementById("submit");

run.onclick = (e) => {
  e.preventDefault();
  insertData();
  uploadbtn();
};

namebox.focus();

// setting registration link for event card
const registers = document.querySelector("#ftext");
const forms = document.querySelector("#forms");
const a = document.querySelector("#register");
forms.addEventListener("submit", (e) => {
  e.preventDefault();
  let u = registers.value;
  let i = document.createAttribute("href");
  i.value = u;
  a.setAttributeNode(i);
  // console.log(i)
  alert("saved successfully");
  registers.value = "";
});

// creating a logout button
const rel = document.querySelector("#close");
rel.addEventListener("click", function (e) {
  e.preventDefault();
  const logout = confirm("Do you wish to logout");
  if (logout) {
    alert("Now off the Dashboard");
    window.close();
  } else {
    alert("still on the Dashboard");
  }
});

// saving logged-in admin data to the browser storage
let x;
let xx;
function settings() {
  const userName = document.querySelector("#username");
  const userImage = document.querySelector("#images");
  x = localStorage.getItem("user");
  userName.innerHTML = x;
  xx = localStorage.getItem("image");
  const cc = document.createAttribute("src");
  cc.value = xx;
  userImage.setAttributeNode(cc);
}
settings();

// setting space for all parties
const events = document.querySelector("#event-space");

const createEvt = document.querySelector(".create-evt");
const setin = document.querySelector(".settings-pl");
const admin = document.querySelector(".admin-dash");

// const main = document.querySelector("main")
const gl = document.querySelector("#gl");
const vl = document.querySelector("#vl");
const cl = document.querySelector("#cl");
const clik = document.querySelector("#clik");

(function () {
  gl.addEventListener("click", function (e) {
    e.preventDefault();
    createEvt.hidden = true;
    events.hidden = true;
    admin.hidden = true;
    setin.hidden = false;
  });
  vl.addEventListener("click", function (e) {
    e.preventDefault();
    createEvt.hidden = true;
    events.hidden = true;
    admin.hidden = false;
    setin.hidden = true;
  });
  cl.addEventListener("click", function (e) {
    e.preventDefault();
    createEvt.hidden = false;
    events.hidden = true;
    admin.hidden = true;
    setin.hidden = true;
  });
  clik.addEventListener("click", function (e) {
    e.preventDefault();
    createEvt.hidden = true;
    events.hidden = false;
    admin.hidden = true;
    setin.hidden = true;
  });
})();

// (function () {

// })();

// setting for users but never used
const Users = [
  {
    id: 1,
    Fname: "christian osuji",
    image: "./IMG-20220607-WA0013.jpg",
    bio: "Christian osuji is the Lead of GDSC ESTAM university. He is known for his coding abilities and most especially he is a javascript programmer. Christian is a devoted programmer, he has dedicated his time to learn and indeed he is at his best. He is a fullstack developer with a year experience.",
    link: "https://github.com/chris-de-sypher/",
  },
  {
    id: 2,
    Fname: "Jesse onwuachi",
    image: "./JESSE.jpeg",
    bio: "Mr.Jesse is a pythoneer and also a digital marketer, he has built alot of websites, such as e-commerce websites, commerciall websites etc. He is so passionate about tech and also loove contributing to the open source community.",
  },
  {
    id: 3,
    Fname: "ifeanyi osuji",
    image: "./ifeanti core.jpeg",
    bio: "software Engineer and also a frontend frameworks master. Co-lead of GDSC ESTAM university and regarded as Mr.ESTAM. He is a passionate tech maker and also a contributor at open source.",
    link: "https://github.com/Augustine56/",
  },
];
//  setting for admins
const characterss = document.querySelector(".admin-character");
function charestersInadmin() {
  const characterLikes = Users.map((itemers) => {
    return `<div class="character-card" data-id="${itemers.id}">
              <div class="character-img">
                <img src="${itemers.image}" alt="${itemers.Fname}" />
                <a href=""><i class="fa-brands fa-github"></i></a>
              </div>
              <div class="profile-desc">
                <h2 id="admin-name">${itemers.Fname}</h2>
                <p>
                  ${itemers.bio}
                </p>
              </div>
              <div class="likes">
                <span><i class="fa-solid fa-thumbs-up"></i></span
                ><span id="counting">1</span>
              </div>
            </div>`;
  }).join("");
  characterss.innerHTML = characterLikes;
}

charestersInadmin();

// calling the background handlers
const imgInput = document.querySelectorAll(".img-bg-span");
const colorInput = document.querySelectorAll(".coloring");
const buttonInput = document.querySelector("#add");
const buttonInputs = document.querySelector("#add-colors");

// setting image as the background
imgInput.forEach((item) => {
  const taget = item.getAttribute("data-image");
  item.style.background = `url(${taget})`;
  item.classList.add("added");
  item.addEventListener("click", function (e) {
    e.preventDefault();
    item.style.borderColor = "skyblue";
    if (item.style.borderColor === "skyblue") {
      setTimeout(() => {
        item.style.borderColor = "";
      }, 1000);
    }
    buttonInput.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".create-evt").style.background = `url(${taget})`;
      item.style.borderColor = "";
    });
  });
});

// setting backgroudcolor
colorInput.forEach((itemer) => {
  const tagets = itemer.getAttribute("data-color");
  itemer.style.background = tagets;
  itemer.addEventListener("click", function (e) {
    e.preventDefault();
    itemer.style.borderColor = "skyblue";
    if (itemer.style.borderColor === "skyblue") {
      setTimeout(() => {
        itemer.style.borderColor = "";
      }, 1000);
    }
    buttonInputs.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".create-evt").style.background = tagets;
      itemer.style.borderColor = "";
    });
  });
});

// typewritter for placeholder
var textInareas = document.querySelector("textarea");

var customNodeCreator = function (character) {
  // Add character to input placeholder
  textInareas.placeholder = textInareas.placeholder + character;

  // Return null to skip internal adding of dom node
  return null;
};

var onRemoveNode = function ({ character }) {
  if (textInareas.placeholder) {
    // Remove last character from input placeholder
    textInareas.placeholder = textInareas.placeholder.slice(0, -1);
  }
};

var typewriter = new Typewriter(null, {
  loop: true,
  delay: 75,
  onCreateTextNode: customNodeCreator,
  onRemoveNode: onRemoveNode,
});

typewriter.typeString("Input the message inside here").pauseFor(300).start();

// Ai talk
const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(sentence) {
  const text_speak = new SpeechSynthesisUtterance(sentence);
  text_speak.rate = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hr = day.getHours();

  if (hr >= 0 && hr < 12) {
    speak("Good Morning");
  } else if (hr == 12) {
    speak("Good noon ");
  } else if (hr > 12 && hr <= 17) {
    speak("Good Afternoon");
  } else {
    speak("Good Evening");
  }
}

window.addEventListener("load", () => {
  speak("Welcome to GDSC estam university website");
  speak("How may i help you sir...");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  speakThis(transcript.toLowerCase());
};

btn.addEventListener("click", badclick);

function badclick() {
  recognition.start();
}

function speakThis(message) {
  const speech = new SpeechSynthesisUtterance();

  speech.text = "I did not understand what you said please try again";

  if (message.includes("hey") || message.includes("hello")) {
    const finalText = "Hello sir";
    speech.text = finalText;
  } else if (message.includes("how are you")) {
    const finalText = "I am fine sir tell me how can i help you";
    speech.text = finalText;
  } else if (message.includes("name")) {
    const finalText =
      "My name is Gideon, I'm create and trained by Christian osuji the Lead of the GDSC estam university";
    speech.text = finalText;
  } else if (message.includes("old")) {
    const finalText =
      "I don't know my age i have been existing since when i was coded";
    speech.text = finalText;
  } else if (message.includes("left")) {
    const finalText = "command recieved Resizing the left screen";
    speech.text = finalText;
    resizenav.style.width = 50 + "px";
    resizenav.style.transitionDuration = 2 + "s";
    resizenav.style.transitionDelay = 0.5 + "s";
    resizenav.style.transitionTimingFunction = "ease";
    const calcuate = 100 + "%";
    const calculate = 60 + "px";
    main.style.left = 60 + "px";
    main.style.width = `calc(${calcuate - calculate})`;
    main.style.transitionDuration = 2 + "s";
    main.style.transitionDelay = 0.5 + "s";
    main.style.transitionTimingFunction = "ease";

    resize.style.display = "inline-block";
    arrowleft.style.display = "none";

    setTimeout(() => {
      liresize.forEach((items) => {
        items.style.display = "none";
      });
      images.style.width = 45 + "px";
      images.style.height = 56 + "px";
      images.style.transitionDuration = 2 + "s";
      images.style.transitionDelay = 0.5 + "s";
      images.style.transitionTimingFunction = "ease";
    }, 1000);
  } else if (message.includes("love")) {
    const finalText = "Yes creator am at your command";
    speech.text = finalText;
  } else if (message.includes("community")) {
    const finalText = "Community page opened";
    speech.text = finalText;
    setTimeout(() => {
      window.open("./community.html");
    }, 2000);
  } else if (message.includes("about")) {
    const finalText = "About page opened";
    speech.text = finalText;
    setTimeout(() => {
      window.open("./About.html");
    }, 2000);
  } else if (message.includes("normal")) {
    const finalText =
      "command recieved reverting screen size, screen size back to normal";
    speech.text = finalText;
    resizenav.style.width = "";
    resizenav.style.transitionDuration = 2 + "s";
    resizenav.style.transitionDelay = 0.5 + "s";
    resizenav.style.transitionTimingFunction = "ease";
    main.style.left = "";
    main.style.width = "";
    resize.style.display = "none";
    arrowleft.style.display = "inline-block";

    setTimeout(() => {
      liresize.forEach((items) => {
        items.style.display = "";
      });
      images.style.width = "";
      images.style.height = "";
    }, 1000);
  } else if (message.includes("log")) {
    const logout = confirm("Do you wish to logout");
    if (logout) {
      const finalText = "Operation received closing website";
      speech.text = finalText;
      setTimeout(() => {
        window.close();
        alert("Now off the Dashboard");
      }, 2000);
    } else {
      const finalText = "Operation received still on the dashboard";
      speech.text = finalText;
      setTimeout(() => {
        alert("still on the Dashboard");
      }, 2000);
    }
  } else if (message.includes("repeat")) {
    const finalText =
      "Good Day sir or ma i'm Estam GDSC Assistant  i'll be taking you around the website. I am your Ai and friend please use me well find some relevant infomation, I can be of a good help to you. I'm only created to server the purpose of the GDSC";
    speech.text = finalText;
  } else if (message.includes("mad")) {
    const finalText =
      "hahahahahahaha, am not mad but you are so dumb to call me mad. For being hard on me I am leaving. self destruct activated, 1, 2, 3, 4, offline";
    speech.text = finalText;
    let buttons;
    setTimeout(() => {
      buttons = btn.removeEventListener("click", badclick);
    }, 2000);
    // let wt;
    setTimeout(() => {
      returns();
    }, 23000);
    function returns() {
      const texts1 = "Continue with your lonely life...... Looser!";
      const texts2 = "Good to have you back, hahahahaha sorry i laughed";
      speak("Do you want me back");
      let f = prompt("If you want me back type yes");
      if (f) {
        btn.addEventListener("click", badclick);
        speak(texts2)
      } else {
        speak(texts1)
         if (location.reload() == true) {
        speak("why should i let you reload");
        const d = prompt("Give me a good reason");
        if (d !== null) {
          location.reload;
        } else {
          speak("I can't let you reload")
          location.reload == null;
        }
      }
      }
      // const confirms = prompt("Do you want me back? yes or No");
      //   if(confirms.includes(!"yes")
      //     ? (speech.text = "you are not ready looser!")
      //     : confirms.includes("yes")
      //       ? setTimeout(() => btn.addEventListener("click", badclick), 1000)
      //       : (speech.text = texts1));
    }
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    const finalText = "Opening Google";
    speech.text = finalText;
  } else if (message.includes("close google")) {
    window.close("https://google.com", "_blank");
    const finalText = "Closing Google";
    speech.text = finalText;
  } else if (message.includes("open brave")) {
    window.open("https://brave.com", "_blank");
    const finalText = "Opening Google";
    speech.text = finalText;
  } else if (message.includes("open microsoft")) {
    window.open("  https://www.microsoft.com", "_blank");
    const finalText = "Microsoft edge ";
    speech.text = finalText;
  } else if (message.includes("open instagram")) {
    window.open("https://instagram.com", "_blank");
    const finalText = "Opening instagram";
    speech.text = finalText;
  } else if (message.includes("open twitter")) {
    window.open("https://twitter.com", "_blank");
    const finalText = "Opening Twitter";
    speech.text = finalText;
  } else if (message.includes("facebook")) {
    window.open("https://www.facebook.com/blockcoding/", "_blank");
    const finalText = "Opening Facebook";
    speech.text = finalText;
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "This is what i found on internet regarding " + message;
    speech.text = finalText;
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
      "_blank"
    );
    const finalText = "This is what i found on wikipedia regarding " + message;
    speech.text = finalText;
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = time;
    speech.text = finalText;
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = date;
    speech.text = finalText;
  } else if (message.includes("calculator")) {
    window.open("Calculator:///");
    const finalText = "Opening Calculator";
    speech.text = finalText;
  } else {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "I found some information for " + message + " on google";
    speech.text = finalText;
  }

  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;

  window.speechSynthesis.speak(speech);
}
const resize = document.querySelector(".fa-xmark");
const main = document.querySelector("main");
const arrowleft = document.querySelector(".fa-arrow-left-long");
const arrowright = document.querySelector(".fa-arrow-right-from-bracket");
const ban = document.querySelector(".fa-ban");
const resizenav = document.querySelector("#navbar");
const secondnav = document.querySelector(".second-nav");
const liresize = document.querySelectorAll(".lins");
const getimg = document.querySelector("#img-get");
const images = document.querySelector("#images");

(function () {
  // const resize = document.querySelector(".fa-xmark");
  // const main = document.querySelector("main");
  // const arrowleft = document.querySelector(".fa-arrow-left-long");
  // const arrowright = document.querySelector(".fa-arrow-right-from-bracket");
  // const ban = document.querySelector(".fa-ban");
  // const resizenav = document.querySelector("#navbar");
  // const secondnav = document.querySelector(".second-nav");
  // const liresize = document.querySelectorAll(".lins");
  // const getimg = document.querySelector("#img-get");
  // const images = document.querySelector("#images");

  arrowright.addEventListener("click", function (e) {
    e.preventDefault();

    secondnav.classList.add("animate__slideOutRight");
    secondnav.classList.remove("animate__slideInRight");
    ban.style.display = "inline-block";
    arrowright.style.display = "none";
  });
  ban.onclick = (e) => {
    e.preventDefault();
    secondnav.classList.remove("animate__slideOutRight");
    secondnav.classList.add("animate__slideInRight");
    ban.style.display = "none";
    arrowright.style.display = "inline-block";
  };
  arrowleft.addEventListener("click", (e) => {
    e.preventDefault();
    resizenav.style.width = 50 + "px";
    resizenav.style.transitionDuration = 2 + "s";
    resizenav.style.transitionDelay = 0.5 + "s";
    resizenav.style.transitionTimingFunction = "ease";
    const calcuate = 100 + "%";
    const calculate = 60 + "px";
    main.style.left = 60 + "px";
    main.style.width = `calc(${calcuate - calculate})`;
    main.style.transitionDuration = 2 + "s";
    main.style.transitionDelay = 0.5 + "s";
    main.style.transitionTimingFunction = "ease";

    resize.style.display = "inline-block";
    arrowleft.style.display = "none";

    setTimeout(() => {
      liresize.forEach((items) => {
        items.style.display = "none";
      });
      images.style.width = 45 + "px";
      images.style.height = 56 + "px";
      images.style.transitionDuration = 2 + "s";
      images.style.transitionDelay = 0.5 + "s";
      images.style.transitionTimingFunction = "ease";
    }, 1000);
  });
  resize.onclick = (e) => {
    e.preventDefault();

    resizenav.style.width = "";
    resizenav.style.transitionDuration = 2 + "s";
    resizenav.style.transitionDelay = 0.5 + "s";
    resizenav.style.transitionTimingFunction = "ease";
    main.style.left = "";
    main.style.width = "";
    resize.style.display = "none";
    arrowleft.style.display = "inline-block";

    setTimeout(() => {
      liresize.forEach((items) => {
        items.style.display = "";
      });
      images.style.width = "";
      images.style.height = "";
    }, 1000);
  };
  // if (window.matchMedia("(max-width:320px)")) {
  //   arrowleft.removeEventListener("click", (e));
  // }
})();
