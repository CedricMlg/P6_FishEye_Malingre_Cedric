export default function photographerFactory(data) {
  const { id, portrait, name, city, country, tagline, price } = data;

  /**
   * It creates a DOM element for a photographer card
   * @returns the article element with all the child elements.
   */
  function getUserCardDOM() {
    const article = document.createElement("article");
    const lien = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const location = document.createElement("h3");
    const tag = document.createElement("p");
    const money = document.createElement("p");

    article.classList.add("photographer__block");
    lien.classList.add("photographer__link");
    lien.href = `./pages/photographers.html?id=${id}`;
    lien.ariaLabel = name;
    img.classList.add("photographer__portrait");
    img.alt = "";
    h2.classList.add("photographer__name");
    location.classList.add("photographer__location");
    tag.classList.add("photographer__tagline");
    money.classList.add("photographer__price");

    img.setAttribute("src", `assets/photographers/${portrait}`);

    h2.textContent = name;
    location.textContent = `${city}, ${country}`;
    tag.textContent = tagline;
    money.textContent = `${price}€/jour`;

    article.appendChild(lien);
    lien.appendChild(img);
    lien.appendChild(h2);
    article.appendChild(location);
    article.appendChild(tag);
    article.appendChild(money);

    return article;
  }

  /**
   * It creates a DOM element for the photographer's profile
   * @returns An object with two properties, profil and portrait.
   */
  function focusUserProfilDOM() {
    const profil = document.createElement("div");
    const port = document.createElement("div");
    const article = document.createElement("article");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    const tag = document.createElement("p");
    const img = document.createElement("img");

    profil.classList.add("photographer-profil");
    port.classList.add("photographer-portrait");
    article.classList.add("photographer-profil__block");
    h1.classList.add("photographer-profil__name");
    h2.classList.add("photographer-profil__location");
    tag.classList.add("photographer-profil__tagline");
    img.classList.add("photographer-portrait__picture");
    img.alt = "";

    img.setAttribute("src", `../assets/photographers/${portrait}`);

    h1.textContent = name;
    h2.textContent = `${city}, ${country}`;
    tag.textContent = tagline;

    profil.appendChild(article);
    port.appendChild(img);
    article.appendChild(h1);
    article.appendChild(h2);
    article.appendChild(tag);

    return { profil: profil, portrait: port };
  }

  /**
   * It creates a div element, adds a class to it, and then adds some text to it
   * @returns The function getUserPrice() returns the price of the photographer.
   */
  function getUserPrice() {
    const tarif = document.createElement("div");
    tarif.classList.add("photographer-bottomInfo__price");
    tarif.innerHTML = `<p>${price}€ / jour</p>`;

    return tarif;
  }

  /**
   * It gets the element with the id "modalTitle", sets its ariaLabel attribute to "Contact me" + the
   * value of the variable name, and then sets its innerHTML to "Contactez-moi" + the value of the
   * variable name
   * @returns The modalTitle element.
   */
  function getUserName() {
    const modalTitle = document.getElementById("modalTitle");
    modalTitle.ariaLabel = `Contact me ${name}`;
    modalTitle.innerHTML = `Contactez-moi ${name}`;

    return modalTitle;
  }

  return {
    id,
    portrait,
    name,
    city,
    country,
    tagline,
    price,
    getUserCardDOM,
    focusUserProfilDOM,
    getUserPrice,
    getUserName,
  };
}
