export default function photographerFactory(data) {
  const { portrait, name, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

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
    lien.ariaLabel = name;
    img.classList.add("photographer__portrait");
    h2.classList.add("photographer__name");
    location.classList.add("photographer__location");
    tag.classList.add("photographer__tagline");
    money.classList.add("photographer__price");

    img.setAttribute("src", picture);

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
  return { name, picture, tagline, price, getUserCardDOM };
}
