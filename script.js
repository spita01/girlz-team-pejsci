const jokes = [
  'Proč pes sedí u počítače? Čeká na pávěnovou misku.',
  'Jak se jmenuje buldog kouzelník? Abrakadabrador.',
  'Co řekl buldog, když viděl hromadu listí? Tohle je můj nový pelíšek.',
  'Proč buldog nosí hodinky? Aby věděl, kdy je čas na pamlsek.',
  'Jaký je nejoblíbenější sport buldoga? Hledání pamlsků.'
];

const btn = document.getElementById('jokeBtn');
const funBtn = document.getElementById('funBtn');
const treatBtn = document.getElementById('treatBtn');
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

// Po stisknutí "To je vtipné!" ocásek vrtí
if(funBtn){
  funBtn.addEventListener('click', ()=>{
    lastJokeLiked = true;
    const msg = 'Jupí! Díky, mám rád pamlsky.';
    bubble.textContent = msg;
    speak(msg);
  });
}
if(treatBtn){
  treatBtn.addEventListener('click', ()=>{
    const btnRect = treatBtn.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width/2;
    const startY = btnRect.top + btnRect.height/2;

    const dogImg = document.getElementById('dogImg');
    let endX, endY;
    if(dogImg){
      const d = dogImg.getBoundingClientRect();
      endX = d.left + d.width * 0.68;
      endY = d.top + d.height * 0.5;
    } else {
      const d = dog.getBoundingClientRect();
      endX = d.left + d.width * 0.8;
      endY = d.top + d.height * 0.5;
    }

    // vytvořit element pamlsku
    const t = document.createElement('div');
    t.className = 'treat-anim';
    const size = 18;
    t.style.left = (startX - size/2) + 'px';
    t.style.top = (startY - size/2) + 'px';
    document.body.appendChild(t);

    const dx = endX - startX;
    const dy = endY - startY;

    const anim = t.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.9)`, opacity: 0.95 }
    ], { duration: 700, easing: 'cubic-bezier(.2,.9,.2,1)' });

    anim.onfinish = ()=>{
      t.remove();

      if(!lastJoke){
        const msg = 'Nejdřív mi řekni vtip, a potom mi dej pamlsek.';
        bubble.textContent = msg;
        speak(msg);
        return;
      }

      if(lastJokeLiked){
        const msg = 'Díky! Jsem spokojený — ale můžeme zkusit další.';
        bubble.textContent = msg;
        speak(msg);
        return;
      }

      const better = betterJokes[Math.floor(Math.random()*betterJokes.length)];
      lastJoke = better;
      lastJokeLiked = false;
      bubble.textContent = better;
      // po vyjedení pamlsku řekne lepší vtip
      setTimeout(()=> speak(better), 200);
    };
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  bubble.textContent = 'Ahoj! Stiskni "Řekni vtip" a já povím vtip.';
});
