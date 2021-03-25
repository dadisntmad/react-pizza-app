import {pizzasAPI} from '../../api/api';

const SET_PIZZAS = 'get-pizza/pizzas/SET_PIZZAS';
const SET_LOADED = 'get-pizza/pizzas/SET_LOADED';

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
        case SET_LOADED:
            return {
                ...state,
                isLoaded: action.payload,
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

export const setLoaded = (payload) => ({
    type: SET_LOADED,
    payload,
});

// thunk
export const fetchPizzas = (sortBy, category) => async (dispatch) => {
    dispatch(setLoaded(false));
    const data = await pizzasAPI.getPizzas(sortBy, category);
    dispatch(setPizzas(data));
};

export default pizzas;
