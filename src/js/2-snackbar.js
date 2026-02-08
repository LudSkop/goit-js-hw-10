

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);

    function handleSubmit(event){
        event.preventDefault();
        const delay = Number(event.target.elements.delay.value);
        const state = event.target.elements.state.value;
        const isSuccess = state === "fulfilled";

         createPromise(delay, isSuccess)
    .then(delay => {
        iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
    });
     
    })
    .catch(delay => {
        iziToast.error({
        message: `❌ Rejected promise in ${delay} ms`,
        position: 'topRight',
    });
    
    })
    event.target.reset();
}


    function createPromise(delay, isSuccess) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if (isSuccess) {
                    resolve(delay);
                } else{
                    reject(delay);
                }
                }, delay);
            })
    }
