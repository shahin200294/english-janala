const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of responsive
        .then(res => res.json()) // promise of json data
        .then(json => displayLessons(json.data))
}

const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))
}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

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
            <h2 class="font-bold text-xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla font-medium text-2xl">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex items-center justify-between gap-2 mt-4">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    })
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
                        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
                        <i class="fa-solid fa-book-open"></i> lesson - ${lesson.level_no}
                        </button>
    `;
        // 4. append into container
        levelContainer.appendChild(btnDiv);
    }
}
loadLessons()