window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.querySelector(".scroll-top-btn").style.display = "block";
  } else {
      document.querySelector(".scroll-top-btn").style.display = "none";
  }
}

document.querySelector(".scroll-top-btn").addEventListener("click", function() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
});

const listButtons = document.querySelectorAll('.list-btn');

listButtons.forEach(button => {
  button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product');

      const dialog = document.createElement('dialog');
      dialog.classList.add('product-dialog');

      const dialogContent = document.createElement('div');
      dialogContent.innerHTML = `
          <h2>${productName}</h2>
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" required><br><br>
          <label for="date">Date of Purchase:</label>
          <input type="date" id="date" name="date" required><br><br>
          <label for="price">Price:</label>
          <input type="number" id="price" name="price" step="0.01" required><br><br>
          <label for="name">Purchased By:</label>
          <input type="text" id="name" name="name" required><br><br>
          <button type="submit">Submit</button>
      `;

      dialog.appendChild(dialogContent);
      document.body.appendChild(dialog);

      const submitButton = dialog.querySelector('button[type="submit"]');

      submitButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission

          const quantity = document.getElementById('quantity').value;
          const date = document.getElementById('date').value;
          const price = document.getElementById('price').value;
          const name = document.getElementById('name').value;

          // Check if all fields are filled
          if (quantity && date && price && name) {
              // Store data in local storage
              let productList = JSON.parse(localStorage.getItem('productList')) || [];
              productList.push({
                  product: productName,
                  quantity: quantity,
                  date: date,
                  price: price,
                  name: name
              });
              localStorage.setItem('productList', JSON.stringify(productList));

              dialog.close();
              window.location.href = 'list.html';
          } else {
              // Optionally display an error message or highlight empty fields
              alert("Please fill in all fields.");
          }
      });

      dialog.showModal();
  });
});