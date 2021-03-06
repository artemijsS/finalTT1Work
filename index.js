//actual state of all params
let actualState = {
    language: "EN",
    currency: "EUR",
    currencyS: {
        "EUR": "€",
        "RUB": "₽"
    },
    filterType: "All",
    filterPartner: "All",
    sortBy: "rating",
    search: "",
    cart: {
        items: {},
        totalPrices: {
            EUR: 0,
            RUB: 0
        },
        totalCount: 0
    }
}

//PRODUCT CARD
function productCard(id) {

    const item = products[id];
    const $productBox = $('#productBox');
    let tmp;
    let sizeOptions;
    let colorOptions;
    // language=HTML
    tmp =
        `
    <div id="popup" class="popup">
        <div class="p-box">
            <div class="product-card" id="product-card">
                <span class="close">X</span>
                <img id="product-card-img" src=${item.img} alt="error">
                <div class="product-info">
                    <div class="name">${item.name}</div>
                    <div class="description">${item.description}</div>
                    <div class="options">
                        <label for="size">Size:</label>
                        <select name="size" id="size">
                            <option value="">-</option>
                            ${item.sizes.map(size => {
                                sizeOptions += `<option value=${size}>${size}</option>`
                            })}
                            ${sizeOptions}
                        </select>
                        <label for="color">Color:</label>
                        <select name="color" id="color">
                            <option value="">-</option>
                            ${item.colors.map(color => {
                                colorOptions += `<option value=${color}>${color}</option>`
                            })}
                            ${colorOptions}
                        </select>
                    </div>
                    <div class="card-bottom">
                        <div class="price">${item.prices[actualState.currency] + " " + actualState.currencyS[actualState.currency]}</div>
                        <button id="addToCart" class="button">BUY</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;

    $productBox.html(tmp);
    let dh = window.innerHeight;
    let pbox_h = $("#popup").innerHeight();
    let mid_scr = dh/2;
    let mid_box = pbox_h/2;
    let topPos = mid_scr - mid_box;
    $(".p-box").css("top","" + topPos + "px");

    $(".popup").fadeIn();
    $(".popup").css("visibility","visible");

    $(".close").click(function() {
        $(".popup").fadeOut();
        $productBox.html('');
        $(".popup").css("visibility", "")
    });



    const $btnToCart = $('#addToCart');
    const $size = $('#size');
    const $color = $('#color');

    $color.on('change', () => {
        if (!$color.val()) {
            $('#product-card-img').attr('src', item.img);
            return false;
        }
        $('#product-card-img').attr('src', item.images[$color.val()]);
    })

    $btnToCart.on('click', () => {
        // validation
        if (!$size.val() && !$color.val()) {
            $size.css('border', '1px solid red');
            $color.css('border', '1px solid red');
            alert('You should choose size and color');
            return false;
        }
        else if (!$size.val()) {
            alert('You should choose size');
            $color.css('border', '');
            $size.css('border', '1px solid red');
            return false;
        }
        else if (!$color.val()) {
            alert('You should choose color');
            $size.css('border', '');
            $color.css('border', '1px solid red');
            return false;
        }
        else {
            $size.css('border', '');
            $color.css('border', '');
        }

        const cartItem = {
            id: item.id,
            name: item.name,
            img: $('#product-card-img').attr('src'),
            prices: {
                EUR: item.prices.EUR,
                RUB: item.prices.RUB
            },
            size: $size.val(),
            color: $color.val()
        }

        if (!actualState.cart.items[cartItem.id]) {
            actualState.cart.items[cartItem.id] = {
                [cartItem.size]: {
                    [cartItem.color]: {
                        id: cartItem,
                        totalItemCount: 1
                    }
                }
            }
        }
        else {
            if (!actualState.cart.items[cartItem.id][cartItem.size]) {
                actualState.cart.items[cartItem.id][cartItem.size] = {
                    [cartItem.color]: {
                        id: cartItem,
                        totalItemCount: 1
                    }
                }
            }
            else {
                if (!actualState.cart.items[cartItem.id][cartItem.size][cartItem.color]) {
                    actualState.cart.items[cartItem.id][cartItem.size][cartItem.color] = {
                        id: cartItem,
                        totalItemCount: 1
                    }
                }
                else {
                    actualState.cart.items[cartItem.id][cartItem.size][cartItem.color].totalItemCount += 1;
                    actualState.cart.items[cartItem.id][cartItem.size][cartItem.color].id.prices.EUR += cartItem.prices.EUR;
                    actualState.cart.items[cartItem.id][cartItem.size][cartItem.color].id.prices.RUB += cartItem.prices.RUB;
                }
            }
        }

        // actualState.cart.items.push(cartItem)
        actualState.cart.totalCount += 1;
        actualState.cart.totalPrices.EUR += cartItem.prices.EUR;
        actualState.cart.totalPrices.RUB += cartItem.prices.RUB;
        // console.log(actualState.cart)

        $(".popup").fadeOut();
        $productBox.html('');
        $(".popup").css("visibility", "");

        $('#cart span').html(actualState.cart.totalCount);

        $("#notificationBox").fadeIn();
        $('#notificationBox').css("visibility", "visible");
        setTimeout(() => { $('#notificationBox').css("visibility", "") }, 3000);
    })
}

//add item count
function addItemCount(id) {
    const item = id.split('/');
    const itemId = item[1];
    const itemSize = item[2];
    const itemColor = item[3];
    actualState.cart.items[itemId][itemSize][itemColor].totalItemCount += 1;
    actualState.cart.items[itemId][itemSize][itemColor].id.prices.EUR += products[itemId].prices.EUR;
    actualState.cart.items[itemId][itemSize][itemColor].id.prices.RUB += products[itemId].prices.RUB;
    actualState.cart.totalCount += 1;
    actualState.cart.totalPrices.EUR += products[itemId].prices.EUR;
    actualState.cart.totalPrices.RUB += products[itemId].prices.RUB;

    let countOf =  '#count-of-' + itemId + itemSize + itemColor;
    let priceOf =  '#price-of-' + itemId + itemSize + itemColor;
    $(countOf).html(actualState.cart.items[itemId][itemSize][itemColor].totalItemCount);
    $(priceOf).html(actualState.cart.items[itemId][itemSize][itemColor].id.prices[actualState.currency] + ' ' + actualState.currencyS[actualState.currency]);
    $('#totalCount').html('Quantity: ' + actualState.cart.totalCount);
    $('#totalPrice').html(actualState.cart.totalPrices[actualState.currency] + ' ' + actualState.currencyS[actualState.currency]);
    $('#cart span').html(actualState.cart.totalCount);
}

//minus item count
function minusItemCount(id) {
    const item = id.split('/');
    const itemId = item[1];
    const itemSize = item[2];
    const itemColor = item[3];
    if (actualState.cart.items[itemId][itemSize][itemColor].totalItemCount === 1) {
        return false;
    }
    actualState.cart.items[itemId][itemSize][itemColor].totalItemCount -= 1;
    actualState.cart.items[itemId][itemSize][itemColor].id.prices.EUR -= products[itemId].prices.EUR;
    actualState.cart.items[itemId][itemSize][itemColor].id.prices.RUB -= products[itemId].prices.RUB;
    actualState.cart.totalCount -= 1;
    actualState.cart.totalPrices.EUR -= products[itemId].prices.EUR;
    actualState.cart.totalPrices.RUB -= products[itemId].prices.RUB;

    let countOf =  '#count-of-' + itemId + itemSize + itemColor;
    let priceOf =  '#price-of-' + itemId + itemSize + itemColor;
    $(countOf).html(actualState.cart.items[itemId][itemSize][itemColor].totalItemCount);
    $(priceOf).html(actualState.cart.items[itemId][itemSize][itemColor].id.prices[actualState.currency] + ' ' + actualState.currencyS[actualState.currency]);
    $('#totalCount').html('Quantity: ' + actualState.cart.totalCount);
    $('#totalPrice').html(actualState.cart.totalPrices[actualState.currency] + ' ' + actualState.currencyS[actualState.currency]);
    $('#cart span').html(actualState.cart.totalCount);
}

//deleting item from cart
function deleteItemFromCart(id) {
    const item = id.split('/');
    const itemId = item[1];
    const itemSize = item[2];
    const itemColor = item[3];
    // console.log(actualState.cart.items[itemId][itemSize][itemColor])

    // console.log(actualState.cart.items[itemId][itemSize])

    actualState.cart.totalCount -= actualState.cart.items[itemId][itemSize][itemColor].totalItemCount;
    actualState.cart.totalPrices.EUR -= actualState.cart.items[itemId][itemSize][itemColor].id.prices.EUR;
    actualState.cart.totalPrices.RUB -= actualState.cart.items[itemId][itemSize][itemColor].id.prices.RUB;

    if (Object.keys(actualState.cart.items[itemId][itemSize]).length === 1) {
        if (Object.keys(actualState.cart.items[itemId]).length === 1) {
            delete actualState.cart.items[itemId];
        }
        else {
            delete actualState.cart.items[itemId][itemSize];
        }
    }
    else {
        delete actualState.cart.items[itemId][itemSize][itemColor];
    }

    $('#totalCount').html('Quantity: ' + actualState.cart.totalCount);
    $('#totalPrice').html(actualState.cart.totalPrices[actualState.currency] + ' ' + actualState.currencyS[actualState.currency]);
    $('#cart span').html(actualState.cart.totalCount);
    cartBox();
}


//CART BOX
function cartBox () {
    let tmp;
    let cartItems = '';
    let cartFooter;

    if (actualState.cart.totalCount === 0) {
        cartItems = '<div class="cart-empty">EMPTY</div>';
        cartFooter =
            `
            <div class="cart-footer">
                <button 
                    onclick="
                        $('.popup-cart-box').fadeOut();
                        $('#cartBox').html('');
                        $('.popup-cart-box').css('visibility', '')" 
                    class="button"
                >
                    to catalogue
                </button>
            </div>
            `
    }
    else {
        Object.keys(actualState.cart.items).map(id => {
            Object.keys(actualState.cart.items[id]).map(size => {
                Object.keys(actualState.cart.items[id][size]).map(color => {
                    cartItems +=
                        `
                    <div class="cart-item">
                        <div class="cart-item-img">
                            <img src=${actualState.cart.items[id][size][color].id.img} alt="error">
                        </div>
                        <div class="name-params">
                            <div class="name">${actualState.cart.items[id][size][color].id.name}</div>
                            <div class="params">${size + ', ' + color}</div>
                        </div>
                        <div class="quantity-price">
                            <div class="quantity">
                                <div id=${"count-minus-" + '/' + id + '/' + size + '/' + color} class="button button-circle" onclick="minusItemCount(this.id)">
                                    <svg width="13" height="13" viewBox="0 0 10 10" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                                fill="red"/>
                                    </svg>
                                </div>
                                <b id=${"count-of-" + id + size + color}>${actualState.cart.items[id][size][color].totalItemCount}</b>
                                <div id=${"count-add-" + '/' + id + '/' + size + '/' + color} class="button button-circle" onclick="addItemCount(this.id)">
                                    <svg width="13" height="13" viewBox="0 0 10 10" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                                fill="#EB5A1E"/>
                                        <path
                                                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                                fill="red"/>
                                    </svg>
                                </div>
                            </div>
                            <div id=${"price-of-" + id + size + color} class="total-item-price">${actualState.cart.items[id][size][color].id.prices[actualState.currency] + ' ' + actualState.currencyS[actualState.currency]}</div>
                            <div id=${"delete-" + '/' + id + '/' + size + '/' + color} class="button button-circle item-remove" onclick="deleteItemFromCart(this.id)">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                        fill="#EB5A1E"/>
                                    <path
                                        d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                        fill="#EB5A1E"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    `
                })
            })
        })
        cartFooter =
            `
            <div class="cart-footer">
                <div id="totalCount" class="totalCount">${'Quantity: ' + actualState.cart.totalCount}</div>
                <div id="totalPrice" class="totalPrice">${actualState.cart.totalPrices[actualState.currency] + ' ' + actualState.currencyS[actualState.currency]}</div>
                <button class="button">BUY</button>
            </div>
            `
    }
    // language=HTML
    tmp =
        `
            <div class="popup-cart-box">
                <div class="cart-box">
                    <span id="closeCart" class="close">X</span>
                    <div class="cart-head">CART</div>
                    <div class="cart-items">
                        ${cartItems}
                    </div>
                    ${cartFooter}
                </div>
            </div>
        `
    $('#cartBox').html(tmp);
    $('.popup-cart-box').fadeIn();
    $('.popup-cart-box').css('visibility', 'visible')

    $('#closeCart').click(function() {
        $(".popup-cart-box").fadeOut();
        $('#cartBox').html('');
        $(".popup-cart-box").css("visibility", "")
    });


}



//MAIN PART
window.addEventListener('DOMContentLoaded', () => {


    showProducts();


    //HEADER

    // currency toggle
    const $currencyLi = $('#currency li');
    const $currencySpan = $('#currency Span');

    $currencyLi.on('click', () => {
        actualState.currency = $currencyLi.attr('id')[0] === 'R' ? 'RUB' : 'EUR';
        $currencyLi.html($currencyLi.attr('id') === "RUB" ? "EUR" : "RUB");
        $currencySpan.html($currencyLi.attr('id') === "RUB" ? "RUB" : "EUR");
        $currencyLi.attr('id', $currencyLi.attr('id') === "RUB" ? "EUR" : "RUB");

        showProducts();
    })
    // CART
    $('#cart').on('click', () => {
        cartBox();
    })

    //MOBILE NAVIGATION
    $('#burger').on('click', () => {
        $('.mob-nav-box').css('display', 'block');
    })
    $('#closeMobNav').on('click', () => {
        $('.mob-nav-box').css('display', 'none');
    })
        //mobile currency
    const $currency2Li = $('#currency2 li');
    const $currency2Span = $('#currency2 Span');

    $currency2Li.on('click', () => {
        actualState.currency = $currency2Li.attr('id')[0] === 'R' ? 'RUB' : 'EUR';
        $currency2Li.html($currency2Li.attr('id')[0] === 'R' ? 'EUR' : 'RUB');
        $currency2Span.html($currency2Li.attr('id')[0] === 'R' ? 'RUB' : 'EUR');
        $currency2Li.attr('id', $currency2Li.attr('id')[0] === 'R' ? 'EUR' : 'RUB');

        showProducts();
    })


    //CONTENT

    //FILTERS

    const $filterType = $('#type');
    const $filterPartner = $('#partner');

    partners.map(partner => {
        $('#partner').append(`<option value=${partner}>${partner}</option>`);
    })
    types.map(type => {
        $('#type').append(`<option value=${type}>${type}</option>`);
    })

    $filterType.on('change', () => {
        actualState.filterType = $filterType.val();
        showProducts();
    })
    $filterPartner.on('change', () => {
        actualState.filterPartner = $filterPartner.val();
        showProducts();
    })

    //SORT POP UP

    const $sortBySpan = $('#sort-by span');
    const $popUp = $('.sort-pop-up');
    const $popUpLi = $('.sort-pop-up ul li');
    const sortBy = document.getElementById('sort-by');

    document.getElementById('rating').onclick = setSortBy;
    document.getElementById('price(low)').onclick = setSortBy;
    document.getElementById('price(height)').onclick = setSortBy;
    document.getElementById('alphabet').onclick = setSortBy;

    const popUpToggle = () => {
        if ($popUp.css("display") === "none") {
            $popUp.css("display", "block");
            $('#sort-by svg').css("transform", "rotate(0)");
        }
        else {
            $popUp.css("display", "none");
            $('#sort-by svg').css("transform", "rotate(180deg)");
        }
    }

    document.addEventListener('click', (event) => {
        if (!sortBy.contains(event.target)) {
            $popUp.css("display", "none");
            $('#sort-by svg').css("transform", "rotate(180deg)");
        }
    });

    $sortBySpan.on('click', () => {
        popUpToggle()
    })

    function setSortBy () {
        actualState.sortBy = this.id;
        popUpToggle();
        $sortBySpan.html(this.id)
        $popUpLi.removeClass();
        document.getElementById(this.id).classList.add("active");
        showProducts();
    }

    //SEARCH
    const $search = $('#product-search')

    $search.on('keydown', () => {
        if ($search.val().length > 1) {
            actualState.search = $search.val().toLowerCase();
            showProducts();
        }
        // console.log($search.val().length)
        if ($search.val().length < actualState.search.length) {
            actualState.search = '';
            showProducts();
        }
    })

    //PRODUCTS filtration, sorting and output
    function showProducts() {
        const $products = $('#products');

        let items = [];
        let productCards = '';

        if (actualState.search) {
            products.map(obj => {
                if (obj.partners.includes(actualState.filterPartner)) {
                    if (obj.types.includes(actualState.filterType)) {
                        if (obj.name.toLowerCase().includes(actualState.search)) {
                            items.push(obj);
                        }
                    }
                }
            })
        }
        else {
            products.map(obj => {
                if (obj.partners.includes(actualState.filterPartner)) {
                    if (obj.types.includes(actualState.filterType)) {
                        items.push(obj);
                    }
                }
            })
        }

        // In case if there no products
        if (items.length === 0) {
            let noProducts =
                `
                <div style="margin: 200px auto; font-size: 3rem; font-weight: bold">Unfortunately we do not have such products</div>
                `
            $products.html(noProducts);
            return false;
        }
        // console.log(123)

        function sortDy(property,order) {
            let sort_order = 1;
            if(order === "desc"){
                sort_order = -1;
            }
            return function (a, b){
                if(a[property] < b[property]){
                    return -1 * sort_order;
                }else if(a[property] > b[property]){
                    return sort_order;
                }else{
                    return 0;
                }
            }
        }
        function sortDyPrice(property,order) {
            let sort_order = 1;
            if(order === "desc"){
                sort_order = -1;
            }
            return function (a, b){
                if(a.prices[property] < b.prices[property]){
                    return -1 * sort_order;
                }else if(a.prices[property] > b.prices[property]){
                    return sort_order;
                }else{
                    return 0;
                }
            }
        }

        if (actualState.sortBy === "alphabet")
            items.sort(sortDy("name", "asc"));
        if (actualState.sortBy === "rating")
            items.sort(sortDy("rating", "desc"))
        if (actualState.sortBy === "price(low)")
            items.sort(sortDyPrice(`${actualState.currency}`, "asc"))
        if (actualState.sortBy === "price(height)")
            items.sort(sortDyPrice(`${actualState.currency}`, "desc"))


        items.map(obj => {
            productCards +=
                `<div class="product-block">
                    <div class="product-img">
                        <img src=${obj.img} alt="error">
                    </div>
                    <h4>${obj.name}</h4>
                    <div class="label">${obj.partners[0]}</div>
                    <div class="product-bottom">
                        <div class="price">${obj.prices[actualState.currency] + " " + actualState.currencyS[actualState.currency]}</div>
                        <button id=${obj.id} onclick="productCard(this.id)" class="button">select options</button>
                    </div>
                </div>`
        })

        $products.html(productCards);
    }
});