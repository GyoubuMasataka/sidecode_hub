

function pageEncorder(){
	let page = window.open();
	page.document.open();
	page.document.write('<!DOCTYPE html>\n<html>\n<head>');
	page.document.write('<link rel="stylesheet" href="stylesheet/desert.css">');
	page.document.write('<title>sidecode - Preview</title>');
	page.document.write('<body>\n<pre class="prettyprint linenums">');

	page.document.write('tester');

	page.document.write('</pre>');
	page.document.write('<script id="syntaxjs" src="script/prettify.js"></script>');
	page.document.write('<body>');
	page.document.write('<script id="jframeS" src="https://riversun.github.io/jsframe/jsframe.js"></script>');
	page.document.write('<script id="test" src="null"></script>');

	page.document.write('<script>');
	page.document.write('function tester(){');
	page.document.write('console.log("loaded");');
	page.document.write('document.getElementById("test").src = "script/SideCode_Exporter.js"');
	page.document.write('console.log(document.getElementById("test"));');
	page.document.write('var el = document.createElement("script");');
	page.document.write('el.src = "script/SideCode_Exporter.js";');
	page.document.write('document.body.appendChild(el);');
	page.document.write('');
	page.document.write('}');
	page.document.write('tester();');
	page.document.write('testLog();');
	page.document.write('</script>');

	page.document.write('</body>\n</html>');

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
