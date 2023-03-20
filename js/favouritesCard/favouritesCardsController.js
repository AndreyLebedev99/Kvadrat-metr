import FavouritesCards from "./favouritesCardModel"
import * as view from './favouritesCardsView'

export default async function(state){
	// Получить список объектов, которые находятся в избранном
	const favList = state.favourites.favs
	
	// Получение данных с сервера
	const favouritesCards = new FavouritesCards(favList)
	await favouritesCards.getFavs()

	// Отображаем контейнер и карточки
	view.renderPage(favouritesCards.cards)

	addToFavListener()

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