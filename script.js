class Currency {
    constructor() {
        this.currenciesFrom = document.querySelectorAll('.curr-from');
        this.currenciesTo = document.querySelectorAll('.curr-to');
    }
    showAllCurrencies(calc, changeCurrentCurrency) {
        let target = '';
        const currenciesDropdown = document.querySelector('.dropdown-currency-wrapper');
        const currenciesDropdownLi = document.querySelectorAll('.dropdown-currency-wrapper ul li');
        const currenciesFrom = document.querySelectorAll('.curr-from');
        const currenciesTo = document.querySelectorAll('.curr-to');
        const rectangle = document.querySelectorAll('.rectangle');
        rectangle.forEach(reg => reg.addEventListener('click', (e) => {
            currenciesDropdown.classList.toggle('block');
            target = e.target;
        }))
        currenciesDropdownLi.forEach(li => li.addEventListener('click', function (e) {
            let some = false;
            if (target.classList.contains('convert-from')) {
                currenciesFrom.forEach(cur => {
                    cur.classList.remove('selected');
                })
                if (target.matches('img.convert-from')) {

                    currenciesFrom.forEach(cur => {
                        if (cur.innerText == this.childNodes[1].innerText) {
                            cur.classList.add('selected');
                            some = true;
                        }
                    })
                    if (!some) {
                        target.parentNode.parentNode.childNodes[1].innerText = this.childNodes[1].innerText;
                        target.parentNode.parentNode.childNodes[1].classList.add('selected');
                    }
                }
                if (target.matches('div.convert-from')) {
                    currenciesFrom.forEach(cur => {
                        if (cur.innerText == this.childNodes[1].innerText) {
                            cur.classList.add('selected');
                            some = true;
                        }
                    })
                    if (!some) {
                        target.parentNode.childNodes[1].innerText = this.childNodes[1].innerText;
                        target.parentNode.childNodes[1].classList.add('selected');
                    }
                }
                calc();
                changeCurrentCurrency();
            }
            if (target.classList.contains('convert-to')) {
                currenciesTo.forEach(cur => {
                    cur.classList.remove('selected');
                })
                if (target.matches('img.convert-to')) {
                    currenciesTo.forEach(cur => {
                        if (cur.innerText == this.childNodes[1].innerText) {
                            cur.classList.add('selected');
                            some = true;
                        }
                    })
                    if (!some) {
                        target.parentNode.parentNode.childNodes[1].innerText = this.childNodes[1].innerText;
                        target.parentNode.parentNode.childNodes[1].classList.add('selected');
                    }

                }
                if (target.matches('div.convert-to')) {
                    currenciesTo.forEach(cur => {
                        if (cur.innerText == this.childNodes[1].innerText) {
                            cur.classList.add('selected');
                            some = true;
                        }
                    })
                    if (!some) {
                        target.parentNode.childNodes[1].innerText = this.childNodes[1].innerText;
                        target.parentNode.childNodes[1].classList.add('selected');;
                    }

                }
                calc();
                changeCurrentCurrency();
            }
            currenciesDropdown.classList.toggle('block');
        }))
    }

    addSelectedClass(block, calc, changeCurrentCurrency) {
        block.forEach(element => {
            element.addEventListener('click', function () {
                block.forEach(element => {
                    element.classList.remove('selected');
                })
                element.classList.add('selected');
                calc();
                changeCurrentCurrency();
            })
        })
    }
}

class Changer {
    constructor() {}

    chageCurrencies(calc) {
        const inputConvertFrom = document.querySelector('input.convert-from');
        const inputConvertTo = document.querySelector('input.convert-to');
        const change = document.querySelector('.change');
        const currenciesFrom = document.querySelectorAll('.curr-from');
        const currenciesTo = document.querySelectorAll('.curr-to');

        change.addEventListener('click', () => {
            let value = inputConvertFrom.value;
            let from = '';
            let to = '';
            let some = false;
            inputConvertFrom.value = inputConvertTo.value;
            inputConvertTo.value = value;
            currenciesFrom.forEach(cur => {
                if (cur.classList.contains('selected')) {
                    from = cur.innerText;
                }
            })
            currenciesTo.forEach(cur => {
                if (cur.classList.contains('selected')) {
                    to = cur.innerText;
                }
            })

            for (let i = 0; i < currenciesFrom.length; i++) {
                if (currenciesFrom[i].innerText == to) {
                    currenciesFrom.forEach(element => {
                        element.classList.remove('selected');
                    })
                    currenciesFrom[i].classList.add('selected');
                    some = true;
                }
            }

            if (!some) {
                currenciesFrom.forEach(cur => {
                    currenciesFrom.forEach(element => {
                        element.classList.remove('selected');
                    })
                    currenciesFrom[0].classList.add('selected');
                    currenciesFrom[0].innerText = to;
                })

            }

            some = false;
            for (let i = 0; i < currenciesTo.length; i++) {
                if (currenciesTo[i].innerText == from) {
                    currenciesTo.forEach(element => {
                        element.classList.remove('selected');
                    })
                    currenciesTo[i].classList.add('selected');
                    some = true;
                }
            }

            if (!some) {
                currenciesTo.forEach(cur => {
                    currenciesTo.forEach(element => {
                        element.classList.remove('selected');
                    })
                    currenciesTo[0].classList.add('selected');
                    currenciesTo[0].innerText = from;
                })

            }
            this.changeCurrentCurrency();
        })
        calc();
    }
    changeCurrentCurrency() {
        const currencyFrom = document.querySelector('.selected-currency.from span');
        const currencyTo = document.querySelector('.selected-currency.to span');
        const convertFrom = document.querySelector('.curr-from.selected').innerText;
        const convertTo = document.querySelector('.curr-to.selected').innerText;

        fetch(`https://api.ratesapi.io/api/latest?base=${convertFrom}&symbols=${convertTo}`)
            .then(res => res.json())
            .then(res => {
                currencyFrom.childNodes[3].innerText = res.rates[convertTo];
            })
            .catch(err => err)

        fetch(`https://api.ratesapi.io/api/latest?base=${convertTo}&symbols=${convertFrom}`)
            .then(res => res.json())
            .then(res => {
                currencyTo.childNodes[3].innerText = res.rates[convertFrom];
            })
            .catch(err => err)
        currencyFrom.childNodes[1].innerText = convertFrom;
        currencyFrom.childNodes[5].innerText = convertTo;
        currencyTo.childNodes[1].innerText = convertTo;
        currencyTo.childNodes[5].innerText = convertFrom;
    }
}

class Calculator {
    constructor() {}

    calcCurrency() {
        const inputConvertFrom = document.querySelector('input.convert-from');
        const inputConvertTo = document.querySelector('input.convert-to');
        inputConvertFrom.addEventListener('input', this.calcFrom);
        inputConvertTo.addEventListener('input', this.calc);
    }

    calc() {
        const inputConvertFrom = document.querySelector('input.convert-from');
        const inputConvertTo = document.querySelector('input.convert-to');
        const currenciesFrom = document.querySelectorAll('.curr-from');
        const currenciesTo = document.querySelectorAll('.curr-to');
        let from = 'RUB';
        let to = 'USD';
        currenciesFrom.forEach(cur => {
            if (cur.classList.contains('selected')) {
                from = cur.innerText;
            }
        })
        currenciesTo.forEach(cur => {
            if (cur.classList.contains('selected')) {
                to = cur.innerText;
            }
        })
        const loading = document.querySelector('.loading');
        loading.style.display = 'block';
        document.querySelector('body').style.backgroundColor = '#8F8F8F';

        fetch(`https://api.ratesapi.io/api/latest?base=${to}&symbols=${from}`)
            .then(res => res.json())
            .then(res => {
                loading.style.display = 'none';
                document.querySelector('body').style.backgroundColor = 'white';
                inputConvertFrom.value = +inputConvertTo.value * res.rates[from];
            })
            .catch(err => alert('Что-то пошло не так!'));
    }

    calcFrom() {
        const inputConvertFrom = document.querySelector('input.convert-from');
        const inputConvertTo = document.querySelector('input.convert-to');
        const currenciesFrom = document.querySelectorAll('.curr-from');
        const currenciesTo = document.querySelectorAll('.curr-to');
        let from = 'RUB';
        let to = 'USD';
        currenciesFrom.forEach(cur => {
            if (cur.classList.contains('selected')) {
                from = cur.innerText;
            }
        })
        currenciesTo.forEach(cur => {
            if (cur.classList.contains('selected')) {
                to = cur.innerText;
            }
        })
        const loading = document.querySelector('.loading');
        loading.style.display = 'block';
        document.querySelector('body').style.backgroundColor = '#8F8F8F';

        fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`)
            .then(res => res.json())
            .then(res => {
                loading.style.display = 'none';
                document.querySelector('body').style.backgroundColor = 'white';
                inputConvertTo.value = +inputConvertFrom.value * res.rates[to];
            })
            .catch(err => alert('Что-то пошло не так!'))
    }
}

class Application {
    constructor() {
        this.launch();
    }

    launch() {
        const currency = new Currency();
        const changer = new Changer();
        const calculator = new Calculator();
        calculator.calc();
        calculator.calcCurrency();
        changer.chageCurrencies(calculator.calc);
        changer.changeCurrentCurrency();
        currency.addSelectedClass(currency.currenciesFrom, calculator.calcFrom, changer.changeCurrentCurrency);
        currency.addSelectedClass(currency.currenciesTo, calculator.calc, changer.changeCurrentCurrency);
        currency.showAllCurrencies(calculator.calcFrom, changer.changeCurrentCurrency);
    }
}

new Application();