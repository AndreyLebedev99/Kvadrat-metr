import * as view from './listingVew'

export default function (state) {

    // Рендер контейнера карточек
    view.render();

    // Рендер карточек
    state.results.forEach(item => {
        view.renderCard(item, state.favourites.isFav(item.id))
    });

    // Прослушка клика на иконки "Добавить в избранное"
    addToFavListener()

    state.emitter.subscribe('event:render-listing', () => {
        // Очистить контейнер с карточками
        view.clearListingContainer()

        // Отрендерить карточки
        state.results.forEach(item => {
            view.renderCard(item, state.favourites.isFav(item.id))
        });

        // Прослушка клика на иконки "Добавить в избранное"
        addToFavListener()
    });


    // Функция для работы иконок "Добавить в избранное"
    function addToFavListener() {
        Array.from(document.getElementsByClassName('card__like')).forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault()

                // Находим id объекта по которму кликнули
                const currentId = e.target.closest('.card').dataset.id

                /// Добавляем/Удаляем элемент из избранного
                state.favourites.toggleFav(currentId)

                // Включаем/выключаем иконку с избранным
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId))

            })
        })
    }
}