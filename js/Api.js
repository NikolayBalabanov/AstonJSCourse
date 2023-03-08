const API_URL = 'https://jsonplaceholder.typicode.com';

export class Api {
  static getResource = async (endPiont) => {
    try {
      const res = await fetch(`${API_URL}${endPiont}`);
      if (res.ok) {
        return res;
      }
      throw new Error(`Failed to fetch ${endPiont}, received ${res.status}`);
    } catch (error) {
      alert(error.message);
      return null;
    }
  };

  static getResourcesWithLimit = async (endPiont, page = 1, limit = 10) => {
    const response = await Api.getResource(`/${endPiont}/?_limit=${limit}&_page=${page}`);
    if (response) {
      const data = await response.json();
      return {
        data,
        total: response.headers.get('x-total-count') || null,
      };
    } else {
      return null;
    }

  };

  static getItem = async (itemName, id) => {
    const response = await Api.getResource.getResource(`/${itemName}/${id}/`);
    if (response) {
      return await response.json();
    } else {
      return null;
    }
  };
}
