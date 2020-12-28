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
        totalPriceEUR: 0,
        totalPriceRUB: 0,
        totalCount: 0
    }
}

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
            img: item.img,
            priceEUR: item.prices.EUR,
            priceRUB: item.prices.RUB,
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
                }
            }
        }

        // actualState.cart.items.push(cartItem)
        actualState.cart.totalCount += 1;
        actualState.cart.totalPriceEUR += cartItem.priceEUR;
        actualState.cart.totalPriceRUB += cartItem.priceRUB;
        console.log(actualState.cart)

        $(".popup").fadeOut();
        $productBox.html('');
        $(".popup").css("visibility", "");
    })
}


window.addEventListener('DOMContentLoaded', () => {


    showProducts();


    //HEADER currency toggle
    const $currencyLi = $('#currency li');
    const $currencySpan = $('#currency Span');

    $currencyLi.on('click', () => {
        actualState.currency = $currencyLi.attr('id');
        $currencyLi.html($currencyLi.attr('id') === "RUB" ? "EUR" : "RUB");
        $currencySpan.html($currencyLi.attr('id') === "RUB" ? "RUB" : "EUR");
        $currencyLi.attr('id', $currencyLi.attr('id') === "RUB" ? "EUR" : "RUB");

        console.log(actualState.currency)
        showProducts();
    })


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
    document.getElementById('price (low)').onclick = setSortBy;
    document.getElementById('price (height)').onclick = setSortBy;
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
            console.log($search.val());
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
        if (actualState.sortBy === "price (low)")
            items.sort(sortDyPrice(`${actualState.currency}`, "asc"))
        if (actualState.sortBy === "price (height)")
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