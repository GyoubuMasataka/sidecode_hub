//content_scriptは関数名宣言とかはいらないっぽい
//イベントリスナとかは別

  console.log("sidecode:insert-tester.");
  const queryTag = 'a[href^="https://gyoubumasataka.github.io/sidecode_hub/redirect.html?"]';
  //const queryTag = 'a';
  const line = document.querySelectorAll(queryTag);
  console.log(line);
  if(!line.length){
    line[0].href="https://gyoubumasataka.github.io/sidecode_hub/redirect.html?code.html";
  }



  const boxZero = document.createElement('p');
  const codeViewZero = document.createElement('iframe');
  boxZero.id = "sidecode_p";
  codeViewZero.id = "ifCode_0";
  codeViewZero.src = line[0].href.split("?",2)[1];
  codeViewZero.width = "100%";
  codeViewZero.height = "500px";//あとからjsで変える。
  //console.log("content.js;");
  //alert("content.js");
  const heightScript = document.createElement('script');
  heightScript.id = "heightScript";
  heightScript.type = "text/javascript";
  heightScript.src =  "http://localhost:8000/script/heightScript.js";
  //heightScript.src =  "https://gyoubumasataka.github.io/sidecode_hub/script/heightScript.js";



  boxZero.appendChild(codeViewZero);
    boxZero.appendChild(heightScript);
  line[0].after(boxZero);


let box=[0];
let codeView=[0];
    let linknum=1;
    for(linknum=1; linknum<line.length; linknum++){
      box[linknum] = document.createElement('p');
      codeView[linknum] = document.createElement('iframe');
      box[linknum].id = "sidecode_p";
      codeView[linknum].id = "ifCode_"+linknum;
      codeView[linknum].src = line[linknum].href.split("?",2)[1];
      codeView[linknum].width = "100%";
      codeView[linknum].height = "500px";//あとからjsで変える。

      box[linknum].appendChild(codeView[linknum]);
      line[linknum].after(box[linknum]);
    }
