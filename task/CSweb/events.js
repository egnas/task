fetch("events.json")
    .then(response => {
        return response.json();
    }).then(events => {
        const sitesHTML = events.map(event => {
            return `<div class="mainCard">
                <div class="cardHead">
                    <h2 class="cardHeader">${event.heading}</h2>
                </div>
                <div class="cardText">
                    ${event.text}
                </div>
                <div class="cardLink">
                    <a class="cardButton" href="${event.link}" >Go To Site</a>
                </div>
                <div class="cardCode">
                    <span class="cardRef" >${event.code}</span>
                </div>
            </div>`;
        }).join("\n");
        const sitesContainer = document.getElementById('sites');
        sitesContainer.innerHTML = sitesHTML;
    });
