var req=require("sdk/request");
var download=require("lib/util.js");


exports.zipfile=function zipfile(url)
{
this.url=url;
	this.cl=0;
	this.downloadsize=1500;
	this.data=[];
	this.cddata=[];
	this.cdsign=[0x50,0x4b,0x05,0x06];
	this.cdentrysign=[0x50,0x4b,0x01,0x02];
	this.dirdetails=null;
	this.numentry=0;
	this.detailscallb=null;

this.getdet=function(callb){
	download.isresume(this.url,this,
					  function (b,sc){
				if(b==true){
							
					download.filesize(sc.url,sc,function process_len(data,sc)
					  {

					if(data==false)
					{  // no content-lengt
					}
					else{
						 cl=parseInt(data);

						sc.cl=cl;
	sc.download_cd(sc.downloadsize,sc);}});}
	else{
	//noresume;
	}});
};

	
	
	
	
	
	
	
	


this.extract_cdentry=function(data,offset,sc)
{
	
	console.log(data,offset);
	dirs=[];
data=data.slice(offset);//central dir files
	
	start=0;
	for(j=0;j<sc.numentry;j++)
	{
		for(i=0+start;i<4+start;i++)
		{
			if(sc.cdentrysign[i-start]!=data[i])
			{ 
			console.log("signature error");
				return;
			//error;
			}

		}
		console.log(data.slice(0+start,60+start));
	clen=(((data[29+start]<<8)>>>0)|data[28+start]>>>0)>>>0;
	extra=(((data[31+start]<<8)>>>0)|data[30+start]>>>0)>>>0;
	comm=(((data[33+start]<<8)>>>0)|data[32+start]>>>0)>>>0;
	console.log(clen,extra,comm);
	namestart=46;
	names="";
	for(i=0;i<clen;i++)
	{
		names+=""+String.fromCharCode(data[start+namestart+i]);
		
	}
	console.log(names);
	dirs.push({name:names});
	
	start+=46+clen+extra+comm;
	
	console.log("entry at"+start);
	}
	this.detailscallb(dirs);
	
	
	
	
};
	
this.process_cd=function (central,sc){
				
		console.log("Central Directory Fetched");
	console.log(central);
	console.log(central[16],central[17]*256);
	
		offset=((central[19]<<24)>>>0|(central[18]<<16)>>>0|(central[17]<<8)>>>0|central[16])>>0;
		console.log("offset cdentry"+offset);
		sc.numentry=((central[9]<<8)>>>0|central[8])>>0;
console.log(	sc.numentry);
		 
		if(offset<sc.cl-sc.downloadsize)
		{ 
			sc.downloadsize=cl-offset;
			download.downloadit(sc.url,offset,cl-1,sc,function(res,status,sc){
															sc.data=res;
															sc.dirdetails=sc.extract_cdentry(res,0,sc);	});
		}
		else{
		sc.dirdetails=sc.extract_cdentry(sc.data,sc.downloadsize-(sc.cl-offset),sc);
		}};






this.download_cd=function(lastnbytes,sc)
{					cl=sc.cl;
						if(lastnbytes>100*1024)
						{
							
						//error curropt
							
						}
 
 						if(lastnbytes>cl)
						{
						lastnbytes=cl;
						}
 						
					download.downloadit(sc.url,cl-lastnbytes,cl-1,sc,function(res,status,sc)
					{
						console.log(sc);
					sc.data=res;
						sc.extract_cd(res,sc);
					}
						   );
	};

this.extract_cd=function (data,sc)
	{
		console.log(data.length);
		console.log(sc);	
			j=0;
			flag=0;
			cd_1=0;
			for(i=0;i<data.length;i++)
			{
			//console.log("compare "+data[i]+","+sc.cdsign[i]);
				if(data[i]==sc.cdsign[j])
				{
					if(j==0)
					{cd_1=i;}
				j++;		
				}
				else if(data[i]==sc.cdsign[0])
				{
				cd_1=i;
					j=1;
				
				}
				else{j=0;}
				if(j==sc.cdsign.length)
				{	flag=1;
					break;
				}
			}
	if(flag==1){			
			console.log("data sign found at"+cd_1);
			data=data.slice(cd_1);
			sc.process_cd(data,sc);
		}			
		else{
		console.log(data.slice(-25));
			sc.downloadsize+=3000;
			sc.download_cd(sc.downloadsize,sc);
			
		}
	};
}








