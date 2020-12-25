
document.addEventListener('keydown', (event) => {

});

document.addEventListener('keypress', (event) => {
	console.log("keypress.");
	console.log(document.getElementById("codebody").textContent);
		testerCall("keyup");
});

document.addEventListener('input', (event) => {

});

document.addEventListener('keyup', (event) => {

});

document.addEventListener('cut', (event) => {

});

document.addEventListener('paste', (event) => {

});

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

	// Show window
	frame.show();
	console.log(getStartRow(tagName));
	console.log("~ "+getRowLength(tagName));
	changeBorderColor(getStartRow(tagName),getRowLength(tagName),color);


}



let compareSplit;
function mapTester(){
	const descString = window.opener.document.getElementById("descwr").value;
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
		console.log(descMap[splitDesc[i].replace("\n","")]);
		console.log("i:"+i);
		if(i>100) break;
	}
}

function getStartRow(tagName){
	const codeString = window.opener.document.getElementById("codewr").value;
	const Reg = "[desc "+tagName+"]";
	let splited = codeString.split(Reg);
	console.log(splited);
	return (splited[0].match( /\n/g ) || [] ).length+1;
}

function getRowLength(tagName){
	const codeString = window.opener.document.getElementById("codewr").value;
	const Reg = "[desc "+tagName+"]";
	let splited = codeString.split(Reg);
	console.log(splited);
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
		console.log("Q:"+queryTag);
		const line = document.querySelectorAll(queryTag);
		console.log(line);
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
		console.log("Q:"+queryTag);
		const line = document.querySelectorAll(queryTag);
		console.log(line);
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
function colorRandomizer(){

	const red  =[200,100,0,0,0,100];
	const green=[0,100,200,100,0,0];
	const blue =[0,0,0,100,200,100];

	console.log("R:"+red[index]);

	const returner = "rgb("+red[index]+","+blue[index]+","+green[index]+")";
	index = (index+1)%6;
	return returner;

}

function testerCall(callback){
	console.log("callback"+callback);
}
