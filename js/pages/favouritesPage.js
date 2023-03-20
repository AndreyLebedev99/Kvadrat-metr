import favouritesCards from "./../favouritesCard/favouritesCardsController";

export default function (state) {
	favouritesCards(state)
	document.querySelector('#app').innerHTML = '';
}
