import { pizzasAPI } from '../../api/api';

const SET_PIZZAS = 'get-pizza/pizzas/SET_PIZZAS';

const initialState = {
  items: [],
  isLoaded: false,
};

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case SET_PIZZAS:
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    default:
      return state;
  }
};

// ACs
export const setPizzas = (items) => ({
  type: SET_PIZZAS,
  payload: items,
});

// thunk
export const fetchPizzas = () => async (dispatch) => {
  const data = await pizzasAPI.getPizzas();
  dispatch(setPizzas(data));
};

export default pizzas;
