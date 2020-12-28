let num=0;
window.addEventListener('message', function(e) {
  console.log("receive-M:"+e.data);
  tagname="ifCode_"+num;
  num++;
  console.log("tagname:"+tagname);
    document.getElementById(tagname).height = e.data;
}, false);
