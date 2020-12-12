/**
 * Contains utility functions to make API requests to the orders endpoint
 *
 */

export const BASE_URL = "https://eshop-deve.herokuapp.com/api/v2";
// Token in the project specification
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYwNTY0NDA0NzA1OH0.skfIY_7CAANkxmhoq37OI4jYRE8flx1ENq1v1VaRevJiroYNFQYz7Oy6hL1YZ1OJkevXSQFuLMHTqY0w6d5nPQ";

/**
 * Fetches JSON data using window.fetch. GET request
 * @param {RequestInfo} requestInfo request info passed to fetch
 * @param {RequestInit} [init] options passed to fetch
 * @returns {Promise}
 */
export async function fetchGetJson(input, init) {
  const response = await fetch(input, init);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  // Throw a simple error here
  throw new Error("Error fetching");
}

/**
 * Fetches orders
 * @returns {Promise}
 */
export function fetchOrders() {
  return fetchGetJson(`${BASE_URL}/orders`, {
    headers: {
      Authorization: AUTH_TOKEN,
    },
    mode: "cors",
  });
}
