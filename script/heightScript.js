window.addEventListener('message', function(e) {
  console.log("receive-M:"+e.data);
    document.getElementById('ifCode').height = e.data;
}, false);
