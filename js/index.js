window.onload=function(){
	var songIndex=0;
	var container=document.getElementById('container');
	var mxbg=document.getElementById('mx-bg');
	var mxMain=getByClass(container,'mx-main');
	var mxcover=getByClass(container,'mx-cover');
	var mxphoto=getByClass(container,'mx-photo');
	var pause=getByClass(container,'mx-pause');
	var perSong=getByClass(container,'mx-prev');
	var nextSong=getByClass(container,'mx-next');
	var audio=document.getElementById('audio');
	var photo=mxphoto.getElementsByTagName('img')[0];
	var authorName=getByClass(container,'s-author');
	var songName=getByClass(container,'s-name');
	var lyric=getByClass(container,'mx-lyric').getElementsByTagName('ul')[0];
	var lyrics=lyric.getElementsByTagName('li');
	var changeItem=getByClass(container,'mx-item');
	var changeView1=changeItem.getElementsByTagName('span')[0];
	var changeView2=changeItem.getElementsByTagName('span')[1];
	var allTimeSpan=getByClass(container,'allTime');
	var curTimeSpan=getByClass(container,'curTime');
	var timeBar=getByClass(container,'time-bar');
	var barLen=timeBar.offsetWidth;
	var dragIcon=getByClass(container,'drag-icon');
	var iconW=dragIcon.offsetWidth;
	var dragBar=getByClass(container,'drag-bar');
	var curTime=0;
	var allTime=audio.duration;
	var timer=null;

	init();
	//绑定暂停事件
	addEvent(pause,"click",function(){
		checkPlay(audio);
	});
	//绑定下一首事件
	addEvent(nextSong,"click",function(){
		songIndex++;
		songIndex=setIndex();
		init();
	});
	//绑定上一首事件
	addEvent(perSong,"click",function(){
		songIndex--;
		songIndex=setIndex();
		init();
	});
	//点击跳转到歌词页面
	addEvent(changeView1,"click",function(){
		toCover();
	});
	//点击跳转到封面
	addEvent(changeView2,"click",function(){
		toIyric();
	});
	//初始化音乐
	function init(){
		audio.src=minfo[songIndex].src;
		photo.src=minfo[songIndex].img;
		mxbg.style.backgroundImage="url("+minfo[songIndex].img+")";
		authorName.innerHTML=minfo[songIndex].authorName;
		songName.innerHTML=minfo[songIndex].songName;
		lyric.style.top="50%";
		lyric.innerHTML=setLyric();
		photo.className="";
		addEvent(audio,"canplay",function(){
			toPlay(audio);
			setTime(audio);
		});
	}
	//跳转到歌词
	function toIyric(){
		mxMain.style.transform="translateX(-50%)";
	}
	//跳转到封面
	function toCover(){
		mxMain.style.transform="translateX(0)";
	}
	//设置歌词
	function setLyric(){
		var str="";
		for(var i in lrcObj){
			str+="<li data-time="+i+">"+lrcObj[i]+"</li>";
		}
		return str;
	}
	//滚动歌词
	function moveLyric(time){
		var t=Math.ceil(time);
		var curli=findcurLi(t);
		console.log(t);
	}
	//找到当前时间对应歌词
	var icur=0
	function findcurLi(t){
		for(var i=0;i<lyrics.length;i++){
			if(lyrics[i].getAttribute("data-time")==t){
				lyrics[icur].className="";
				lyric.style.top=lyric.offsetTop-30+"px";
				lyrics[i].className="lyc-current";
				icur=i;
			}
		}
	}
	//设置总时间
	function setTime(obj){
		allTime=obj.duration;
		allTimeSpan.innerHTML=toTime(allTime); 
	}
	//设置当前播放歌曲index
	function setIndex(){
		if(songIndex>minfo.length-1){
			return 0;
		}
		if(songIndex<0){
			return minfo.length-1;
		}
		return songIndex;
	}
	//点击时，暂停播放播放暂停
	function checkPlay(obj){
		obj.paused?toPlay(obj):toPause(obj);
	}
	//播放音频
	function toPlay(obj){
		clearInterval(timer);
		obj.play();
		photo.className="rotate";
		photo.style.animationPlayState="running";
		timer=setInterval(function(){
			if(obj.ended){
				clearInterval(timer);
			}else{
				curTime=obj.currentTime;
				changeTime(curTime);
				moveLyric(curTime);
			}
		},1000);
	}
	//暂停音频
	function toPause(obj){
		obj.pause();
		photo.style.animationPlayState="paused";
		//photo.className="";
		clearInterval(timer);
	}
	//设置当前播放进度
	function changeTime(time){
		curTimeSpan.innerHTML=toTime(time);
		var left=curTime/allTime*barLen;
		dragIcon.style.left=(left-iconW/2)+'px';
		dragBar.style.width=left+'px';
	}
}
//获取指定类名的元素
function getByClass(parent,clsName){
	var classArr=[];
	var allEle=parent.getElementsByTagName('*');
	for(var i=0,len=allEle.length;i<len;i++){
		if(clsName==allEle[i].className){
			classArr.push(allEle[i]);
		}
	}
	return classArr.length==1?classArr[0]:classArr;
}
//添加事件绑定
function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent("on"+type,fn);
	}else{
		obj["on"+type]=fn;
	}
}
//将毫秒数转换成00:00格式
function toTime(iNum){
	iNum = parseInt( iNum );
	var iM = Math.floor(iNum/60)>9?Math.floor(iNum/60):"0"+Math.floor(iNum/60);
	var iS = Math.floor(iNum%60)>9?Math.floor(iNum%60):"0"+Math.floor(iNum%60);
	return iM + ':' + iS;
}