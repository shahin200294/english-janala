
const createElements = (arr)=>{
    const htmlElements = arr.map((el) =>`<span class="btn">${el}</span>`);
    return( htmlElements.join(" "));
};


const manageSpinner = (status)=>{
    if(status===true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
} 


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of responsive
        .then(res => res.json()) // promise of json data
        .then(json => displayLessons(json.data))
};


const removeActive= ()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn=>{
        btn.classList.remove("active");
    })
}


const loadWordDetails= async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);

}

const displayWordDetails = (word) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML =`
     <div>
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div>
                    <h2 class="text-2xl font-bold">Meaning</h2>
                    <p>${word.meaning ? word.meaning: "Meaning not found"}</p>
                </div>
                <div>
                    <h2 class="text-2xl font-bold">Example</h2>
                    <p>${word.example ? word.example:"Example not found"}</p>
                </div>
                <div>
                    <h2 class=" font-bold">Synonym</h2>
                    <div class="">${createElements(word.synonyms)}</div>
                </div> 
    
    `;

     document.getElementById("word_modal").showModal();
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive(); 
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(clickBtn);
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        })


}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";


    if(words.length == 0){
        wordContainer.innerHTML = `
         <div class="text-center col-span-full space-y-5 font-bangla">

            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-[#79716B] font-semibold text-[12px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-[#292524] font-semibold text-2xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
            manageSpinner(false);
        return;
    }

//     {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

    words.forEach(word =>{
        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
         <div class="bg-white rounded-xl p-5 shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-xl">${word.word ? word.word: "Word not found"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla font-medium text-2xl">"${word.meaning ? word.meaning: "Meaning not found"} / ${word.pronunciation ? word.pronunciation: "Pronunciation not found"}"</div>

            <div class="flex items-center justify-between gap-2 mt-4">
                <button onClick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    })
    manageSpinner(false);
}
const displayLessons = lessons => {
    // 1. get the container & emty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. get into ever lessons
    for (let lesson of lessons) {
        // 3. create element
        // console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                        <i class="fa-solid fa-book-open"></i> lesson - ${lesson.level_no}
                        </button>
    `;
        // 4. append into container
        levelContainer.appendChild(btnDiv);
    }
}
loadLessons()