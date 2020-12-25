document.addEventListener('keypress', (event) => {
	console.log("orderDebug:keypress");
});
document.addEventListener('keydown', (event) => {
  //console.log("=============Frame Reset=============");
	console.log("orderDebug:keydown");
  //document.test.test.value = "keydown"
	if(event.ctrlKey){
		if(event.key === 'z'){
			event.preventDefault();
			console.log("stop-ctrlZ");}
		}
});

document.addEventListener('input', (event) => {
console.log("orderDebug:input");


});

document.addEventListener('keyup', (event) => {
	console.log("orderDebug:keyup");
});

document.addEventListener('cut', (event) => {
	console.log("cut");
	//console.log("cutEve:"+document.code.codewr.value);
});

document.addEventListener('paste', (event) => {
	console.log("paste");
	//console.log("pasteEve:"+document.code.codewr.value);
});
