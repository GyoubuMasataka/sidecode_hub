

function previewCreator(){
	let page = window.open("./code_template.html","_blank");
	//page.document.open();
}


window.addEventListener("load", function() {
	//PR.prettyPrint();
	console.log("loading");
});

function createWindow(tagName,value){
	const jsFrame = new JSFrame();
	// Create window
	const frame = jsFrame.create({
		title: 'description - '+tagName,
		left: 20, top: 60, width: 320, height: 220,
		movable: true,// Enable to be moved  by mouse
		resizable: true,// Enable to be resized by mouse
		html: '<div id="my_element" style="padding:10px;font-size:20px;color:darkgray;">'
					+ value
					+'</div>'
	});

	// Show window
	frame.show();
}


function testLog(){
	console.log("testLogActivated");
}
