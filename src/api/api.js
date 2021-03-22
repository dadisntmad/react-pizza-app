import axios from 'axios';

export const pizzasAPI = {
  getPizzas() {
    return axios.get('http://localhost:3001/pizzas').then(({ data }) => data);
  },
};
