import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const tokenAddress = '6g3FkkCcDXh6PGUSVAXN1AKbpyzQtygj7SATK41bonk';
  const apiUrl = `http://38.247.80.28:8000/price/${tokenAddress}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch token price: ${response.statusText}`);
    }
    const data = await response.json();

    console.log(data);

    // The API returns data in a specific format, let's extract the price.
    const priceData = data[tokenAddress];

    if (!priceData) {
      return {
        error: 'Price data not found for the given token address.',
      };
    }

    return {
      price: priceData.usdPrice,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'An error occurred while fetching the token price.',
      details: error instanceof Error ? error.message : String(error),
    };
  }
});
