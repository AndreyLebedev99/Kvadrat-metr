import Bids from './bidsModel'
import * as view from './bidsView'

export default async function () {
	// view.renderContainer()

	// Создаем объект Модели для работы с заявками
	if (!state.bids) state.bids = new Bids()

	// Получсем заявки с сервера
	await state.bids.getBids()

	// Отображаем заявки на странице
	view.renderBids(state.bids.bids)
}