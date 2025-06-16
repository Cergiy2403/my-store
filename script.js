
const sheetId = "1uec0cm3wjNMmVeZWlTtG5RZaaav9fF3RO8-eD_XiGjc";
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substr(47).slice(0, -2));
    const rows = json.table.rows;
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    rows.forEach(row => {
      const [titleCell, priceCell, imageCell, categoryCell, descCell] = row.c;
      const title = titleCell?.v || "";
      const price = priceCell?.v || "";
      const image = imageCell?.v || "";
      const description = descCell?.v || "";

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
        <strong>${price} грн</strong><br>
        <button onclick="order('${title}', '${price}')">Купити</button>
      `;
      productList.appendChild(card);
    });
  });

function order(title, price) {
  const name = prompt("Ваше ім'я:");
  const phone = prompt("Номер телефону:");
  if (!name || !phone) return;

  const msg = `🛒 НОВЕ ЗАМОВЛЕННЯ:
Товар: ${title}
Ціна: ${price} грн
Ім'я: ${name}
Телефон: ${phone}`;
  fetch(`https://api.telegram.org/bot7891898298:AAF1VZTlIHcYXXSkl5dfAW84T1t7bfASlXc/sendMessage`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({chat_id: 996505837, text: msg})
  }).then(() => alert("Замовлення надіслано!"));
}
