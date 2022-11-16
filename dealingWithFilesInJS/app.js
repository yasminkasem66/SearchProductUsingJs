

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
