cx={};
sets=null;

function getusage(handler)
{
	

	function onpromise(item){
		
	if(item.data_count==undefined)
		{cx={};}
	else
		{cx=item.data_count;
		}
	
		
console.log(cx);
	
	handler(cx);

}
browser.storage.local.get("data_count").then(onpromise);

}
function resetmonth()
{
	//console.log("reset month done");
browser.storage.local.set({data_count:{bytesinmonth:0,bytesinday:cx.bytesinday}}).then(function(){
cx.bytesinmonth=0;
display_counts(1);

});
	
}
function resetday()
{
	
	//console.log("reset day done");
	cx.bytesinday=0;
browser.storage.local.set({data_count:{bytesinmonth:cx.bytesinmonth,bytesinday:0}}).then(function(){

display_counts(0);

});
	

}

function display_counts(d)
{
if(!get_pref("ison"))
		{
		
		
		}
	num_pr=0;
		if(get_pref("ismb")==0)
		{
		
		divfac=1024*1024*1024;
			
		data_txt="GB";
			num_pr=3;
		
		}
		else{
		divfac=1024*1024;
			num_pr=2;
			data_txt="MB";
		}

																															
												//		console.log("counters set");																		
				 $('#month_val').text(""+(d?0:cx.bytesinmonth/divfac).toFixed(num_pr)+" "+data_txt);
				
						$('#day_val').text(""+ (!d?0:cx.bytesinday/divfac).toFixed(num_pr)+" "+data_txt);		

}
function get_pref(str)
{
return sets[str];
	
	
	
	
}
function set_pref(key,value)
{

sets[key]=value;
	//console.log(sets);
	browser.storage.local.set({settings:sets});
	
}
function toggle_mb(){
	//console.log("togmb");
	$('#knoble_mb').toggleClass('knob-on');
	$('#knoble_mb').toggleClass('knob-off');
set_pref("ismb",(get_pref("ismb")+1)%2);
	
	num_pr=0;
	
		if(get_pref("ismb")==0)
		{
		
		divfac=1024.0*1024.0*1024.0;
			
		data_txt="GB";
		num_pr=3;
		}
		else{
		divfac=1024.0*1024.0;
			data_txt="MB";
			num_pr=2;
		}

																																
								//	console.log(cx);																					
				 $('#month_val').text(""+(cx.bytesinmonth/divfac).toFixed(num_pr)+" "+data_txt);
						$('#day_val').text(""+ (cx.bytesinday/divfac).toFixed(num_pr)+" "+data_txt);	
}
tab_listed=false;;
function select_tab(tab)
{if(tab==2&&tab_listed==false)
{
	tab_listed=true;
browser.storage.local.get("stat").then(function(details){
if(details.stat=={}){return;}
	
	stt=details.stat;
	arr=[]
	
	for(url in stt){
		
	if(details.stat.hasOwnProperty(url))
	{
		arr.push({u:url,b:stt[url]});
	}	
	}
	if (arr.length==0){
					 // console.log("error");
		return;
					  }
	for(i=0;i<arr.length;i++)
	{
	for(j=i+1;j<arr.length;j++)
	{
	if(arr[j].b>arr[i].b)
	{
	t=arr[i];
		arr[i]=arr[j];
		arr[j]=t;
	
	}
	
	}
	
	
	}
maxx=arr[0].b;
	len=10>arr.length?arr.length:10;
for( i=0;i<len;i++){

	
	$('#stats').append("<div class=\"stat-item\"><div class=\"stat-url\" >"+arr[i].u+"</div><div class=\"stat-mb\">"+(arr[i].b/(1024*1024)).toFixed(2)+" MB</div><div style=\"height:12px;position:absolute;margin-top:22px;margin-left:15px;transform:skewX(-20deg);background-color:#ff5722;width:"+parseInt(85*arr[i].b/maxx)+"%\"></div></div>");

	

}



	

});



}
	for( i=1;i<=3;i++){
		$('#tab'+i).removeClass('tab-selected');
$('#tabc'+i).removeClass('tab-content-selected');
		$('#tabc'+i).addClass('tab-content-unselected');
	}
	$('#tabc'+tab).removeClass('tab-content-unselected');
	$('#tabc'+tab).addClass('tab-content-selected');
	$('#tab'+tab).addClass('tab-selected');

}
function toggle_power(){
$('#knoble').toggleClass('knob-on');
	$('#knoble').toggleClass('knob-off');
//	console.log("togpo");
	//notify({cmd:"enabletoggle"});
	browser.runtime.sendMessage({cmd:"enabletoggle"});


}
getusage(function(cxx){cx=cxx;
					   
					 // console.log(cxx);
					 

		browser.storage.local.get("settings").then(function (details){if(details.settings==undefined){sets=null;}else	{sets=details.settings;
																																
			
																														 
																														 
																														 var d=new Date();
	if(d.getMonth()!=get_pref("cur_month"))
								 {
		
	   set_pref("cur_month",d.getMonth())	;					 
								 resetmonth();
								 }
	   if(d.getDay()!=get_pref("cur_day"))
	   {
	   set_pref("cur_day",d.getDay());
	   resetday();
	   }
		if(!get_pref("ison"))
		{
		
		
		}
		if(get_pref("ismb")==0)
		{
		
		divfac=1024*1024*1024;
			
		data_txt="GB";
		
		}
		else{
		divfac=1024*1024;
			data_txt="MB";
		}

																																
														//console.log("counters set");																		
				 $('#month_val').text(""+(cx.bytesinmonth/divfac).toFixed(2)+" "+data_txt);
						$('#day_val').text(""+ (cx.bytesinday/divfac).toFixed(2)+" "+data_txt);			
																													 
																													 
				$('#tmb').click(toggle_mb);
				$('#ton').click(toggle_power);
				$('#reset_day').click(resetday);
				$('#reset_month').click(resetmonth);
				$('#tab1').click(function(){select_tab(1)});
				$('#tab2').click(function(){select_tab(2)});
				$('#tab3').click(function(){select_tab(3)});
																														 
																														 
																														 if(get_pref("ison")==false)
																														 {
																														 
																														 $('#knoble').toggleClass('knob-on');
																														 $('#knoble').toggleClass('knob-off');
																														 }
																														  if(get_pref("ismb")==1)
																														 {
																														 
																														 $('#knoble_mb').toggleClass('knob-on');
																														 $('#knoble_mb').toggleClass('knob-off');
																														 }
																													 
							//console.log("evcent locked");																						 
																													 
																																}})
			.catch(function(rtt){//console.log("error in getting settings :"+rtt )
								});

	
					
					  
					  });






