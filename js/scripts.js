/*!
* Start Bootstrap - Scrolling Nav v5.0.6 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
//

let transportationOrderTileCounter = 0;
var loggedIn = false;
var admin = false;
var emailStr = 0;
var passwordStr = 0;
var loginWindow = 0;
var feedbackMessage = 0;
var feedbackStr = 0;
var feedbackRating = 0;

function onInput() {
    const inputField = document.getElementById('cargo');
    const selectList = document.getElementById('select');
    if (inputField.value.trim() !== '') {
        selectList.classList.remove('d-none');
      } else {
        selectList.classList.add('d-none');
      }
}

const addTransportationOrderBtn = document.getElementById("add-transportation-order-btn");
addTransportationOrderBtn.addEventListener("click", generateTransportationOrderTile);

function generateTransportationOrderTile(user, phone, src, dest, time, capacity, vehicle)
{
    // Increment counter for unique ID
    transportationOrderTileCounter++;

    var cost = 50;
    var c = capacity;
    if(c > 0 && c < 10) cost += 50;
    else if(c > 10 && c < 50) cost += 100;
    else if(c > 50 ) cost += 300;

    // Create new tile element
    const tile = document.createElement("div");
    tile.classList.add("col", "mb-4");
    tile.innerHTML = `
    <div class="card">
    <div class="card-body">
    <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title text-right">Замовлення №${transportationOrderTileCounter}</h5>
        <div class="text-left">Час - ${time}</div>
        <div class="text-left">Вартість: ${cost} грн.</div>
    </div>
    <p class="card-text">Маршрут: ${src} - ${dest}</p>
    <button type="button" class="btn btn-danger delete-transportation-order-btn">Скасувати</button>
    <button type="button" class="btn btn-secondary info-transportation-order-btn">Повна інформація про замовлення</button>
    <button type="button" class="btn btn-secondary btn-success pay-transportation-order-btn">Сплатити зараз</button>
        </div>
        <div id="fullInfo" style="margin-left: 20px; display: none;">
            <p>Особа: ${user}</p>
            <p>Телефон: ${phone}</p>
            <p>Транспорт: ${vehicle}</p>
        </div>
    </div>
    </div>
    `;

    const deleteBtn = tile.querySelector(".delete-transportation-order-btn");
    deleteBtn.addEventListener("click", function() {
        transportationOrderTileCounter--;
        tile.remove(); // Remove the tile from the DOM
    });

    const infoBtn = tile.querySelector(".info-transportation-order-btn");
    infoBtn.addEventListener("click", function() {
        $("#fullInfo").toggle();
    });

    const payBtn = tile.querySelector(".pay-transportation-order-btn");
    payBtn.addEventListener("click", function() {
        alert("Оплата замовлення ...");
       payBtn.innerHTML = "Сплачено";
       payBtn.disabled = true;
    });

    // Add new tile element to the DOM
    const transportationOrderTiles = document.getElementById("transportation-order-tiles");
    transportationOrderTiles.appendChild(tile);
}

function onExit()
{
    loggedIn = false;
    admin = false;
    hideAdminPanel();
    hideOrders();
}

function onStarClick(value)
{
    feedbackRating = value;
}

function onSubmit()
{
    var user = document.getElementById('name');
    var phone = document.getElementById('phone');
    var src = document.getElementById('pickup-location');
    var dest = document.getElementById('dropoff-location');
    var vehicle = document.getElementById('vList');
    var time = document.getElementById('time');
    var capacity = document.getElementById('cargo');
    generateTransportationOrderTile(user.value, phone.value, src.value, dest.value, time.value, capacity.value, vehicle.value)
    hideModal2();
}

function onAdmin()
{
    console.log('button was clicked');

    admin = true;
    hideModal();
    showAdminPanel();
}

function onLogin()
{
    if(document.getElementById('email').value == "admin" && document.getElementById('password').value == "admin") {
        admin = true;
        hideModal();
        return;
    }

    loggedIn = true;
    emailStr = document.getElementById('email').value;
    passwordStr = document.getElementById('password').value;
    document.getElementById("user").innerHTML = "Користувач: " + emailStr;

    addUser(emailStr, passwordStr, transportationOrderTileCounter);

    fetch('/save-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailStr, passwordStr })
    })

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

function openFeedbackWindow()
{
    window.open("feedback.html", "_blank");
}

function addFeedback(user, message, value)
{
    var type = 'danger';
    if(value == 2) type = 'warning' 
    if(value == 3) type = 'success' 
    var newItem = $(`
        <div class="alert alert-${type}" role="alert">
        Відгук від користувача: <strong>${user}</strong> <br> 
        <p style="margin-left: 20px"><strong>${message}</strong></p>
        </div>
    `);
    $('#fbList').append(newItem);
}

function onSendFeedback()
{
    var message = document.getElementById('fmessage');
    addFeedback(emailStr, message.value, feedbackRating);
    hideFeedback();
}

function showAdminPanel()
{
    if(email && password)
    {
        // var aC = document.getElementById('adminContent');
        // aC.value = '#1\tКористувач: \n\tEmail: ' + emailStr + '\n\tПароль: ' + passwordStr + "\n\tКількість замовлень - " + transportationOrderTileCounter;
    }

    var modal = document.getElementById("admin-modal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.removeAttribute("aria-hidden");
    document.body.classList.add("modal-open");
}

function hideAdminPanel()
{
    var modal = document.getElementById("admin-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function showFeedback() {
    var modal = document.getElementById("fb-modal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.removeAttribute("aria-hidden");
    document.body.classList.add("modal-open");
}

function hideFeedback() {
    var modal = document.getElementById("fb-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

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
    if(admin)
    {
        showAdminPanel();
        return;
    }
    else if(loggedIn)
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

function addUser(email, password)
{
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const loginTime = `${hours}:${minutes}`;

    var newItem = $(`
        <li class="list-group-item">
                    <h5>Email: ${email}</h5>
                    <p>Пароль: ${password}</p>
                    <p>Останній вхід - ${loginTime}</p>
                    <button class="btn btn-danger btn-sm delete-btn">Видалити користувача</button>
                    <button class="btn btn-info btn-sm contact" onclick="message(${email})">Звʼязатися</button>
                    <div class="contact-form">
                        <textarea class="form-control" placeholder="Напишіть повідомлення"></textarea>
                        <button class="btn btn-secondary btn-sm send mt-2">Надіслати</button>
                    </div>
                  </li>
        `);
        $('#userList').append(newItem);
}

function message(user)
{
    alert("Звʼязок з користувачем (${user}) ...");
}

