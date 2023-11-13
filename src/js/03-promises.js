

const form = document.querySelector('.form');

form.addEventListener('submit', onStartGeneration);
  
function onStartGeneration(event){
  event.preventDefault();
  // console.log(event.target);
  // console.log(event.currentTarget);
  let firstDelay = event.currentTarget.elements.delay.value;
  let stepDelay = event.currentTarget.elements.step.value;
  let amountEl = event.currentTarget.elements.amount.value;
  for(let i=1; i<= amountEl; i+=1){
    createPromise(i, firstDelay)
    .then(({position, firstDelay}) => console.log(`✅ Fulfilled promise ${position} in ${firstDelay}ms`))
    .catch(({position, firstDelay}) => console.log(`❌ Rejected promise ${position} in ${firstDelay}ms`))
  };
  firstDelay += stepDelay;
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
        if (shouldResolve) {
          resolve(position, delay);
        }   else {
          reject(position, delay);
        }; 
      },delay);
    })
  };
  
  


// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
