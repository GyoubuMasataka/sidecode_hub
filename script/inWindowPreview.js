

let previewFlag=0;
function previewSwitch(){
	if(!previewFlag){
		previewFlag=1;
		previewOn();
	}
	else{
		previewFlag=0;
		previewOff();
	}
}

function previewOn(){
	console.log("previewOn");
	document.getElementById("codewr").style.height="49%";
	document.getElementById("descwr").style.height="49%";

	let div=document.createElement("div");
	div.setAttribute("id","preview");
	let inner = document.createElement("iframe");
	inner.setAttribute("src","code_template_tester.html");
	inner.setAttribute("id","previewMain");
	div.appendChild(inner);

	document.body.insertBefore(div,null);
	//previewSet();
	console.log("pre:"+document.getElementById("preview"));
	document.getElementById("preview").style.top="51%";
	document.getElementById("preview").style.height="45%";
	document.getElementById("preview").style.width="100%";
	document.getElementById("preview").style.borderTop="2px solid #E5E5E5";
	//innerMapTester();
	console.log("preMain:"+document.getElementById("previewMain"));
	document.getElementById("previewMain").style.top="51%";
	document.getElementById("previewMain").style.height="100%";
	document.getElementById("previewMain").style.width="98%";
	document.getElementById("previewMain").style.borderTop="2px solid #E5E5E5";
	//document.body.insertBefore(div,null);
	previewSet();
}

function previewOff(){
	document.getElementById("preview").remove();
	document.getElementById("codewr").style.height="100%";
	document.getElementById("descwr").style.height="100%";
}
