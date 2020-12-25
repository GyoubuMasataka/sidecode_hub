//content_scriptは関数名宣言とかはいらないっぽい
//イベントリスナとかは別

  console.log("sidecode:insert-tester.");
  const queryTag = 'a[href^="https://www.google.com"]';
  //const queryTag = 'a';
  const line = document.querySelectorAll(queryTag);
  console.log(line);
  if(!line.length){
    line[0].href="http://localhost:8000/code.html";
  }

  const box = document.createElement('p');
  const codeView = document.createElement('iframe');
  box.id = "sidecode_p";
  codeView.id = "ifCode";
  codeView.src = "http://localhost:8001/ExportedTest.html";
  codeView.width = "100%";
  codeView.height = "500px";//あとからjsで変える。
  //console.log("content.js;");
  //alert("content.js");
  const heightScript = document.createElement('script');
  heightScript.id = "heightScript";
  heightScript.type = "text/javascript";
  heightScript.src =  "http://localhost:8001/script/heightScript.js";



  box.appendChild(codeView);
    box.appendChild(heightScript);
  line[0].after(box);
