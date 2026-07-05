// Generates a deterministic, seeded "monthly sales" series for the seller
// dashboard chart. There's no real order backend, so this stands in for
// what a real sales history endpoint would return. Seeded so numbers stay
// stable across refreshes instead of jumping around randomly.

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export function getMockMonthlySales(sellerProducts) {
  const rand = seededRandom(sellerProducts.length + 7);
  const avgPrice =
    sellerProducts.length > 0
      ? sellerProducts.reduce((sum, p) => sum + p.price, 0) /
        sellerProducts.length
      : 1200;

  return MONTHS.map((month) => {
    const unitsSold = Math.floor(rand() * 12) + 2;
    return {
      month,
      revenue: Math.round(unitsSold * avgPrice),
      unitsSold,
    };
  });
}