/** @format */
// object of users

const Users = {
  user1: {
    id: 1,
    Fname: "christian osuji",
    passkey: "JACKSON##" + 400,
    image: "./IMG-20220607-WA0013.jpg",
  },
  user2: {
    id: 2,
    Fname: "Jesse onwuachi",
    passkey: "JESSE".concat(400),
    image: "./JESSE.jpeg",
  },
  user3: {
    id: 3,
    Fname: "ifeanyi osuji",
    passkey: "IFEANYI".concat(400),
    image: "./ifeanti core.jpeg",
  },
};  


const err = document.querySelector("#error");
const succ = document.querySelector("#succ");
const msg = document.querySelector("#message");
const text = document.querySelector("#mytext");
const pass = document.querySelector("#mypass");
const notlogged = document.querySelector(".not-logged-in");
const logged = document.querySelector(".logged-in");
const form = document.querySelector("form");
const logout = document.querySelector("#logout");
const names = document.querySelector("#name");
const eyeopen = document.querySelector(".fa-eye");
const eyeclose = document.querySelector(".fa-eye-slash");
const eyehidden = document.querySelector("#hidden");
const dis = document.querySelector("#dis");
const inp = document.querySelector("#inp");


let arrUser1 = [];
let arrUser2 = [];
let arrUser3 = [];
let x;

form.onsubmit = (e) => {
  e.preventDefault();
  run();
};

function run() {
  try {
    const r = text.value;
    const t = pass.value;
    if (r === "" || t === "") {
      msg.style.display = "block";
      msg.innerHTML = "Fill in details";
      err.style.background = "red";
      setTimeout(() => {
        msg.style.display = "none";
        err.style.background = "";
      }, 2000);   
    } else {
      if (r === Users.user1["Fname"] && t === Users.user1["passkey"]) {
        alert("Welcome ".concat(r));
        err.style.background = "";
        succ.style.background = "green";
        msg.style.display = "block";
        msg.style.background = "green";
        msg.innerHTML = "sign in successful";
        setTimeout(() => {
          notlogged.style.display = "none";
          logged.style.display = "block";
        }, 2000);
        names.innerHTML = r;
        const atts = document.createAttribute("href");
        atts.value = "./events.html";
        inp.setAttributeNode(atts);
        localStorage.setItem('user', r);
        localStorage.setItem("image", Users["user1"].image);
      }
      else if (r === Users.user2["Fname"] && t === Users.user2["passkey"]) {
        alert("Welcome ".concat(r));
        succ.style.background = "green";
        err.style.background = "";
        msg.style.display = "block";
        msg.style.background = "green";
        msg.innerHTML = "sign in successful";
        setTimeout(() => {
          notlogged.style.display = "none";
          logged.style.display = "block";
        }, 2000);
        names.innerHTML = r;
        const atts = document.createAttribute("href");
        atts.value = "./events.html";
        inp.setAttributeNode(atts);
        localStorage.setItem("user", r);
        localStorage.setItem("image", Users["user2"].image);
      }
      else if (r === Users.user3["Fname"] && t === Users.user3["passkey"]) {
        alert("Welcome ".concat(r));
        succ.style.background = "green";
        err.style.background = "";
        msg.style.display = "block";
        msg.style.background = "green";
        msg.innerHTML = "sign in successful";
        setTimeout(() => {
          notlogged.style.display = "none";
          logged.style.display = "block";
        }, 2000);
        names.innerHTML = r;
        const atts = document.createAttribute("href");
        atts.value = "./events.html";
        inp.setAttributeNode(atts);
        localStorage.setItem("user", r);
        localStorage.setItem("image", Users["user3"].image);
      }
      else {
        err.style.background = "red";
        msg.style.display = "block";
        succ.style.background = "";
        msg.innerHTML = "Failed signing in";
      }
    }
  }
  catch (error) {
    alert('big error'.concat(error))
  }
}

function eye() {
  eyeopen.addEventListener("click", function () {
    if (pass.type === "password") {
      pass.type = "text";
      dis.style.display = "none";
      eyehidden.style.display = "block";
    } else {
      throw new Error(alert("function not assigned to button"));
    }
  });
  eyeclose.addEventListener("click", function () {
    if (pass.type === "text") {
      pass.type = "password";
      dis.style.display = "block";
      eyehidden.style.display = "none";
    } else {
      throw new Error(alert("function not assigned to button"));
      }
  });
}
eye()
























