export function calculateTotal(amounts: string): number {
  const amountArray = amounts
    .split(/[\n,]+/) // Split by new lines OR commas
    .map((amt) => amt.trim())
    .filter((amt) => amt !== "") // Remove empty strings
    .map((amt) => parseFloat(amt)); // Convert to numbers

  return amountArray
    .filter((num) => !isNaN(num)) // Remove any non-numeric values
    .reduce((sum, num) => sum + num, 0); // Sum all valid numbers
}
