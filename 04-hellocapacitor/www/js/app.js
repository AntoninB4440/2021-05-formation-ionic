/* IMPORT */
const { Camera, CameraResultType } = capacitorExports;

/* SELECTOR */
const list = document.getElementById("list");
const fabCamera = document.getElementById("camera");

const modalElement = document.createElement("ion-modal");

/*Init Card*/
createCardWithData();

/* CAMERA */
const getPhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });

  var imageUrl = image.webPath;
  modalElement.componentProps = {
    imageUrl: imageUrl,
  };

  presentModal();
};

/*Event Listener Camera button */
fabCamera.addEventListener("click", getPhoto);

/* FETCHING DATA */
function devFestDataFetch() {
  return fetch("https://devfest-nantes-2018-api.cleverapps.io/blog")
    .then(function (response) {
      if (response.status !== 200) {
        // si ça c'est mal passé
        throw new Error("Le serveur n'a pas répondu correctement");
      } else return response.json(); // renvoie une promesse
    })
    .then(function (data) {
      // data correspond au retour du résolve (ici deux lignes au dessus)
      return data;
    })
    .catch((error) => console.log("Erreur attrapée : ", error));
}

/* Component Card */
function createDomElt(tagname, text, parentElt = document.body, attributes) {
  let element = document.createElement(tagname);
  if (text) element.textContent = text;
  parentElt.appendChild(element);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

async function createCardWithData() {
  let array = await devFestDataFetch();
  array.forEach((data) => {
    const card = createDomElt("ion-card", "", list);
    const img = createDomElt("img", "", card, {
      src: `https://devfest2018.gdgnantes.com/${data.image}`,
    });
    const header = createDomElt("ion-card-header", "", card);
    const title = createDomElt("ion-card-title", data.title, header);
    const content = createDomElt("ion-card-content", data.brief, card);
  });
}

/* MODAL COMPONENT */
customElements.define(
  "modal-page",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
  <ion-header>
    <ion-toolbar>
      <ion-title>Création d'un article privé</ion-title>
      <ion-buttons slot="primary">
        <ion-button onClick="dismissModal()">
          <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Text*</ion-label>
      <ion-input id="inputTitle" required=true inputmode="text"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Description</ion-label>
      <ion-input id="inputDescription" inputmode="text"></ion-input>
    </ion-item>
    <ion-button onClick="savePhoto()" expand="block">Enregistrement</ion-button>
  </ion-content>`;
    }
  }
);

function presentModal() {
  // create the modal with the `modal-page` component
  modalElement.component = "modal-page";
  modalElement.cssClass = "my-custom-class";

  // present the modal
  document.body.appendChild(modalElement);
  return modalElement.present();
}

async function dismissModal() {
  await modalElement.dismiss();
}

async function getDataModal() {
  const { data } = await modalElement.onWillDismiss();
  return data;
}

async function savePhoto() {
  getDataModal().then((data) => {
    const card = createDomElt("ion-card", "", list);
    const img = createDomElt("img", "", card, {
      src: `${data.imageUrl}`,
    });
    const header = createDomElt("ion-card-header", "", card);
    const title = createDomElt("ion-card-title", data.title, header);
    const content = createDomElt("ion-card-content", data.description, card);
  });
  await modalElement.dismiss({
    imageUrl: modalElement.componentProps.imageUrl,
    title: document.getElementById("inputTitle").value,
    description: document.getElementById("inputDescription").value,
  });
}
