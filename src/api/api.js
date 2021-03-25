import axios from 'axios';

export const pizzasAPI = {
  getPizzas(sortBy, category) {
    return axios
      .get(
        `/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${
          sortBy.type
        }&_order=${sortBy.order}`,
      )
      .then(({ data }) => data);
  },
};
