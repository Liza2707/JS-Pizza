/**
 * Created by chaika on 25.01.16.
 */
let currentChapter = document.querySelector('.choosen-option').textContent
let sum
$(function () {
    sortByType(currentChapter)

    // встановити слухачів подій для кнопок сортування
    let buttons = document.querySelectorAll('.option')
    let leng = buttons.length
    for(let i =0; i < leng; i++) {
        buttons[i].addEventListener('click', function () {
            let type = buttons[i].textContent
            sortByType(type)
        })
    }
    let mainB = document.querySelector('.choosen-option')
    mainB.addEventListener('click', function () {
        let type = mainB.textContent
        sortByType(type)
    })

    let buttonClearOrder = document.getElementById('button-clear-order')
    buttonClearOrder.addEventListener('click', function () {
        let table = document.querySelector('.table-in-statistics')
      table.innerHTML = ''
        localStorage.clear()
        updateCountOfOrder()
        updateSum()
    })

    for(let i =0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let value = localStorage.getItem(key)
        let object = JSON.parse(value)
        // взяти конкретні дані, які треба для додавання піц у кошик
        let id = object.id
        let size = object.size
        let amount = object.amount
        addToCart(id, size, false, amount)
        updateSumForOnePizza(key, i)
    }

    updateCountOfOrder()
    updateSum()

    let buttonOrder = document.querySelector('.button-in-stat-to-order')
    buttonOrder.addEventListener('click', function () {
       if(localStorage.length !== 0) {
           window.alert('Дякуємо! Ваше замовлення прийнято в обробку. До сплати ' + sum + ' грн.')
           localStorage.clear()
           location.reload()
       }
        else window.alert('У Вас немає жодної позиції в кошику. Аби замовити, додайте, будь ласка, товар.')
    })
});


function addToCart(id, sizeOfPizza,isNew, amountArg) {
    let pizza
    let length = pizza_info.length
    for(let i =0; i < length; i++){
        if(id == pizza_info[i].id)  {
            pizza = pizza_info[i]
            break
        }
    }


    // Створення елементів для нового рядка
    let td1 = document.createElement('td')

    let firstColumn = document.createElement('div')
    firstColumn.classList.add('first-column')

    let nameOfPizza = document.createElement('div')
    nameOfPizza.classList.add('name-of-pizza-stat')
    nameOfPizza.textContent = pizza.title + ' (' + sizeOfPizza + ')'
    let iconsDiv = document.createElement('div')
    iconsDiv.classList.add('icons')

    let crossedCircleAndNumber = document.createElement('div')
    crossedCircleAndNumber.classList.add('crossed-circle-and-number')
    let imgSizeIcon = document.createElement('img')
    imgSizeIcon.src = "assets/images/size-icon.svg"

    let numberOfSizeIcon = document.createElement('span')
    numberOfSizeIcon.classList.add('number-of-size-icon')
    if(sizeOfPizza === 'Мала') numberOfSizeIcon.textContent = pizza.small_size.size
    else numberOfSizeIcon.textContent = pizza.big_size.size
    crossedCircleAndNumber.appendChild(imgSizeIcon)
    crossedCircleAndNumber.appendChild(numberOfSizeIcon)

    let weightIconAndNumber = document.createElement('div')
    weightIconAndNumber.classList.add('weight-icon-and-number')
    let imgWeight = document.createElement('img')
    imgWeight.src = "assets/images/weight.svg"

    let numberOfWeightIcon = document.createElement('span')
    numberOfWeightIcon.classList.add('number-of-weight-icon')
    if(sizeOfPizza === 'Мала')numberOfWeightIcon.textContent = pizza.small_size.weight
    else numberOfWeightIcon.textContent = pizza.big_size.weight

    weightIconAndNumber.appendChild(imgWeight)
    weightIconAndNumber.appendChild(numberOfWeightIcon)

    iconsDiv.appendChild(crossedCircleAndNumber)
    iconsDiv.appendChild(weightIconAndNumber)

    /////
    firstColumn.appendChild(nameOfPizza)
    firstColumn.appendChild(iconsDiv)

    let thirdRow = document.createElement('div')
    thirdRow.classList.add('third-row')

    let price = document.createElement('span')
    price.classList.add('price')
    if(sizeOfPizza === 'Мала')price.textContent = pizza.small_size.price + 'грн'
    else price.textContent = pizza.big_size.price +  'грн'
    // TODO
    // встановити відповідну ціну залежно від кількості

    let redButton = document.createElement('button')
    redButton.classList.add('red-button')
    redButton.textContent = '-'
    redButton.addEventListener('click', function () {
        let field = redButton.nextSibling.textContent
        let nameToChange = nameOfPizza.textContent
        if(parseInt(field) == 1) {
            newRow.remove()
            localStorage.removeItem(nameToChange)
        }
        else {
            redButton.nextSibling.textContent = parseInt(field) -  1
            updateLocalStorageMinusOneItem(nameToChange)
            let indexOfRow = Array.from(table.children).indexOf(newRow)
            updateSumForOnePizza(nameToChange, indexOfRow)
        }
        updateCountOfOrder()
        updateSum()


    })

    let amount = document.createElement('span')
    amount.className = 'amount'
    if(amountArg !== 0) amount.textContent = amountArg
    else amount.textContent = '1'

    let greenButton = document.createElement('button')
    greenButton.className = 'green-button'
    greenButton.textContent = '+'
    greenButton.addEventListener('click', function () {
        let field = greenButton.previousSibling.textContent
        greenButton.previousSibling.textContent = parseInt(field) + 1
        let name = nameOfPizza.textContent


        updateLocalStorageAddingOneItem(name)
        updateSum()
        let indexOfRow = Array.from(table.children).indexOf(newRow)
        updateSumForOnePizza(name, indexOfRow)
    })

    let crossButton = document.createElement('button')
    crossButton.className = 'cross-button'
    crossButton.textContent = 'x'
    crossButton.addEventListener('click', function () {
        let idToDelete = newRow.dataset.id
        newRow.remove()

        let nameToDelete = nameOfPizza.textContent
        localStorage.removeItem(nameToDelete)
        updateCountOfOrder()
        updateSum()
    })

    thirdRow.appendChild(price); thirdRow.appendChild(redButton); thirdRow.appendChild(amount)
    thirdRow.appendChild(greenButton);
    thirdRow.appendChild(crossButton);

    firstColumn.appendChild(thirdRow)

    td1.appendChild(firstColumn)


    let td2 = document.createElement('td')
    let imgPizza = document.createElement('img')
    imgPizza.className = 'cut-image-of-pizza'
    imgPizza.src = pizza.small_icon

    td2.appendChild(imgPizza)

    let newRow = document.createElement('tr')
    newRow.appendChild(td1)
    newRow.appendChild(td2)

    //
    newRow.dataset.id = pizza.id
    console.log("id рядка з піцою: " + pizza.id)

    let table = document.querySelector('.table-in-statistics')
    table.appendChild(newRow)

    let tableWrapper = document.querySelector('.table-wrapper')
    tableWrapper.appendChild(table)

    let test = parseInt(price.textContent.slice(0, -3))
    test++
    // додати або оновити кількість об'єкту в до localstorage
    if(amountArg === 0){
        let obj = {
            id: pizza.id,
            size: sizeOfPizza,
            price: price.textContent,
            amount: 1
        }

        let objString = JSON.stringify(obj)
        let key = nameOfPizza.textContent
        // ключ у вигляді Маргарита (Мала)
        localStorage.setItem(key, objString)
    }

}

function sortByType(typeOfPizza) {
    let toDelete = document.querySelectorAll('.col-md-4')
    let leng = toDelete.length
    for(let i =0; i < leng; i++) {
        toDelete[i].remove()
    }

    let number =0

    switch (typeOfPizza){
        case "Усі":
            pizza_info.forEach((pizza) => {
                let id = pizza.id
                addPizzaToPage(id)
                number = pizza_info.length
            })
            break
        case "М'ясні":
           pizza_info.forEach((pizza) => {
                   if('meat' in pizza.content || 'chicken' in pizza.content){
                       let id = pizza.id
                       number++
                       addPizzaToPage(id)
               }
        })
            break
        case "З ананасами":
            pizza_info.forEach((pizza) => {
                if('pineapple' in pizza.content){
                    let id = pizza.id
                    number++
                    addPizzaToPage(id)
                }
            })
            break
        case "З грибами":
            pizza_info.forEach((pizza) => {
                if('mushroom' in pizza.content){
                    let id = pizza.id
                    number++
                    addPizzaToPage(id)
                }
            })
            break
        case "З морепродуктами":
            pizza_info.forEach((pizza) => {
                if('ocean' in pizza.content){
                    let id = pizza.id
                    number++
                    addPizzaToPage(id)
                }
            })
            break
        case "Вега":
            pizza_info.forEach((pizza) => {
                if(!('meat' in pizza.content) && !('chicken' in pizza.content) && !('ocean' in pizza.content)) {
                    let id = pizza.id
                    number++
                    addPizzaToPage(id)
                }
            })
            break
    }

    let chapter = document.querySelector('.current-chapter')
    chapter.textContent = typeOfPizza
    let numberInPage = document.querySelector('.number')
    numberInPage.textContent = number

    let pastChapter = document.querySelector('.choosen-option')
    pastChapter.classList.remove('choosen-option')
    pastChapter.classList.add('option')
    for(let i =0; i < document.querySelectorAll('.option').length; i++){
        if(document.querySelectorAll('.option')[i].textContent === typeOfPizza) {
            let currentChapter = document.querySelectorAll('.option')[i]
            currentChapter.classList.remove('option')
            currentChapter.classList.add('choosen-option')
        }
    }
    currentChapter = typeOfPizza

}

function addPizzaToPage(id) { // додати піцу до сторінки за її id

    pizza_info.forEach((pizza) => {
        if(pizza.id == id) {

            let colDiv = document.createElement('div')
            colDiv.classList.add('col-sm-6', 'col-md-4')

            let thumbnailDiv = document.createElement('div')
            thumbnailDiv.classList.add('thumbnail', 'pizza-card')

            //додавання до піци data атрибут з id
            thumbnailDiv.dataset.id = pizza.id

            if ('is_popular' in pizza) {
                let labelPopularDiv = document.createElement('div')
                labelPopularDiv.classList.add('label-popular')
                thumbnailDiv.appendChild(labelPopularDiv);

            }

            if ('is_new' in pizza) {
                if('is_popular' in pizza) {
                    let labelNewDiv = document.createElement('div');
                    labelNewDiv.classList.add('label-new-additional');
                    thumbnailDiv.appendChild(labelNewDiv);
                } else {
                    let labelNewDiv = document.createElement('div');
                    labelNewDiv.classList.add('label-new');
                    thumbnailDiv.appendChild(labelNewDiv);
                }

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
                if (temp !== "") temp = temp + ', ' + joinedValues
                else temp = joinedValues.charAt(0).toUpperCase() + joinedValues.substring(1)
            }

            descriptionP.textContent = temp


            let iconsDiv = document.createElement('div')

            if ('small_size' in pizza) {

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

            if ('big_size' in pizza) {
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

            if ('small_size' in pizza) {
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
            if ('big_size' in pizza) {
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

            if ('small_size' in pizza) {
                let priceSmall = document.createElement('span')
                priceSmall.classList.add('price-small-size')
                priceSmall.textContent = pizza.small_size.price

                pricesDiv.appendChild(priceSmall)
            }

            if ('big_size' in pizza) {
                let priceBig = document.createElement('span')
                priceBig.classList.add('price-big-size')
                priceBig.textContent = pizza.big_size.price

                pricesDiv.appendChild(priceBig)
            }

            let hrnSmall
            if ('small_size' in pizza) {
                hrnSmall = document.createElement('span');
                hrnSmall.classList.add('hrn-small-size');
                hrnSmall.textContent = 'грн.';
            }


// Створення блоку з класом "hrn-big-size"
            let hrnBig

            if ('big_size' in pizza) {
                hrnBig = document.createElement('span');
                hrnBig.classList.add('hrn-big-size');
                hrnBig.textContent = 'грн.';
            }


// Створення блоку з класом "container-for-buttons"
            let buttonsDiv = document.createElement('p');
            buttonsDiv.classList.add('container-for-buttons');

// Створення елементів кнопок
            if ('small_size' in pizza) {
                let button1 = document.createElement('button');
                button1.href = '#';
                button1.classList.add('btn', 'btn-default');
                button1.textContent = 'Button 1';
                button1.style.marginLeft = '8%'

                buttonsDiv.appendChild(button1);

                button1.addEventListener('click', function () {
                    let idOfPizza = thumbnailDiv.dataset.id
                    let nameOfPizza = pizza.title + ' (Мала)'
                    if(localStorage.getItem(nameOfPizza) === null) addToCart(idOfPizza, 'Мала', true, 0)
                    else {
                        for(let i =0; i < document.querySelectorAll('.name-of-pizza-stat').length; i++) {
                            if(document.querySelectorAll('.name-of-pizza-stat')[i].textContent === nameOfPizza){
                                let field = document.querySelectorAll('.amount')[i].textContent
                                document.querySelectorAll('.amount')[i].textContent = parseInt(field) + 1
                                break
                            }
                        }
                        updateLocalStorageAddingOneItem(nameOfPizza)
                    }
                    updateCountOfOrder()
                    updateSum()
                    let c = document.querySelectorAll('.name-of-pizza-stat').length
                    for(let i =0; i < c; i++) {
                        if(document.querySelectorAll('.name-of-pizza-stat')[i].textContent === nameOfPizza) {
                            updateSumForOnePizza(nameOfPizza, i)
                            break
                        }
                    }
                })
            }


            if ('big_size' in pizza) {
                let button2 = document.createElement('button');
                button2.href = '#';
                button2.classList.add('btn', 'btn-primary');
                button2.style.marginRight = '10%'
                button2.textContent = 'Button 2';

                buttonsDiv.appendChild(button2);

                button2.addEventListener('click', function () {
                    let idOfPizza = thumbnailDiv.dataset.id
                    let nameOfPizza = pizza.title + ' (Велика)'
                    if(localStorage.getItem(nameOfPizza) === null) addToCart(idOfPizza, 'Велика', true, 0)
                    else {
                        for(let i =0; i < document.querySelectorAll('.name-of-pizza-stat').length; i++) {
                            if(document.querySelectorAll('.name-of-pizza-stat')[i].textContent === nameOfPizza){
                                let field = document.querySelectorAll('.amount')[i].textContent
                                document.querySelectorAll('.amount')[i].textContent = parseInt(field) + 1
                                break
                            }
                        }
                        updateLocalStorageAddingOneItem(nameOfPizza)
                    }
                    updateCountOfOrder()
                    updateSum()
                    let c = document.querySelectorAll('.name-of-pizza-stat').length
                    for(let i =0; i < c; i++) {
                        if(document.querySelectorAll('.name-of-pizza-stat')[i].textContent === nameOfPizza) {
                            updateSumForOnePizza(nameOfPizza, i)
                            break
                        }
                    }
                })
            }


// Додавання елементів до блоку "caption"
            captionDiv.appendChild(titleH3);
            captionDiv.appendChild(smallP);
            captionDiv.appendChild(descriptionP);
            captionDiv.appendChild(iconsDiv);
            captionDiv.appendChild(weightIconsDiv);
            captionDiv.appendChild(pricesDiv);
            if ('small_size' in pizza) captionDiv.appendChild(hrnSmall);
            if ('big_size' in pizza) captionDiv.appendChild(hrnBig);
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
        }
    });

}

function updateLocalStorageAddingOneItem(nameOfPizza) {
    let storedObjString = localStorage.getItem(nameOfPizza)
    let storedObj = JSON.parse(storedObjString)

    storedObj.amount = storedObj.amount + 1
    let updatedObjString = JSON.stringify(storedObj)

    localStorage.setItem(nameOfPizza, updatedObjString)
}

function updateLocalStorageMinusOneItem(nameOfPizza) {
    let storedObjString = localStorage.getItem(nameOfPizza)
    let storedObj = JSON.parse(storedObjString)

    storedObj.amount = storedObj.amount - 1
    let updatedObjString = JSON.stringify(storedObj)

    localStorage.setItem(nameOfPizza, updatedObjString)
}

function updateCountOfOrder() {
        document.querySelectorAll('.number')[1].textContent = localStorage.length.toString()
}

function updateSum(){
    let count =0
   for(let i =0; i < localStorage.length; i++) {
       let key = localStorage.key(i)
       let value = localStorage.getItem(key)
       let object = JSON.parse(value)
       let amount = object.amount
       let price = object.price.slice(0, -3)
       count += amount * price
   }
   document.querySelector('.sum-of-order').textContent = count.toString()
    sum = count
}

function updateSumForOnePizza(nameOfPizza, indexOfRow) {
    let value = localStorage.getItem(nameOfPizza)
    let object = JSON.parse(value)
    let amount = object.amount
    let price = object.price.slice(0, -3)
    let sum = price * amount
    document.querySelectorAll('.price')[indexOfRow].textContent = sum + 'грн'
}