const db =
    {
        "MD": {
            "t-shirts": [
                {
                    "id": 0,
                    "name": "Snow?",
                    "priceEUR": 12.00,
                    "sale": null,
                    "img": "https://merchdose.com/pictures/c34d-kosomiluku.jpg",
                    "description": "lorem ipsum",
                    "rating": 80
                },
                {
                    "id": 1,
                    "name": "Stay out of it",
                    "priceEUR": 16.00,
                    "sale": null,
                    "img": "https://merchdose.com/pictures/c34d-tyvyfosuranaruhakyro.jpg",
                    "description": "lorem ipsum",
                    "rating": 50
                },
                {
                    "id": 2,
                    "name": "Art",
                    "priceEUR": 25.00,
                    "sale": null,
                    "img": "https://merchdose.com/pictures/c34d-dopecomijevehyjomaho.jpg",
                    "description": "lorem ipsum",
                    "rating": 40
                },
                {
                    "id": 3,
                    "name": "Christmas chaos 2",
                    "priceEUR": 17.00,
                    "sale": null,
                    "img": "https://merchdose.com/pictures/c34d-mocaforafitejomumyfy.jpg",
                    "description": "lorem ipsum",
                    "rating": 45
                }
            ],
            "hoodies": [
                {
                    "id": 4,
                    "name": "Reflektor",
                    "priceEUR": 43.00,
                    "sale": "10%",
                    "finalPriceEUR": 38.70,
                    "img": "https://merchdose.com/pictures/c34d-betapubigu.jpg",
                    "description": "lorem ipsum",
                    "rating": 65
                }
            ]
        },
        "ProBro": {
            "t-shirts": [
                {
                    "id": 5,
                    "name": "Мой райончик, мои правила",
                    "priceEUR": 16.00,
                    "sale": null,
                    "img": "https://merchdose.com/pictures/c34d-dyforesili.jpg",
                    "description": "lorem ipsum",
                    "rating": 49
                }
            ],
            "hoodies": [
                {
                    "id": 6,
                    "name": "Чё как брать поживает?",
                    "priceEUR": 42.50,
                    "sale": null,
                    "img": "https://merchdose.com/pictures/c34d-rubycogoso.jpg",
                    "description": "lorem ipsum",
                    "rating": 50
                }
            ]
        },
        "YanaBruk": {
            "t-shirts": [
                {

                }
            ],
            "hoodies": [
                {

                }
            ]
        }
    };
const types = ["t-shirts", "hoodies"];

const products = [
    {
        "id": 0,
        "partners": ["MD", "All"],
        "name": "Snow?",
        "types": ["T-shirts", "All"],
        "priceEUR": 12.00,
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-kosomiluku.jpg",
        "description": "lorem ipsum",
        "rating": 80
    },
    {
        "id": 1,
        "partners": ["MD", "All"],
        "name": "Stay out of it",
        "types": ["T-shirts", "All"],
        "priceEUR": 16.00,
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-tyvyfosuranaruhakyro.jpg",
        "description": "lorem ipsum",
        "rating": 50
    },
    {
        "id": 2,
        "partners": ["MD", "All"],
        "name": "Art",
        "types": ["T-shirts", "All"],
        "priceEUR": 25.00,
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-dopecomijevehyjomaho.jpg",
        "description": "lorem ipsum",
        "rating": 40
    },
    {
        "id": 3,
        "partners": ["MD", "All"],
        "name": "Christmas chaos 2",
        "types": ["T-shirts", "All"],
        "priceEUR": 17.00,
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-mocaforafitejomumyfy.jpg",
        "description": "lorem ipsum",
        "rating": 45
    },
    {
        "id": 4,
        "partners": ["MD", "All"],
        "name": "Reflektor",
        "types": ["Hoodies", "All"],
        "priceEUR": 43.00,
        "sale": "10%",
        "finalPriceEUR": 38.70,
        "img": "https://merchdose.com/pictures/c34d-betapubigu.jpg",
        "description": "lorem ipsum",
        "rating": 65
    },
    {
        "id": 5,
        "partners": ["ProBro", "All"],
        "name": "Мой райончик, мои правила",
        "types": ["T-shirts", "All"],
        "priceEUR": 16.00,
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-dyforesili.jpg",
        "description": "lorem ipsum",
        "rating": 49
    },
    {
        "id": 6,
        "partners": ["ProBro", "All"],
        "name": "Чё как брать поживает?",
        "types": ["Hoodies", "All"],
        "priceEUR": 42.50,
        "sale": null,
        "img": "https://merchdose.com/pictures/c34d-rubycogoso.jpg",
        "description": "lorem ipsum",
        "rating": 50
    }
]