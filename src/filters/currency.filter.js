export default function currencyFilter(value, currency = 'SEK') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(value)
}