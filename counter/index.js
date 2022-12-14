// set inital value to zero
let count = 0;
// select value and buttons
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }

    if (count > 0) {
      value.style.color = "green";
    }
    if (count < 0) {
      value.style.color = "red";
    }
    if (count === 0) {
      value.style.color = "#222";
    }
    value.textContent = count;
  });
});

// FILE TEST

const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");

fileSelect.addEventListener(
  "click",
  (e) => {
    if (fileElem) {
      fileElem.click();
      fileElem.addEventListener("change", handleFiles, false);
    }
  },
  false
);

function handleFiles() {
  const files = this.files; /* now you can work with the file list */
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith("image/")) {
      continue;
    }

    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    document.getElementById("preview").appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    sendFiles();
  }
}

// FILE USING DRAG AND DROP

let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

// function handleFiles() {
//   const fileList = this.files; /* now you can work with the file list */
//   console.log({ fileList });
// }


// 



const files = document.getElementById("files"),
fileEle = document.getElementById("fileEle"),
fileList = document.getElementById("fileList");

files.addEventListener("click", (e) => {
if (fileEle) {
fileEle.click();
}
e.preventDefault(); // prevent navigation to "#"
}, false);

fileEle.addEventListener("change", handleFiles, false);

function handleFiles() {
if (!this.files.length) {
fileList.innerHTML = "<p>No files selected!</p>";
} else {
fileList.innerHTML = "";
const list = document.createElement("ul");
fileList.appendChild(list);
for (let i = 0; i < this.files.length; i++) {
  const li = document.createElement("li");
  list.appendChild(li);

  const img = document.createElement("img");
  img.src = URL.createObjectURL(this.files[i]);
  img.file = this.files[i];
  img.height = 60;
  img.classList.add("obj");
  img.onload = () => {
    URL.revokeObjectURL(img.src);
  }
  li.appendChild(img);
  const info = document.createElement("span");
  info.innerHTML = `${this.files[i].name}: ${this.files[i].size} bytes`;
  li.appendChild(info);
  sendFiles()
}
}
}



function sendFiles() {
    const imgs = document.querySelectorAll(".obj");
  
    for (let i = 0; i < imgs.length; i++) {
      new FileUpload(imgs[i], imgs[i].file);
    }
  }



  function FileUpload(img, file) {
    const reader = new FileReader();
    this.ctrl = createThrobber(img);
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
  
    const self = this;
    this.xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const percentage = Math.round((e.loaded * 100) / e.total);
            self.ctrl.update(percentage);
          }
        }, false);
  
    xhr.upload.addEventListener("load", (e) => {
            self.ctrl.update(100);
            const canvas = self.ctrl.ctx.canvas;
            canvas.parentNode.removeChild(canvas);
        }, false);
    xhr.open("POST", "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    reader.onload = (evt) => {
      xhr.send(evt.target.result);
    };
    reader.readAsBinaryString(file);
  }
  
  function createThrobber(img) {
    const throbberWidth = 64;
    const throbberHeight = 6;
    const throbber = document.createElement('canvas');
    throbber.classList.add('upload-progress');
    throbber.setAttribute('width', throbberWidth);
    throbber.setAttribute('height', throbberHeight);
    img.parentNode.appendChild(throbber);
    throbber.ctx = throbber.getContext('2d');
    throbber.ctx.fillStyle = 'orange';
    throbber.update = (percent) => {
      throbber.ctx.fillRect(0, 0, throbberWidth * percent / 100, throbberHeight);
      if (percent === 100) {
        throbber.ctx.fillStyle = 'green';
      }
    }
    throbber.update(0);
    return throbber;
  }
