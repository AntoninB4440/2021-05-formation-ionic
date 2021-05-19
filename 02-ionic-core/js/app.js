const list = document.getElementById("list");

fetch("https://devfest-nantes-2018-api.cleverapps.io/blog")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      const el = document.createElement("ion-card");
      el.innerHTML = `
            <img src="https://devfest2018.gdgnantes.com/${element?.image}" />
            <ion-card-header>
              <ion-card-title>${element?.title}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              ${element?.brief}
            </ion-card-content>
          `;
      list.appendChild(el);
    });
  });
