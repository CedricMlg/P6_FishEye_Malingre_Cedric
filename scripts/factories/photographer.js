export default function photographerFactory(data) {
  const { id, portrait, name, city, country, tagline, price } = data;

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

  function focusUserProfilDOM() {
    const profil = document.createElement("div");
    const port = document.createElement("div");
    const article = document.createElement("article");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    const tag = document.createElement("p");
    const img = document.createElement("img");

    profil.classList.add("photographer-profil");
    profil.id = "photo-headerProfil";
    port.classList.add("photographer-portrait");
    port.id = "photo-headerPortrait";
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

    return {profil:profil, portrait:port};
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
  };
}
