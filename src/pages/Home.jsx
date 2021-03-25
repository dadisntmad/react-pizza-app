import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Categories, LoadingBlock, PizzaBlock, SortPopup} from '../components';
import {setCategory, setSortBy} from '../redux/reducers/filters';
import {fetchPizzas} from '../redux/reducers/pizzas';
import {addPizzaToCart} from "../redux/reducers/cart";

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'},
];

const Home = () => {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);

    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, sortBy]);

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    const onClickSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddPizza = (obj) => {
        dispatch(addPizzaToCart(obj));
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    items={categoryNames}
                    onClickCategory={onSelectCategory}
                />
                <SortPopup
                    activeSortType={sortBy.type}
                    items={sortItems}
                    onClickSortPopup={onClickSortType}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => <PizzaBlock
                        key={obj.id} {...obj}
                        onClickAddPizza={handleAddPizza}
                        addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}/>)
                    : Array(10)
                        .fill(0)
                        .map((_, index) => <LoadingBlock key={index}/>)}
            </div>
        </div>
    );
};

export default Home;
