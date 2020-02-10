export default {
	SET_DROPDOWN_STATE (state, { id, _state }) {
		state._state.dropdownOpened[id] = _state
	},
	SET_CURRENT_WEEK (state, data) {
		state.currentWeek = data
	},
	SET_WEEKS (state, data) {
		state.weeks = data
	},
	SET_WEEK_MENU (state, data) {
		state.weekMenu = data
	},
	SET_CATEGORIES (state, data) {
		state.categories = data
	},
	SET_CURRENT_CATEGORY (state, data) {
		state.currentCategory = data
	},
	SET_PERSONS_COUNT (state, data) {
		state.persons = data

		// Добавим значение в выбранные
		state.selected.set.persons = data
	},
	SET_DISHES_COUNT (state, data) {
		state.dishes = data

		// Добавим значение в выбранные
		state.selected.set.dishes = data
	},
	SET_IS_MAIN_MENU (state, data) {
		state.selected.set.isMainMenu = data
	},
	ADD_DISH_TO_SET (state, data) {
		state.selected.set.dishesArr.push(data)
	},
	SET_SET_STATE (state, data) {
		state.setIsFull = data
	}
}