const messageBox=document.getElementById('message');
const count=document.getElementById('char-count');
const button=document.getElementById('predict-btn');
const result=document.getElementById('result');
messageBox.addEventListener('input',()=>{count.textContent=messageBox.value.length.toLocaleString()+' / 5,000 characters';});
document.getElementById('clear-btn').addEventListener('click',()=>{messageBox.value='';count.textContent='0 / 5,000 characters';result.replaceChildren();messageBox.focus();});
document.querySelectorAll('[data-sample]').forEach(item=>item.addEventListener('click',()=>{messageBox.value=item.dataset.sample;messageBox.dispatchEvent(new Event('input'));messageBox.focus();}));
function showResult(kind,title,description,confidence){
 const card=document.createElement('div');card.className='result-card '+kind;
 const top=document.createElement('div');top.className='result-top';
 const icon=document.createElement('div');icon.className='result-icon';icon.textContent=kind==='spam'?'⚠️':'✓';
 const copy=document.createElement('div');const heading=document.createElement('h3');heading.textContent=title;const detail=document.createElement('p');detail.textContent=description;copy.append(heading,detail);
 top.append(icon,copy);
 if(Number.isFinite(confidence)){const score=document.createElement('div');score.className='confidence';score.textContent=(confidence*100).toFixed(1)+'%';const label=document.createElement('small');label.textContent='MODEL SCORE';score.append(label);top.append(score);}
 card.append(top);result.replaceChildren(card);
}
button.addEventListener('click',async()=>{
 const message=messageBox.value.trim();
 if(!message){showResult('','Message required','Paste a message above before starting the analysis.');messageBox.focus();return;}
 button.disabled=true;button.querySelector('span').textContent='Analyzing…';result.replaceChildren();
 try{
  const body=new FormData();body.append('message',message);
  const response=await fetch('/predict',{method:'POST',body});
  const data=await response.json();
  if(!response.ok)throw new Error(data.error||'The server could not process this message.');
  const spam=String(data.prediction).toLowerCase().includes('spam');
  const confidence=typeof data.confidence==='number'?data.confidence:null;
  showResult(spam?'spam':'ham',spam?'Potential spam detected':'Likely legitimate message',spam?'The model found patterns associated with unsolicited or suspicious messages. Treat links and requests with caution.':'The model classified this message as ham. Always verify unexpected requests independently.',confidence);
 }catch(error){showResult('spam','Analysis unavailable',error.message||'Please try again in a moment.');}
 finally{button.disabled=false;button.querySelector('span').textContent='Analyze message';}
});
messageBox.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter')button.click();});