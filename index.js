var self = require("sdk/self");
var util=require("lib/util.js");
var zip=require("lib/zip.js");
let {Ci,Cu}=require("chrome");

/*
Cu.import('resource://gre/modules/devtools/dbg-server.jsm');
if (!DebuggerServer.initialized) {
  DebuggerServer.init();
  // Don't specify a window type parameter below if "navigator:browser"
  // is suitable for your app.
  DebuggerServer.addBrowserActors();
}
var listener = DebuggerServer.createListener();
listener.portOrPath = '6000';
listener.open();
pref("devtools.debugger.remote-enabled", true);
*/
console.log("started");
util.register_proxy();
var  url="http://www.colorado.edu/conflict/peace/download/peace.zip";
var url2="http://www.advancedbytes.in/downloads/test.zip";
var url3="https://storage.googleapis.com/appengine-sdks/featured/google_appengine_1.9.49.zip";
var zipf=new zip.zipfile(url3);
console.log(zipf);

zipf.getdet();







