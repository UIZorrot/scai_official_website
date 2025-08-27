import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const tokenAddress = '6g3FkkCcDXh6PGUSVAXN1AKbpyzQtygj7SATK41bonk';
  const apiUrl = `http://38.247.80.28:8000/price/${tokenAddress}`;

  try {
    // 添加超时控制，3秒后超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

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
        price: 0, // 返回默认价格
      };
    }

    return {
      price: priceData.usdPrice || 0,
    };
  } catch (error) {
    console.error('Token price API error:', error);

    // 返回默认数据，不阻塞页面加载
    return {
      error: 'Token price service temporarily unavailable',
      price: 0, // 默认价格
      details: error instanceof Error ? error.message : String(error),
    };
  }
});
