const types = ["All", "T-shirts", "Hoodies"];

const partners = ["All", "MD", "ProBro", "YanaBruk"];

const products = [
    {
        "id": 0,
        "partners": ["MD", "All"],
        "name": "Snow?",
        "types": ["T-shirts", "All"],
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "red"],
        "prices": {
            "EUR": 12.00,
            "RUB": 1080
        },
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-kosomiluku.jpg",
        "images": {
            "black": "https://merchdose.com/pictures/c34d-bapynimabawokibogibe.jpg",
            "white": "https://merchdose.com/pictures/c34d-jecoherasixycyqecugy.jpg",
            "red": "https://merchdose.com/pictures/c34d-vybetolexozaroxijite.jpg"
        },
        "description": "On the front of the product, printed \"Sniegs? Nē, nedzirdēju\", membrane. This print can withstand 40 washes, provided that the product is washed at a temperature no higher than 30 degrees and do not use a dryer. There are 3 product color options: black (white print), red (white print) and white (red print).",
        "rating": 80
    },
    {
        "id": 1,
        "partners": ["MD", "All"],
        "name": "Stay out of it",
        "types": ["T-shirts", "All"],
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "red"],
        "prices": {
            "EUR": 16.00,
            "RUB": 1450
        },
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-tyvyfosuranaruhakyro.jpg",
        "images": {
            "black": "https://merchdose.com/pictures/c34d-tyvyfosuranaruhakyro.jpg",
            "white": "https://merchdose.com/pictures/c34d-banegifipysyhypuvyde.jpg",
            "red": "https://merchdose.com/pictures/c34d-kyvubiryhelysabodoca.jpg"
        },
        "description": "On the front of the product, printed \"coronavirus\", membrane. On the back of the product, printed \"Baby it’s covid outside\", membrane. These prints can withstand 40 washes, provided that the product is washed at a temperature no higher than 30 degrees and do not use a dryer. There are 3 color options for the product: black, white and red.",
        "rating": 50
    },
    {
        "id": 2,
        "partners": ["MD", "All"],
        "name": "Art",
        "types": ["T-shirts", "All"],
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "red"],
        "prices": {
            "EUR": 25.00,
            "RUB": 2280
        },
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-dopecomijevehyjomaho.jpg",
        "images": {
            "black": "https://merchdose.com/pictures/c34d-dopecomijevehyjomaho.jpg",
            "white": "https://merchdose.com/pictures/c34d-lixuredohavojixeqiba.jpg",
            "red": "https://merchdose.com/pictures/c34d-nuhodimejametejikemu.jpg"
        },
        "description": "On the front of the product, printed \"2021\", membrane. This print can withstand 40 washes, provided that the product is washed at a temperature no higher than 30 degrees and do not use a dryer. On the back of the product, printed, direct printing. This print can withstand 30 washes, provided that the product is washed at a temperature no higher than 30 degrees and do not use a dryer. There are 3 product color options: black, red and white.",
        "rating": 40
    },
    {
        "id": 3,
        "partners": ["MD", "All"],
        "name": "Christmas chaos 2",
        "types": ["T-shirts", "All"],
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "red"],
        "prices": {
            "EUR": 17.00,
            "RUB": 1550
        },
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-mocaforafitejomumyfy.jpg",
        "images": {
            "black": "https://merchdose.com/pictures/c34d-mocaforafitejomumyfy.jpg",
            "white": "https://merchdose.com/pictures/c34d-zazyzakivehowycovyqu.jpg",
            "red": "https://merchdose.com/pictures/c34d-bekodyxovocyqasavyva.jpg"
        },
        "description": "On the front of the product, printed \"2021\", membrane. On the back of the product, printed with membrane. These prints can withstand 40 washes, provided that the product is washed at a temperature no higher than 30 degrees and do not use a dryer. There are 3 product color options: black (white print), red (white print) and white (red print).",
        "rating": 45
    },
    {
        "id": 4,
        "partners": ["MD", "All"],
        "name": "Reflektor",
        "types": ["Hoodies", "All"],
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black"],
        "prices": {
            "EUR": 43.00,
            "RUB": 3920
        },
        "sale": "10%",
        "finalPriceEUR": 38.70,
        "img": "https://merchdose.com/pictures/c34d-nihibafevubetulycylu.jpg",
        "images": {
            "black": "https://merchdose.com/pictures/c34d-nihibafevubetulycylu.jpg"
        },
        "description": "Unisex hoodie, on the front, printed snowflake, with reflective membrane. This print can withstand 40 washes, provided that the product is washed at a temperature no higher than 30 degrees and do not use a dryer. And also there is a patch \"2021\". Note: product photos are computer-generated visualizations.",
        "rating": 65
    },
    {
        "id": 5,
        "partners": ["ProBro", "All"],
        "name": "Мой райончик, мои правила",
        "types": ["T-shirts", "All"],
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "red", "french-navy"],
        "prices": {
            "EUR": 16.00,
            "RUB": 1450
        },
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-dyforesili.jpg",
        "images": {
            "black": "https://merchdose.com/pictures/c34d-boparyheviwekuqegicu.jpg",
            "white": "https://merchdose.com/pictures/c34d-bynitasavogurajasaqo.jpg",
            "red": "https://merchdose.com/pictures/c34d-cyqamakegaretohyfopi.jpg",
            "french-navy": "https://merchdose.com/pictures/c34d-zahogegiqojoxizenywa.jpg"
        },
        "description": "These prints can withstand 40 washes, provided that the product is washed at a temperature no higher than 30 degrees and do not use a dryer. There are 3 product color options: black (white print), red (white print) and white (red print).\",",
        "rating": 49
    },
    {
        "id": 6,
        "partners": ["ProBro", "All"],
        "name": "Чё как брат поживает?",
        "types": ["Hoodies", "All"],
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "red", "french-navy"],
        "prices": {
            "EUR": 42.50,
            "RUB": 3870
        },
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-rubycogoso.jpg",
        "images": {
            "black": "https://merchdose.com/pictures/c34d-kibyqykyhawyhawomoqy.jpg",
            "white": "https://merchdose.com/pictures/c34d-pijacuracigusupodewa.jpg",
            "red": "https://merchdose.com/pictures/c34d-mivytovyhacudeqovari.jpg",
            "french-navy": "https://merchdose.com/pictures/c34d-rowimukovumehakinemo.jpg"
        },
        "description": "These prints can withstand 40 washes, provided that the product is washed at a temperature no higher than 30 degrees and do not use a dryer. There are 3 product color options: black (white print), red (white print) and white (red print).\",",
        "rating": 50
    }
]