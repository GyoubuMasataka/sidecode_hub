function getTextArea(){
	// 値を取得
	const ta1 = document.code.codewr.value;
	document.desc.descwr.value = ta1;
}

function exportCodeHtml(){
	const codeText = document.code.codewr.value;
	const descText = document.desc.descwr.value;
	const pipe = new Blob([descText], { "type": "text/plain" });

	//document.getElementById("createFile").href = window.URL.createObjectURL(blob);
	//window.URL.createObjectURL(pipe);
	const url = URL.createObjectURL(pipe);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = 'foo.txt';
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportProgresser1(){
	const codeText = document.code.codewr.value;
	const descText = document.desc.descwr.value;

	const regStr = new RegExp(/\[desc (.*?)\]/, 'i');
	let replacedCode = codeText.replace(regStr,'<input type="button" value="解説 - $1" onclick="$1()"/>');
	replacedCode = replacedCode.replace(/\[\/desc .*?\]/,'');

	const reader = new FileReader();
	reader.readAsText("code_template.html");
	console.log(reader.result);

	let obj = window.open();
		obj.document.open();
		//obj.document.write();
		obj.document.close();

	console.log(replacedCode);
}


function placeTag(){
	const nullTx = new String("");
	const selectedText = window.getSelection().toString();
	//console.log("ST :"+selectedText );
	let tagName=document.topmenu.TagName.value;

  //console.log("tagName1 : "+tagName);
	if(tagName==nullTx){
		//console.log("tagName-null");
		tagName='XXX';
	}
	const fomrerTag = "[desc "+tagName+"]\n";
	const latterTag = "\n\n[/desc "+tagName+"]\n";

	codeUndoStacker(1);
	document.code.codewr.value = document.code.codewr.value.substr(0, document.code.codewr.selectionStart)
			+ fomrerTag
			+ document.code.codewr.value.substr(document.code.codewr.selectionStart, document.code.codewr.selectionEnd - document.code.codewr.selectionStart)
			+ latterTag
			+ document.code.codewr.value.substr(document.code.codewr.selectionEnd);
	//カーソル位置をうまい加味しないとダメです
	//選択なしの場合はinsertで実行するのもありかも
	//addedDesc = descText + "[desc "+tagName+"]\n\n[/desc "+tagName+"]\n\n"
	//addedDesc = "[desc "+tagName+"]\n\n[/desc "+tagName+"]\n\n"

	descUndoStacker(1);
	document.desc.descwr.value = document.desc.descwr.value.substr(0, document.desc.descwr.selectionStart)
			+ fomrerTag
			+ document.desc.descwr.value.substr(document.desc.descwr.selectionStart, document.desc.descwr.selectionEnd - document.desc.descwr.selectionStart)
			+ latterTag
			+ document.desc.descwr.value.substr(document.desc.descwr.selectionEnd);
	//document.desc.descwr.value = addedDesc;
	/*document.code.codewr.value = "";
	const codeArea = document.getElementById("codewr");
	codeArea.focus();
	document.execCommand('insertText', false, replacedText);*/
	/*const descArea = document.getElementById("descwr");
	descArea.focus();
	document.execCommand('insertText', false, addedDesc);
	*/
	return;
}


let codeUndoStack=[];
let codeRedoStack=[];
let descUndoStack=[];
let descRedoStack=[];

let stackTemp;

let rolebackValue;
let rolebackFocus;
let keyevent = 0;
let removeFlag = 0;
let prevRemoveFlag = 0;
let cutEvent=0;
let pasteEvent=0;
document.addEventListener('keydown', (event) => {
  //console.log("=============Frame Reset=============");
	//console.log("down-key:"+event.keyCode);
	//console.log("keydownEveDebug:"+document.code.codewr.value);

	//変換周りはスペースも変換もエンターも229
	//改行エンターは13、バックスペースは8、デリートは46
	//スペースキーは半角なら32、全角なら229
	//というか全角判定なら全部229らしい(改行は全角内から入らないけど)
	prevRemoveFlag = removeFlag;
	removeFlag = 1*(event.keyCode===8 || event.keyCode===46 || cutEvent===1);
	//console.log("removeFlag:"+removeFlag);
	if(event.ctrlKey){
		if(event.key === 'z'){ keyevent = 1;}
	 	else if(event.key === 'y'){ keyevent = 2;}
		else{keyevent=0;}
	}
	else{ keyevent = 0;
		if(document.activeElement.id=="codewr"){
			redoStackClearer(1);
		}
		else if (document.activeElement.id=="descwr") {
			redoStackClearer(2);
		}
	}


	if(removeFlag!=prevRemoveFlag){
		stackExecutor();
	}
	//console.log("===============FrameReset===============");
	//console.log("KD-Keve:"+keyevent);

	/*if(event.keyCode===32 && event.ctrlKey){
		stackExecutor();
	}*/
	if(keyevent!=0){
		event.preventDefault();
		//rolebackStacker();
		//console.log("input-roleback:"+rolebackFocus.id);
		//focusReverser(rolebackFocus).value = rolebackValue;
		if(keyevent==1){
			//console.log("input-KE1");
			undoExecutor();
		}
		else if(keyevent==2){
			redoExecutor();
		}
		//rolebackFocus.focus();
	}
});

document.addEventListener('keypress', (event) => {
	//const focusArea = document.activeElement;
	//console.log("Kpress-Keve:"+keyevent);
	//console.log("press-key:"+event.keyCode);
	//半角スペース/改行エンターなら反応する
	//全角は問答無用で無反応
	//console.log("keypressEveDebug:"+document.code.codewr.value);
});

document.addEventListener('input', (event) => {
	//テキストエリアとかに変化が出ると実行される
	//逆に、ブラウザ側の処理的に変化が出ない場合はctrl+zとかでも実行されない
	//console.log("input event:"+keyevent);
	//console.log("inputEveDebug:"+document.code.codewr.value);
	//console.log(inputCharReader());
	if(keywordJudger(inputCharReader())==1 && removeFlag!=1){
		stackExecutor();
	}

//console.log("input-Keve:"+keyevent);
	/*
	if(keyevent!=0){
		//console.log("input-roleback:"+rolebackFocus.id);
		focusReverser(rolebackFocus).value = rolebackValue;
		if(keyevent==1){
			console.log("input-KE1");
			undoExecutor();
		}
		else if(keyevent==2){
			redoExecutor();
		}
		rolebackFocus.focus();
	}
	*/
	//console.log("focused:"+document.activeElement.id);
});

document.addEventListener('keyup', (event) => {
	//console.log("keyupEveDebug:"+document.code.codewr.value)
	//console.log("Kup-Keve:"+keyevent);

	//console.log("keyup-end");
});

document.addEventListener('cut', (event) => {
	console.log("cut");
	//console.log("cutEve:"+document.code.codewr.value);
});

document.addEventListener('paste', (event) => {
	console.log("paste");
	//console.log("pasteEve:"+document.code.codewr.value);
});



function codeUndoStacker(mode){
	let i;
	if (mode===1){//Undoスタックに代入
		console.log("cUS-1");
		if(document.code.codewr.value!=codeUndoStack[0]){
			for(i=29; i>0; i--){
				codeUndoStack[i] = codeUndoStack[i-1];
			}
			codeUndoStack[0] = document.code.codewr.value;
			console.log("mode1-cUS[0]:"+codeUndoStack[0]);
		}
		else{
			console.log("same string stack");
		}
	}

	else if (mode===2) {//Undo実行
		console.log("cUS-2");
		//console.log("mode2-cUS[0]:"+codeUndoStack[0]);
		if(codeUndoStack[0]==="null"){
			console.log("emptyStack");
		}
		else{
			codeRedoStacker(1);
			document.code.codewr.value=codeUndoStack[0];
		}
		for(i=0; i<29; i++){
			codeUndoStack[i] = codeUndoStack[i+1];
		}
		//console.log("mode2-NextcUS[0]:"+codeUndoStack[0]);
		codeUndoStack[29] = "null";
		//document.code.codewr.value = "Storage Key Inventoria";
		//console.log("cUS2Debug - Inventoria");
	}
	//console.log("orderDebug:CUS");
	return;
}

function codeRedoStacker(mode){
	let i;
	if (mode==1){
		for(i=29; i>0; i--){
			codeRedoStack[i] = codeRedoStack[i-1];
		}
		codeRedoStack[0] = document.code.codewr.value;
	}

	else if (mode==2) {
		if(codeRedoStack[0]==="null"){
			console.log("emptyStack");
		}
		else{
			codeUndoStacker(1);
			document.code.codewr.value = codeRedoStack[0];
		}
		for(i=0; i<29; i++){
			codeRedoStack[i] = codeRedoStack[i+1];
		}
		codeRedoStack[29] = "null";
	}
}

function descUndoStacker(mode){
	let i;
	if (mode==1){
		if(document.desc.descwr.value!=descUndoStack[0]){
			for(i=29; i>0; i--){
				descUndoStack[i] = descUndoStack[i-1];
			}
			descUndoStack[0] = document.desc.descwr.value;
		}
		else{
			console.log("same string stack");
		}
	}
	else if (mode==2) {
		if(descUndoStack[0]==="null"){
			console.log("emptyStack");
		}
		else{
			descRedoStacker(1);
			document.desc.descwr.value = descUndoStack[0];
		}
		for(i=0; i<29; i++){
			descUndoStack[i] = descUndoStack[i+1];
		}
		descUndoStack[29] = "null";
	}
}

function descRedoStacker(mode){
	let i;
	if (mode==1){
		console.log("dRS-1");
		for(i=29; i>0; i--){
			descRedoStack[i] = descRedoStack[i-1];
		}
		descRedoStack[0] = document.desc.descwr.value;
	}
	else if (mode==2) {
		if(descUndoStack[0]==="null"){
			console.log("emptyStack");
		}
		else{
			descUndoStacker(1);
			document.desc.descwr.value = descRedoStack[0];
		}
		for(i=0; i<29; i++){
			descRedoStack[i] = descRedoStack[i+1];
		}
		descRedoStack[29] = "null";
	}
}


function rolebackStacker(){
	rolebackFocus = document.activeElement;
	rolebackValue = focusReverser(rolebackFocus).value;


	//console.log("rBS - focuson:"+rolebackFocus.id);
	//console.log("value:"+rolebackValue);
}


function redoExecutor(){
	console.log("redoExecutor");
  const focusArea = document.activeElement;
  console.log("focus on:"+focusArea.id);
  if(focusArea.id=="codewr"){
 	 //console.log("codewr-focus");
 	 codeRedoStacker(2);
 	 //document.desc.descwr.value = rolebackValue;
 	 }
  else if(focusArea.id=="descwr"){
 	 //console.log("descwr-focus");
 	 descRedoStacker(2);
 	 //document.code.codewr.value = rolebackValue;
  }
  return;
}

function undoExecutor(){
	console.log("undoExecutor");
	const focusArea = document.activeElement;
	console.log("focus on:"+focusArea.id);
	if(focusArea.id=="codewr"){
		//console.log("codewr-focus");
		codeUndoStacker(2);
		//document.desc.descwr.value = rolebackValue;
		}
	else if(focusArea.id=="descwr"){
		//console.log("descwr-focus");
		descUndoStacker(2);
		//document.code.codewr.value = rolebackValue;
	}
	return;
}

function stackExecutor(){
	console.log("stackExecutor");
	const focusArea = document.activeElement;
	console.log("focus on:"+focusArea.id);
	if(focusArea.id=="codewr"){
		codeUndoStacker(1);
		}
	else if(focusArea.id=="descwr"){
		descUndoStacker(1);
	}
}


function focusReverser(focusArea){
	if(focusArea.id=="codewr"){
		return document.desc.descwr;
	}
	else if(focusArea.id=="descwr"){
		return document.code.codewr;
	}
}

function stackDisplay(stackno){
	let i=0;
	let targetStack;
	if(stackno==1){
		targetStack = codeUndoStack;
	}
	else if (stackno==2){
		targetStack = descUndoStack;
	}
	else if (stackno==3){
		targetStack = codeRedoStack;
	}
	else if (stackno==4){
		targetStack = descRedoStack;
	}

	for(i=0; i<30; i++){
		console.log(i+":"+targetStack[i]);
	}
}

function inputCharReader(){
	const inputArea = document.activeElement;//.id;
	if(inputArea.id=="TagName"){return -2;}
	let inputChar = inputArea.value.substr(inputArea.selectionEnd-1,1);
	//console.log("SE:"+document.code.codewr.selectionEnd);

	console.log("inputChar:\""+inputChar+"\"");
	if(inputChar==""){
		console.log("null-input;");
		return -1;
	}

	return inputChar;
}

function keywordJudger(char){
	const keywords=[" ","　",",",".","、","。","\n"];
	let i;
	for(i=0; i<keywords.length; i++){
		if(char==keywords[i]){return 1;}
	}
	return 0;
}


function beginClear() {
	//document.code.codewr.value = "";
	document.desc.descwr.value = "";
	let i=0;
	for(i=0; i<30; i++){
		codeUndoStack[i]="null";
		codeRedoStack[i]="null";
		descUndoStack[i]="null";
		descRedoStack[i]="null";
	}
	i=0;
	codeUndoStack[i]="";
	descUndoStack[i]="";
}

function redoStackClearer(Area){
	let i=0;
	for(i=0; i<30; i++){
		if(Area==1){
			codeRedoStack[i]="null";
		}
		else if(Area==2){
			descRedoStack[i]="null";
		}
	}
}
