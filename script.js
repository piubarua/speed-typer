const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of words for game
const words=['ability','able','about','above','accept','according','account','across','act','action','activity','actually','add','address','administration','admit','adult','affect','after','again','against','age',
    'agency','agent','agree','agreement','ahead','air','allow','almost','alone','along','already','also','although','always','American','among','amount','analysis','animal','another','answer','anyone','anything',
    'appear','apply','approach','area','argue','arm','around','arrive','art','article','artist','ask','assume',
    'attack','attention','attorney','audience','author','authority','available','avoid','away','baby','back','bag','ball','bank','base','beat','beautiful','because','become','before','begin','behavior','behind','believe',
    'benefit','best','better','between','beyond','bill','billion','black','blood','blue','board','body','book','born','both','boy','break','bring','brother','budget','build','building','business','but',
    'buy','call','camera','campaign','cancer','candidate','capital','card','care','career','carry','case','catch','cause','cell','center','central','century','certain',
    'certainly','chair','challenge','chance','change','character','charge','check','child','choice','choose','church','citizen','city','civil','claim','class','clear','clearly',
    'close','coach','cold','collection','college','color','come','commercial','common',' community','company',' compare','computer','concern','condition','consider','conference','consumer',
    'contain','continue','control','cost','could','country','couple','course','court','cover','create','crime','cultural','culture','current','customer','data','dark',
    'daughter','deal','dead','death','debate','decade','decide','decision','deep','defense','degree','Democrat',' democratic','describe','design','despite','detail',' determine','develop','development','difference',
    'different','difficult','dinner','direction','director','discover','discuss','discussion','disease','doctor','door','down','draw','dream','drive','drop','drug',
    'during','each','early','east','easy','economic','economy','edge','education','effect','effort','eight','either','election','employee','energy','enjoy',
    'enough','enter','entire','environment','environmental','especially','establish','even','evening','event','everybody',' everyone','everything','evidence','exactly',' example','executive',
    'exist','expect','experience','expert','explain','fact','factor','fail',' fall','family','fast','father','fear','federal',
    'feel','feeling','field','fight','figure','film','final','financial','find','fine','finger','finish','fire','first','fish','floor','follow',
    'food','foreign','forget','former','forward','friend','from','front','full','fund','future','game','garden','general','generation','girl','give',
    'glass','goal','good','government','great','green','ground','group','grow','growth','guess','hair','half','hand','hang','happen',
    'happy','hard','have','head','health','hear','heart','heat','heavy','help','here','herself','high','himself',
    'history','hold','home','hope','hospital','hotel','hour','house','huge','human','hundred','husband','idea',
    'identify','image','imagine','impact','important','improve','include','including','increase','indeed','indicate','individual','industry','information','inside','instead',
    'institution','interest','interesting','international','interview','investment','involve','issue','item','itself','join','just','keep','kill','kind','knowledge','land','language',
    'large','last','late','later','laugh','leader','learn','least','leave','left','legal','less','letter','level',
    'look','machine','magazine','main','maintain','major','majority','make','manage','management','manager','many','market','marriage','material','matter',
   ' mean','measure','media',' nature','near','nearly','necessary','need', 'network','never',
];

//Init word
let randomWord;

//Init score
let score=0;

//Init time
let time=15;
 
// set difficulty to value in ls or medium
let difficulty=localStorage.getItem('difficulty')!==null?
localStorage.getItem('difficulty'):'medium';


//set difficulty select value
difficultySelect.value= localStorage.getItem('difficulty')!==null?
localStorage.getItem('difficulty'):'medium';

//focus on text on start
text.focus();

//start counting down
const timeInterval=setInterval(updateTime,1000);

//generate random word from array
function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

//add word to DOM
function addWordToDOM(){
    randomWord=getRandomWord();
    word.innerHTML=randomWord;
}

//update score
function updateScore(){
    score++;
    scoreEl.innerHTML=score;
}

//update time
function updateTime(){
    time--;
    timeEl.innerHTML=time+'s';

    if(time===0){
        clearInterval(timeInterval);
        //end game
        gameOver();
    }
}

//game over,show end screen
function gameOver(){
    endgameEl.innerHTML=`
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick="location.reload()">Reload</button>
    `;

    endgameEl.style.display='flex';
}
addWordToDOM(); 

//event listeners

//typing
text.addEventListener('input',e=>{
    const insertedText=e.target.value;

    if(insertedText === randomWord){
        addWordToDOM();
        updateScore(); 
        //clear
        e.target.value='';

        if(difficulty==='hard'){
            time+=2;
        }
        else if(difficulty==='medium'){
            time+=3;
        }
        else{
        time += 5;
        }
        updateTime();
    }
});

//settings btn click
settingsBtn.addEventListener('click',()=>
settings.classList.toggle('hide'));

//settings select
settingsForm.addEventListener('change',e=>{
    difficulty=e.target.value;
    localStorage.setItem('difficulty',difficulty);
});