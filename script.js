const USD = 5.62;
const EUR = 6.21;
const GBP = 7.39;

const form = document.querySelector('form')
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const footer = document.querySelector('main footer');
const description = document.getElementById('description');
const result = document.getElementById('result');

amount.addEventListener('input', () => {
    const hasCharacterRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharacterRegex, "");
})

form.onsubmit = (event) => {
    event.preventDefault();

    switch(currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, 'US$');
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, '€');
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, '£');
            break;
    }
}

function convertCurrency (amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        
        let total = amount * price;

        if(isNaN(total)) {
            toast("Por favor, digite o valor corretamente para converter", 3000, 'bottom', 'left', 'red', 'white');
        }

        total = formatCurrencyBRL(total).replace("R$", "")

        result.textContent = `${total} Reais`

        footer.classList.add('show-result');
        
    } catch (error) {
        console.log(error)
        footer.classList.remove('show-result')
        toast("Não foi possível converter. Tente novamente mais tarde.", 3000, 'bottom', 'left', 'red', 'white');
    }
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

function toast(text, duration, gravity, position, background, color) {
    Toastify({
        text: text,
        duration: duration,
        close: true,
        gravity: gravity,
        position: position,
        stopOnFocus: true,
        style: {
          background: background,
          color: color,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}