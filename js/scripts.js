/*!
* Start Bootstrap - Scrolling Nav v5.0.6 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 


  // Define counter variable for generating unique IDs for new transportation order tiles
  let transportationOrderTileCounter = 0;

  // Function to generate a new transportation order tile
  function generateTransportationOrderTile(src, dest, time) {
    // Increment counter for unique ID
    transportationOrderTileCounter++;

    // Create new tile element
    const tile = document.createElement("div");
    tile.classList.add("col", "mb-4");
    tile.innerHTML = `
    <div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="card-title text-right">Замовлення №${transportationOrderTileCounter}</h5>
      <div class="text-left">Час: ${time}</div>
    </div>
    <p class="card-text">Маршрут: ${src} - ${dest}</p>
    <button type="button" class="btn btn-danger delete-transportation-order-btn">Скасувати</button>
        </div>
  </div>
</div>
    `;

    const deleteBtn = tile.querySelector(".delete-transportation-order-btn");
    deleteBtn.addEventListener("click", function() {
      tile.remove(); // Remove the tile from the DOM
    });

    // Add new tile element to the DOM
    const transportationOrderTiles = document.getElementById("transportation-order-tiles");
    transportationOrderTiles.appendChild(tile);
  }

const addTransportationOrderBtn = document.getElementById("add-transportation-order-btn");
addTransportationOrderBtn.addEventListener("click", generateTransportationOrderTile);



var loggedIn = false;
var emailStr = 0;
var passwordStr = 0;

function onExit()
{
    loggedIn = false;
    hideOrders();
}

function onSubmit()
{
    var src = document.getElementById('pickup-location');
    var dest = document.getElementById('dropoff-location');
    var time = document.getElementById('time');
    generateTransportationOrderTile(src.value, dest.value, time.value)
    hideModal2();
}

function onLogin()
{
    loggedIn = true;
    emailStr = document.getElementById('email').value;
    passwordStr = document.getElementById('password').value;
    document.getElementById("user").innerHTML = "Користувач: " + emailStr;

    hideModal();
}

var cargoCheckbox = document.getElementById('cargo-checkbox');
var cargoWeightField = document.getElementById('cargo-weight-field');

cargoCheckbox.addEventListener('change', function() {
  if (this.checked) {
    cargoWeightField.classList.remove('d-none');
  } else {
    cargoWeightField.classList.add('d-none');
  }
});

function showOrders() {
    var modal = document.getElementById("transportation-orders-modal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.removeAttribute("aria-hidden");
    document.body.classList.add("modal-open");
}

    function hideOrders() {
    var modal = document.getElementById("transportation-orders-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function showModal() {
    if(loggedIn)
    {
        showOrders();
        return;
    }
    var modal = document.getElementById("loginModal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.removeAttribute("aria-hidden");
    document.body.classList.add("modal-open");
}

    function hideModal() {
    var modal = document.getElementById("loginModal");
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function showModal2() {
    if(!loggedIn)
    {
        showModal();
        return;
    }
    var modal = document.getElementById("transportation-modal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.removeAttribute("aria-hidden");
    document.body.classList.add("modal-open");
}

    function hideModal2() {
    var modal = document.getElementById("transportation-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});
