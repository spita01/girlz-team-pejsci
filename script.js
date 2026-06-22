const jokes = [
  'Proč pes sedí u počítače? Čeká na pávěnovou misku.',
  'Jak se jmenuje buldog kouzelník? Abrakadabrador.',
  'Co řekl buldog, když viděl hromadu listí? Tohle je můj nový pelíšek.',
  'Proč buldog nosí hodinky? Aby věděl, kdy je čas na pamlsek.',
  'Jaký je nejoblíbenější sport buldoga? Hledání pamlsků.',
  'Proč pes nechce jít do práce? Protože už má za sebou celý den štěkání.',
  'Jaký vtip se líbí psovi nejvíc? Ten, kde je v něm kousek klobásy.',
  'Co řekl pes, když se naučil plavat? Mám ploutve, ale radši mám pamlsky.',
  'Proč pes vletěl do kavárny? Hledal šunku do sendviče.',
  'Jak se pes omlouvá? Promiň, měl jsem plnou tlapku práce.'
];

const btn = document.getElementById('jokeBtn');
const funBtn = document.getElementById('funBtn');
const bubble = document.getElementById('bubble');
const dog = document.getElementById('dog');

let lastJoke = null;
let lastJokeLiked = false;

const betterJokes = [
  'Co dělá buldog v kině? Hledá titulky pro pamlsky.',
  'Proč buldog umí tančit? Má rytmus v ocásku.',
  'Jaký je rozdíl mezi průměrným vtipem a skvělým? Skvělý má pamlsek na konci.'
];

function pickJoke(){
  return jokes[Math.floor(Math.random()*jokes.length)];
}

function speak(text){
  if('speechSynthesis' in window){
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'cs-CZ';
    u.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } else {
    console.warn('Speech Synthesis není dostupné v tomto prohlížeči.');
  }
}

function tellJoke(){
  const joke = pickJoke();
  lastJoke = joke;
  lastJokeLiked = false;
  bubble.textContent = joke;
  speak(joke);
}

btn.addEventListener('click', tellJoke);

if(funBtn){
  funBtn.addEventListener('click', ()=>{
    if(!lastJoke){
      const msg = 'Nejdřív mi řekni vtip, a potom mi můžeš dát kostí pamlsek.';
      bubble.textContent = msg;
      speak(msg);
      return;
    }

    lastJokeLiked = true;
    animateBoneTreat(funBtn, ()=>{
      const msg = 'Jupí! Kost přiletěla do pusy a já mám radost.';
      bubble.textContent = msg;
      speak(msg);
    });
  });
}

function animateBoneTreat(button, callback){
  const btnRect = button.getBoundingClientRect();
  const startX = btnRect.left + btnRect.width / 2;
  const startY = btnRect.top + btnRect.height / 2;
  const d = dog.getBoundingClientRect();
  const endX = d.left + d.width * 0.5;
  const endY = d.top + d.height * 0.5;

  const t = document.createElement('div');
  t.className = 'treat-anim';
  t.textContent = '🦴';
  const size = 26;
  t.style.left = (startX - size / 2) + 'px';
  t.style.top = (startY - size / 2) + 'px';
  document.body.appendChild(t);

  const dx = endX - startX;
  const dy = endY - startY;
  const anim = t.animate([
    { transform: 'translate(0,0) scale(1)', opacity: 1 },
    { transform: `translate(${dx}px, ${dy}px) scale(0.95)`, opacity: 0.95 }
  ], { duration: 700, easing: 'cubic-bezier(.2,.9,.2,1)' });

  anim.onfinish = ()=>{
    t.remove();
    if(typeof callback === 'function') callback();
  };
}

window.addEventListener('DOMContentLoaded', ()=>{
  bubble.textContent = 'Ahoj! Stiskni "Řekni vtip" a já povím vtip.';
});
