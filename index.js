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
    search: ""
}

function productCard(id) {
    console.log(products[id]);
    const item = products[id];
    const $productCard = $('#product-card');
    let tmp;
    tmp =
        `
        <img src=${item.img}>
        <h3>${item.name}</h3>
        <h3>${item.prices[actualState.currency]}</h3>
        `
    $productCard.html(tmp);
}


window.addEventListener('DOMContentLoaded', () => {

    showProducts();


    //HEADER
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
    const $popUpLiActive = $('.sort-pop-up ul li');
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
        $popUpLiActive.removeClass();
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
            var sort_order = 1;
            if(order === "desc"){
                sort_order = -1;
            }
            return function (a, b){
                // a should come before b in the sorted order
                if(a[property] < b[property]){
                    return -1 * sort_order;
                    // a should come after b in the sorted order
                }else if(a[property] > b[property]){
                    return 1;
                    // a and b are the same
                }else{
                    return 0;
                }
            }
        }
        function sortDyPrice(property,order) {
            var sort_order = 1;
            if(order === "desc"){
                sort_order = -1;
            }
            return function (a, b){
                // a should come before b in the sorted order
                if(a.prices[property] < b.prices[property]){
                    return -1 * sort_order;
                    // a should come after b in the sorted order
                }else if(a.prices[property] > b.prices[property]){
                    return sort_order;
                    // a and b are the same
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

        // productCards.sort("rating");

        $products.html(productCards);
    }
});