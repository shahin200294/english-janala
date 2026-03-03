const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of responsive
        .then(res => res.json()) // promise of json data
        .then(json => displayLessons(json.data))
}

const displayLessons = lessons => {
    // 1. get the container & emty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. get into ever lessons
    for (let lesson of lessons) {
        // 3. create element
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                        <button class="btn btn-outline btn-primary">
                        <i class="fa-solid fa-circle-question"></i> lesson - ${lesson.level_no}
                        </button>
    `;
        // 4. append into container
        levelContainer.appendChild(btnDiv);
    }
}
loadLessons()