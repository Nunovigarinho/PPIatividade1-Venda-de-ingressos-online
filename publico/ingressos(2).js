const quantityInput = document.getElementById('quantity');
const totalPrice = document.getElementById('total-price');
const ticketPrice = 400; // Preço fixo para o exemplo

quantityInput.addEventListener('input', () => {
const quantity = quantityInput.value;
totalPrice.textContent = `R$${(ticketPrice * quantity).toFixed(2)}`;
});

