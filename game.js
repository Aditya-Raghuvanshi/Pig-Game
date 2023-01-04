
var score,roundScore,currElement,prevNumber,winningScore;
initialise();


//*********for roll button
document.querySelector('.btn--roll').addEventListener('click',function(){
     
    var randomNumber1 = Math.floor(Math.random()*6)+1;
    var randomNumber2 = Math.floor(Math.random()*6)+1;

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('dice-1').src = 'dice-' + randomNumber1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + randomNumber2 + '.png';

    //if any one dice has current score 1 than current score will be lost and next player chance
    if(randomNumber1!==1 && randomNumber2!==1)
    {
        roundScore += randomNumber1+randomNumber2;
        document.querySelector('#current--'+currElement).textContent = roundScore; //display result in current.
       
       
        //two consecutive 6 will make player to loose its entire score and next player chance.
        // if(prevNumber+randomNumber!==12)
        //     document.querySelector('#current--'+currElement).textContent = roundScore; //display result in current.
        // else 
        // {
        //     roundScore=0;
        //     document.querySelector('#current--'+currElement).textContent = roundScore;
        //     document.querySelector('#score--'+currElement).textContent = 0;
            
        //     toggle();
        // }    
        // prevNumber=randomNumber;


    }    
    else{ 
        roundScore=0;
        document.querySelector('#current--'+currElement).textContent = roundScore;

        toggle();
    }
});

//********for hold button
document.querySelector('.btn--hold').addEventListener('click',function(){

    score[currElement]+=roundScore;
    document.querySelector('#score--'+currElement).textContent = score[currElement];
   
    var input = document.querySelector('.final-score').value;
    
    //checking if input is not empty(not entered by user) then only assign the winning score otherwise default.
    if(input)
    {
        winningScore=input;
    }
    else{
        winningScore=100;
    }
    //checking winner
    if(checkWinner(winningScore))
    {
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';

        document.querySelector('.player--'+currElement).classList.add('player--winner');
        document.querySelector('.player--'+currElement).classList.add('name');
        document.querySelector('.player--'+currElement).classList.remove('player--active');

        document.querySelector('.btn--roll').disabled = true;
        document.querySelector('.btn--hold').disabled = true;
    }
    else{
        roundScore=0;
        document.querySelector('#current--'+currElement).textContent = roundScore;
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';

        toggle();
    }
           
});

//************for new Game
document.querySelector('.btn--new').addEventListener('click',initialise);

function toggle()
{
    document.querySelector('.player--'+currElement).classList.remove('player--active');
    currElement === 0?currElement=1:currElement=0;
    document.querySelector('.player--'+currElement).classList.add('player--active');
}

function checkWinner(input)
{
    if(score[currElement]>=input)
    {
        document.getElementById('name--'+currElement).textContent = 'WINNER';
        //new game starts 
        return 1;
    }
    return 0;
}

function initialise()
{
    score = [0,0];
    roundScore=0;
    prevNumber=0;
    currElement = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';


    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;
    document.querySelector('#score--1').textContent = 0;

    //removing winner class
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('name');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('name');


    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');

    //abeling our button
    document.querySelector('.btn--roll').disabled = false;
    document.querySelector('.btn--hold').disabled = false;
}