var observerService = Components.classes["@mozilla.org/observer-service;1"]
						.getService(Components.interfaces.nsIObserverService);


observe : function(aSubject, aTopic, aData) {
  if ("http-on-examine-response" == aTopic) {
    let url;

    aSubject.QueryInterface(Components.interfaces.nsIHttpChannel);
    
	  try{accepth=aSubject.getResponseHeader("Accept-Ranges");
		  content=aSubject.getResponseHeader("Content-Disposition");
		if(content.slice(0,3)=="atta")
		{
		
		}
		 
		 }
	  catch(ex)
	  {
	  return;
	  
	  }
	  
		  
		  
    }
  }

observerService.addObserver(observe,"http-on-examine-response")