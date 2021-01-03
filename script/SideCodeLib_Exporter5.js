function powerExportHtml(){
	const codeText = document.code.codewr.value;//"[desc test1]\ntest1\n\n[/desc test1]\n[desc test2]\n\ntest2\n[/desc test2]";
	const descText = document.desc.descwr.value;//"[desc test1]\ntest1\n\n[/desc test1]\n[desc test2]\n\ntest2\n[/desc test2]";

	const powerHtml =
	'<!DOCTYPE html>\n<html>\n<head>\n\n'+
	'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">\n'+
	'<meta name="keywords" content="code">\n\n'+
	'<body>\n'+
		'<script src="https://riversun.github.io/jsframe/jsframe.js"></script>\n'+
		'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/atom-one-dark.min.css">\n'+
		'<link rel="stylesheet" href="https://gyoubumasataka.github.io/sidecode_hub/stylesheet/style_view.css">\n'+
		'<link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">\n'+
		'<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></script>\n' +
	  '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>\n'+
		'<script src="https://gyoubumasataka.github.io/sidecode_hub/script/SideCodeLib_Exporter5.js"></script>\n' +
		'<title>sidecode - Preview</title>\n'+

		'<pre  id="codebody_outer">\n'+
			'<code id = "codebody">\n' +
			'preClassText\n'+
			'</code>\n' +
		'</pre>\n\n'+
		'<p id="rawDesc">'+
			descText+'\n'+
		'</p>\n'+
		'<p id="changeCode">'+
			codeStringChanger(codeText)+'\n'+
		//codeText+'\n'+
		'</p>\n'+
		'<p id="rawCode">'+
			codeText+'\n'+
		//codeText+'\n'+
		'</p>\n'+
		'</script>\n'+
		'<script>\n'+
		  'window.addEventListener("load", function() {\n'+
				'localMapTester();\n'+
		    'hljs.initHighlighting();\n'+
				'hljs.initLineNumbersOnLoad();\n'+
		  '});\n\n'+
			'sendHeight();\n'+
			'function sendHeight(){\n'+
			  'let h = document.body.scrollHeight;\n'+
			  'console.log("send-M:"+h);\n'+
			  'parent.postMessage(h, "*");\n'+
			'}\n'+
		'</script>\n'+
		'<style type="text/css">\n'+
			'.hljs-ln td{\n'+
			  'padding:0px;\n'+
			  'padding-left:5px;\n'+
			  'padding-right:5px;\n'+
			'}\n'+
		'</style>\n'+
	'</body>\n'+
		'</html>\n';

	const pipe = new Blob([powerHtml], { "type": "text/plain" });

	//document.getElementById("createFile").href = window.URL.createObjectURL(blob);
	//window.URL.createObjectURL(pipe);
	const url = URL.createObjectURL(pipe);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = 'ExportedTest.html';
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

let descMap = {}
const jsFrame = new JSFrame();

function createWindow(tagName){
	// Create window
	console.log("compare:"+1*(tagName==compareSplit));
	console.log("map:"+descMap[tagName]);
	const value = descMap[tagName];
	const color = colorRandomizer();
	const frame = jsFrame.create({
		name: tagName,
		title: 'description - '+tagName,
		left: 20, top: 60, width: 320, height: 220,
		appearanceName: 'material',
		appearanceParam: {
	    border: {
	        shadow: '2px 2px 10px  rgba(0, 0, 0, 0.5)',
	        width: 1,
	        radius: 6,
	    },
			titleBar: {
        color: 'white',
        background: color
			}
		},
		movable: true,// Enable to be moved  by mouse
		resizable: true,// Enable to be resized by mouse
		html: '<div id="my_element" style="padding:6px;font-size:14px;color:darkgray;">'
					+ value
					+'</div>'
	});

	frame.on('closeButton', 'click', (_frame, evt) => {
		console.log("closer");
		eraceBorderColor(getStartRow(tagName),getRowLength(tagName));
		_frame.closeFrame();
	});

	frame.show();
	changeBorderColor(getStartRow(tagName),getRowLength(tagName),color);
}



let compareSplit;
let globalDescString;
let globalCodeString;

//const globalDescString = document.getElementById("rawDesc").innerHTML;
//const globalCodeString = document.getElementById("rawCode").innerHTML;
function localMapTester(){
	//document.body.codebody.value = document.body.rawCode.value;
	document.getElementById("codebody").innerHTML =
		//codeStringChanger(document.getElementById("rawCode").innerHTML);
		document.getElementById("changeCode").innerHTML;

	const descString = document.getElementById("rawDesc").innerHTML;
	globalDescString = document.getElementById("rawDesc").innerHTML;
	globalCodeString = document.getElementById("rawCode").innerHTML;
	//console.log("gDS:"+globalDescString);
	//console.log("gCS:"+globalCodeString);
	document.getElementById("rawDesc").remove();
	document.getElementById("changeCode").remove();
	document.getElementById("rawCode").remove();
	let mdDesc = descString+"\n";
	mdDesc = mdDesc.replace(/(\[\/desc .*?\])\n*(\[desc .*?\])/g,"$1\n$2");
	mdDesc = mdDesc.replace(/\[desc (.*?)\]/g,"$1_splitMarking");
	mdDesc = mdDesc.replace(/\n?\[\/desc .*?\]/g,"_splitMarking");
	//console.log(mdDesc);
	const splitDesc = mdDesc.split(/_splitMarking\n/g)
	let i;
	compareSplit = splitDesc[1];
	for(i=0; i+1<splitDesc.length; i=i+2){
		descMap[splitDesc[i].replace("\n","")] = splitDesc[i+1];
		//console.log(descMap[splitDesc[i].replace("\n","")]);
		//console.log("i:"+i);
		if(i>100) break;
	}
}

function testerCall(callback){
	console.log("callback"+callback);
}

function codeStringChanger(rawString){
	let modifiedString = rawString.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&#39;");
	 modifiedString = modifiedString.replace(/\[desc (.*?)\]/g,'<input type="button" value="解説 - $1" onclick="createWindow(\'$1\')"/>');
	 modifiedString = modifiedString.replace(/\[\/desc .*?\]/g,'');

	 return modifiedString;
}

//-----------------------------------------------
// copied from SideCodeLib_Code
//-----------------------------------------------
function getStartRow(tagName){
	//const codeString = window.opener.document.getElementById("codewr").value;
	const Reg = "[desc "+tagName+"]";
	let splited = globalCodeString.split(Reg);
	//console.log("splited:"+splited);
	return (splited[0].match( /\n/g ) || [] ).length+1;
}

function getRowLength(tagName){
	//const codeString = window.opener.document.getElementById("codewr").value;
	const Reg = "[desc "+tagName+"]";
	let splited = globalCodeString.split(Reg);
	//console.log(splited);
	const RegEnd = "[/desc "+tagName+"]"
	let secondSplit = splited[1].split(RegEnd)
	return (secondSplit[0].match( /\n/g ) || [] ).length;
}

function changeBorderColor(startRow,rowLength,color){
	let i = 0;
	let row;
	lineColor = "2px solid "+color;
	//console.log("color: "+lineColor);
	for(i=0; i<rowLength; i++){
		const queryTag = 'td[data-line-number="'+(startRow+i)+'"]';
		//console.log("Q:"+queryTag);
		const line = document.querySelectorAll(queryTag);
		//console.log(line);
		line[line.length-1].style.borderLeft=lineColor;
		line[line.length-1].style.borderRight=lineColor;
		if(i==0){
			line[line.length-1].style.borderTop=lineColor;
		}
		else if(i==rowLength-1){
			line[line.length-1].style.borderBottom=lineColor;
		}
	}

}

function eraceBorderColor(startRow,rowLength){
	let i = 0;
	let row;
	lineColor = "none";
	console.log("erace");
	for(i=0; i<rowLength; i++){
		const queryTag = 'td[data-line-number="'+(startRow+i)+'"]';
		//console.log("Q:"+queryTag);
		const line = document.querySelectorAll(queryTag);
		//console.log(line);
		line[line.length-1].style.borderLeft=lineColor;
		line[line.length-1].style.borderRight=lineColor;
		if(i==0){
			line[line.length-1].style.borderTop=lineColor;
		}
		else if(i==rowLength-1){
			line[line.length-1].style.borderBottom=lineColor;
		}
	}

}

let index=0;
let indexIni=false;
function colorRandomizer(){
	if(!indexIni){initIndex();}
	const red  =[200,100,0,0,0,100];
	const green=[0,100,200,100,0,0];
	const blue =[0,0,0,100,200,100];

	//console.log("R:"+red[index]);

	const returner = "rgb("+red[index]+","+blue[index]+","+green[index]+")";
	index = (index+1)%6;
	return returner;
}

function initIndex(){
	index = 0;
	indexIni = true;
}
//
