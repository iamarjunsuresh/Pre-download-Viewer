var req=require("sdk/request");
var {Cc, Ci, Cu} = require("chrome");
var {Cc, Ci} = require("chrome");
exports.col=col=console.log;




function is_resumesupported(urll,sc,callb)
{


req.Request({ url: urll,
  onComplete: function (response) {
    console.log(response.headers);
	  if(response.headers["Accept-Ranges"]==undefined){
		  
	  callb(false,sc);
	  }
	  else{
		  console.log("resume supported");
	  callb(true,sc);
		  
	  
	  }}}).head();


}
function filesize(urll,sc,callb)
{

console.log(urll);
req.Request({ url: urll,
  onComplete: function (response) {
    console.log(response.headers);
	  if(response.headers["Content-Length"]==undefined){
		  console.log(response.headers);
	  callb(false,sc);
	  }
	  else{
		  
		  console.log("content length recieved");
	  callb(response.headers["Content-Length"],sc);
		  
	  
	  }}}).head();


}
function download_part(urll,start,end,sc,callb)
{
	  console.log("downloading....("+start+","+end+")");
	/*  req.Request({url:urll,headers:{"Range":"bytes="+start+"-"+end},onComplete:function (response){

		  res=[];
		  rescode=[];
		  console.log(response.headers);
		  console.log("len of array is"+response.text.length);
		 txt=response.text;

		res=bytearrayfromstr(response.text);
		  console.log("res length"+res.length);
	//	  console.log("rescode length"+rescode.length);
		  console.log(res);
		//  console.log(rescode);
	  callb(res,"true");
	  
	  
	  }}).get();
	  
*/
var request = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"]
                .createInstance(Ci.nsIJSXMLHttpRequest);
request.open("GET", urll);
	request.setRequestHeader("Range","bytes="+start+"-"+end);
/*request.onload = function()
{
	console.log("onload");
  onUnload.unload();
console.log(request);
  var arrayBuffer = request.response;
  if (arrayBuffer)
  { console.log(onUnload);
    var byteArray = new Uint8Array(arrayBuffer);
	console.log(byteArray);
    callb(byteArray,"true",sc);
  }
};
*/
	request.responseType="arraybuffer";
	
	request.addEventListener("loadend", function(e) {
    //console.log(this, e, e.type, this.response );
		
		
		console.log("loadend");
  var arrayBuffer = this.response;
		//console.log(arrayBuffer);
console.log(this.responseType);
    var byteArray = new Uint8Array(arrayBuffer);
		console.log(byteArray);
console.log("callback called");
    callb(byteArray,"true",sc);

});
request.onerror = function()
{ callb(null,"false",sc);
  onUnload.unload();
}
request.send(null);

var onUnload = {
  unload: function()
  {
    // Make sure to abort the request if the extension is disabled
    try
    {
      request.abort();
    }
    catch (e) {}
  }
};


}
function bytearrayfromstr(str) {
  // TODO(user): Use native implementations if/when available
  var out = [], p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = (c >> 6) | 192;
      out[p++] = (c & 63) | 128;
    } else if (
        ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
        ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
      out[p++] = (c >> 18) | 240;
      out[p++] = ((c >> 12) & 63) | 128;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    } else {
      out[p++] = (c >> 12) | 224;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    }
  }
  return out;
};
exports.register_proxy=function reg_proxy()
{
var dd = Cc["@mozilla.org/network/protocol-proxy-service;1"].getService(Ci.nsIProtocolProxyService);
  dd.registerFilter(pro(dd), 10);


}
function pro(pps)
{

 var google_proxy = pps.newProxyInfo("direct", "", 0, 1, -1, null);

                var filter= {

                    applyFilter: function (pps, uri, proxy) {


                      
                           return google_proxy;


                        }

                    }

                
              return filter;

}








exports.downloadit=download_part;
exports.isresume=is_resumesupported;
exports.filesize=filesize;
