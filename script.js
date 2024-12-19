const timer=document.querySelector('.timer');
const title=document.querySelector('.title');
const startBtn=document.querySelector('.startBtn');
const pauseBtn=document.querySelector('.pauseBtn');
const resumeBtn=document.querySelector('.resumeBtn');
const resetBtn=document.querySelector('.resetBtn');
const pomoCountsDisplay=document.querySelector('.pomoCountsDisplay');


const Work_Time=25*60;
const Break_Time=5*60;
let timerId=null;
let oneRoundCompleted=false;
let totalCount =0;
let paused=false;


const updateTitle= (msg) => {
    title.textContent= msg;
}

const saveLocalCounts =() =>{
    let counts=JSON.parse(localStorage.getItem("pomoCounts"));
    counts !==null ? counts++ : counts = 1;
    
    localStorage.setItem("pomoCounts",JSON.stringify(counts));
}


const countDown=(time)=>{
    return() =>{
        const mins=Math.floor(time/60).toString().padStart(2,'0');
        const secs=Math.floor(time %60).toString().padStart(2,'0');
        timer.textContent=`${mins}:${secs}`;
        // timer.textContent=time;
        time--;
        if(time <0) {
            stopTimer();
            if(oneRoundCompleted==false){
                timerId= startTimer(Break_Time);
                oneRoundCompleted=true;
                updateTitle("It's Break Time");
        } 
        else{
            updateTitle("Completed 1 Round of Pomodoro Technique!");   
             setTimeout(() => updateTitle("Satrt Timer Again!"),2000);
             totalCount++;
             saveLocalCounts();
             showPomoCounts();
              }
    }
    }
}


const startTimer=(startTime) =>{
    if(timerId!== null){
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000)
}


const stopTimer=() =>{
    clearInterval(timerId);
    timerId=null;
}

const getTimeInSeconds=(timeString) =>{
    const[minutes,seconds]=timeString.split(":");
    return parseInt(minutes*60)+ parseInt(seconds);
}
startBtn.addEventListener('click',()=>{
    timerId=startTimer(Work_Time);
    updateTitle("It's Work Time!");
});


resetBtn.addEventListener('click',()=>{
    stopTimer();
    timer.textContent="25:00";

});

pauseBtn.addEventListener('click',()=>{
    stopTimer();
    paused=true;
    updateTitle("Timer Paused");
});

resumeBtn.addEventListener('click',()=>{
   if(paused){
    const currentTime=getTimeInSeconds(timer.textContent);
    timerId=startTimer(currentTime);
    paused=false;
    (!oneRoundCompleted) ? updateTitle("It's Work Time") : updateTitle("It's Break Time");

    
   }
});


const showPomoCounts= () => {
    const counts=JSON.parse(localStorage.getItem("pomoCounts"));
    console.log(counts);
    if(counts >0){
        pomoCountsDisplay.style.display="flex";
    }
    pomoCountsDisplay.firstElementChild.textContent= counts;
}

showPomoCounts();