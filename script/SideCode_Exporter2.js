

function previewCreator(){
	let preClassText = document.code.codewr.value;
	console.log("pre:"+preClassText);
	preClassText = preClassText.replace(/\[desc (.*?)\]\n(.*?)\n/g,'$2<input type="button" value="desc-$1" onclick="createWindow($1)"/>\n');
	preClassText = preClassText.replace(/\[\/desc .*?\]/g,'');
	console.log("rep:"+preClassText);

	let html =
	'<!DOCTYPE html>\n<html>\n<head>\n'
	+'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">\n<meta name="keywords" content="code">\n'

	+'<link rel="stylesheet" href="stylesheet/desert.css">\n'
	+'<title>sidecode - Preview</title>\n'

	+'<body>\n'
	+'<pre class="prettyprint linenums">\n'
	+preClassText
	+'</pre>\n'

	+'<script src="script/prettify.js"></script>\n'
	+'<script>\n'
	+  'function activater(){\n'
	+    'PR.prettyPrint();\n'
	+		 'console.log("loaded.");'
	+  '});\n'
	+'</script>\n'

	//+'<body>\n'
	+  '<script src="https://riversun.github.io/jsframe/jsframe.js"></script>\n'
	+  '<script src="script/SideCode_Exporter2.js"></script>\n'

	+ '<input type="button" value="testLog" onclick="activater();"/>'

	+'</body>\n'
	+'</html>\n'

	createMainWindow(html);

}


window.addEventListener("load", function() {
	//PR.prettyPrint();
	console.log("loading");
});

function createWindow(tagName){
	const jsFrame = new JSFrame();
	// Create window
	const frame = jsFrame.create({
		title: 'description - '+tagName,
		left: 20, top: 60, width: 320, height: 220,
		movable: true,// Enable to be moved  by mouse
		resizable: true,// Enable to be resized by mouse
		html: '<div id="my_element" style="padding:10px;font-size:20px;color:darkgray;">'
					//+ value
					+'</div>'
	});

	// Show window
	frame.show();
}

function createMainWindow(htmlValue){
	const jsFrame = new JSFrame();
	// Create window
	const frame = jsFrame.create({
		title: 'preview',
		left: 10, top: 10, width: 640, height: 360,
		movable: true,// Enable to be moved  by mouse
		resizable: true,// Enable to be resized by mouse
		html: htmlValue//'<div id="my_element" style="padding:2px;font-size:14px;">'
					//+htmlValue
					//+'</div>'
	});

	// Show window
	frame.show();
}


function testLog(){
	console.log("testLogActivated");
	PR.prettyPrint();
}
