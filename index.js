let actualState = {
    language: "EN",
    currency: "EUR",
    filterType: "All",
    filterPartner: "All",
    sortBy: "rating",
    search: ""
}


window.addEventListener('DOMContentLoaded', () => {
    const partners = Object.keys(db);
    console.log(partners)



    showProducts();

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
        $products.html('test');

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

        console.log(items)

        items.map(obj => {
            productCards +=
                `<div class="product-block">
                    <div class="product-img">
                        <img src=${obj.img} alt="error">
                    </div>
                    <h4>${obj.name}</h4>
                    <div class="label">${obj.partners[0]}</div>
                    <div class="product-bottom">
                        <div class="price">${actualState.currency === "EUR" ? obj.priceEUR : "--"} €</div>
                        <button class="button">select options</button>
                    </div>
                </div>`
        })

        $products.html(productCards);
    }
});