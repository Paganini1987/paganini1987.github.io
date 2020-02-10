export default {
	GET_DROPDOWN_STATE (state) {
		return state._state.dropdownOpened
	},
	GET_CURRENT_WEEK (state) {
		return state.currentWeek
	},
	GET_WEEKS (state) {
		return  state.weeks.filter(week=> week._to - new Date() > 0);
	},
	GET_WEEK_MENU (state) {
		return state.currentCategory.products ? state.currentCategory.products : []
	},
	GET_SET_PARAMS (state) {
		return state.currentCategory.set_params ? state.currentCategory.set_params : []
	},
	GET_CATEGORIES (state) {
		return state.categories
	},
	GET_CURRENT_CATEGORY (state) {
		return state.currentCategory
	},
	GET_PERSONS_COUNT (state) {
		return state.persons
	},
	GET_DISHES_COUNT (state) {
		return state.dishes
	},
	GET_SELECTED_DISHES (state) {
		return state.selected.set.dishesArr
	},
	GET_SET_STATE (state) {
		return state.setIsFull
	}
}