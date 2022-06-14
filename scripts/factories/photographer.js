export default function photographerFactory(data) {
  const { portrait, name, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const place = document.createElement("p");
    const location = document.createElement("p");
    const tag = document.createElement("p");
    const money = document.createElement("p");

    img.setAttribute("src", picture);

    h2.textContent = name;
    place.textContent = city;
    location.textContent = country;
    tag.textContent = tagline;
    money.textContent = `${price}€/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(place);
    article.appendChild(location);
    article.appendChild(tag);
    article.appendChild(money);

    return article;
  }
  return { name, picture, tagline, price, getUserCardDOM };
}
