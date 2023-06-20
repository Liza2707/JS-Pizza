/**
 * Created by chaika on 25.01.16.
 */

$(function () {
    //This code will execute when the page is ready
    //var PizzaMenu = require('./pizza/PizzaMenu');
    //var PizzaCart = require('./pizza/PizzaCart');
    //var Pizza_List = require('./Pizza_List.js');

    //PizzaCart.initialiseCart();
    // PizzaMenu.initialiseMenu();

    //let html = ejs.render('pizza_list[1].id<%= people.join(", "); %>', {people: people});
    //let a = 1+1


    pizza_info.forEach((pizza) => {
        let colDiv = document.createElement('div')
        colDiv.classList.add('col-sm-6', 'col-md-4')

        let thumbnailDiv = document.createElement('div')
        thumbnailDiv.classList.add('thumbnail', 'pizza-card')

        if('is_new' in pizza) {
            let labelNewDiv = document.createElement('div');
            labelNewDiv.classList.add('label-new');
            thumbnailDiv.appendChild(labelNewDiv);
        }


        if('is_popular'in pizza) {
            let labelPopularDiv = document.createElement('div')
            labelPopularDiv.classList.add('label-popular')
            thumbnailDiv.appendChild(labelPopularDiv);

        }


        // adding photo
        let img = document.createElement('img')
        img.src = pizza.icon

        let captionDiv = document.createElement('div')
        captionDiv.classList.add('caption')

        // adding title of pizza
        let titleH3 = document.createElement('h3')
        titleH3.textContent = pizza.title

        let smallP = document.createElement('p')
        smallP.classList.add('small-p')
        smallP.textContent = pizza.type

        let descriptionP = document.createElement('p')
        let temp = ""

        for (let key in pizza.content) {
            const values = pizza.content[key];
            const joinedValues = values.join(', ');
            if(temp !== "") temp = temp + ', ' +  joinedValues
            else temp = joinedValues.charAt(0).toUpperCase() + joinedValues.substring(1)
        }

        descriptionP.textContent = temp


        let iconsDiv = document.createElement('div')

        if('small_size' in pizza) {

            iconsDiv.classList.add('icons-for-small-size')


            let sizeIcon1 = document.createElement('img')
            sizeIcon1.src = 'assets/images/size-icon.svg'
            sizeIcon1.classList.add('icon-size')

            let sizeNumber1 = document.createElement('span')
            sizeNumber1.classList.add('number-small-size-icon')
            sizeNumber1.textContent = pizza.small_size.size

            iconsDiv.appendChild(sizeIcon1)
            iconsDiv.appendChild(sizeNumber1)
        }

        if('big_size' in pizza) {
            let sizeIcon2 = document.createElement('img')
            sizeIcon2.src = 'assets/images/size-icon.svg'

            let sizeNumber2 = document.createElement('span')
            sizeNumber2.classList.add('number-big-size-icon')
            sizeNumber2.textContent = pizza.big_size.size


            iconsDiv.appendChild(sizeIcon2)
            iconsDiv.appendChild(sizeNumber2)
        }


        ///
        let weightIconsDiv = document.createElement('div')
        weightIconsDiv.classList.add('weight-icons')

        if('small_size' in pizza) {
            let weightIcon1 = document.createElement('img')
            weightIcon1.src = 'assets/images/weight.svg'

            weightIcon1.classList.add('icon-size')

            let weightNumber1 = document.createElement('span')
            weightNumber1.classList.add('number-small-size-icon-weight')
            weightNumber1.textContent = pizza.small_size.weight

            weightIconsDiv.appendChild(weightIcon1)
            weightIconsDiv.appendChild(weightNumber1)
        }


//
        if('big_size' in pizza) {
            let weightIcon2 = document.createElement('img')
            weightIcon2.src = 'assets/images/weight.svg'

            let weightNumber2 = document.createElement('span')
            weightNumber2.classList.add('number-big-size-weight')
            weightNumber2.textContent = pizza.big_size.weight


            weightIconsDiv.appendChild(weightIcon2)
            weightIconsDiv.appendChild(weightNumber2)
        }


        let pricesDiv = document.createElement('div')
        pricesDiv.classList.add('prices')

        if('small_size' in pizza) {
            let priceSmall = document.createElement('span')
            priceSmall.classList.add('price-small-size')
            priceSmall.textContent = pizza.small_size.price

            pricesDiv.appendChild(priceSmall)
        }

        if('big_size' in pizza) {
            let priceBig = document.createElement('span')
            priceBig.classList.add('price-big-size')
            priceBig.textContent = pizza.big_size.price

            pricesDiv.appendChild(priceBig)
        }

        let hrnSmall
        if('small_size' in pizza) {
             hrnSmall = document.createElement('span');
            hrnSmall.classList.add('hrn-small-size');
            hrnSmall.textContent = 'грн.';
        }


// Створення блоку з класом "hrn-big-size"
        let hrnBig

        if('big_size' in pizza) {
            hrnBig = document.createElement('span');
            hrnBig.classList.add('hrn-big-size');
            hrnBig.textContent = 'грн.';
        }


// Створення блоку з класом "container-for-buttons"
        let buttonsDiv = document.createElement('p');
        buttonsDiv.classList.add('container-for-buttons');

// Створення елементів кнопок
        if('small_size' in pizza) {
            let button1 = document.createElement('a');
            button1.href = '#';
            button1.classList.add('btn', 'btn-default');
            button1.textContent = 'Button 1';
            button1.style.marginLeft = '8%'

            buttonsDiv.appendChild(button1);
        }


        if('big_size' in pizza) {
            let button2 = document.createElement('a');
            button2.href = '#';
            button2.classList.add('btn', 'btn-primary');
            button2.style.marginRight = '10%'
            button2.textContent = 'Button 2';

            buttonsDiv.appendChild(button2);
        }


// Додавання елементів до блоку "caption"
        captionDiv.appendChild(titleH3);
        captionDiv.appendChild(smallP);
        captionDiv.appendChild(descriptionP);
        captionDiv.appendChild(iconsDiv);
        captionDiv.appendChild(weightIconsDiv);
        captionDiv.appendChild(pricesDiv);
        if('small_size' in pizza) captionDiv.appendChild(hrnSmall);
        if('big_size' in pizza) captionDiv.appendChild(hrnBig);
        captionDiv.appendChild(buttonsDiv);

// Додавання елементів до блоку "thumbnail pizza-card"

        thumbnailDiv.appendChild(img);
        thumbnailDiv.appendChild(captionDiv);

// Додавання елементів до головного елемента
        colDiv.appendChild(thumbnailDiv);

// Додавання головного елемента до DOM
        let row = document.querySelector('.row')
        row.appendChild(colDiv)

        let container = document.querySelector('.container');
        container.appendChild(row);

        let box = document.querySelector('.box')
        box.appendChild(container)

    });

});