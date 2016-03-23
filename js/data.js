var minfo=[
		{src:"http://sc.111ttt.com/up/mp3/1133/8E8A17B7B61B3419661EBE079298C387.mp3",authorName:"xkm",img:"img/1.jpg",songName:'air'},
		{src:"http://sc.111ttt.com/up/mp3/1133/8E8A17B7B61B3419661EBE079298C387.mp3",authorName:"mar5",img:"img/2.jpg",songName:'Animals'},
		{src:"http://sc.111ttt.com/up/mp3/1133/8E8A17B7B61B3419661EBE079298C387.mp3",authorName:"逃跑计划",img:"img/3.jpg",songName:'夜空中最亮的星'},
		{src:"http://sc.111ttt.com/up/mp3/1133/8E8A17B7B61B3419661EBE079298C387.mp3",authorName:"马頔",img:"img/4.jpg",songName:'南山南'},
		{src:"http://sc.111ttt.com/up/mp3/1133/8E8A17B7B61B3419661EBE079298C387.mp3",authorName:"马克",img:"img/5.jpg",songName:'I am yours'}
	];

function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');

        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}
var lrcObj=parseLyric(starlrc);


