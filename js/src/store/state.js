const DOMAIN = 'https://uzhindoma.brychkin.w.ibrush.ru'

export default {
	API: {
		SITE_ID: 's1',
		getWeeks: DOMAIN + '/bitrix/services/main/ajax.php?action=ibrush:api.api.catalog.getWeeks',
		getWeekMenu: DOMAIN + '/bitrix/services/main/ajax.php?action=ibrush:api.api.catalog.getWeekMenu'
	},
	_state: {
		dropdownOpened: {}
	},
	weeks: [],
	currentWeek: {},
	weekMenu: [],
	categories: [],
	currentCategory: {},
	persons: '',
	dishes: '',
	setIsFull: false,
	selected: {
		set: {
			isMainMenu: false,
			dishesArr: [],
			persons: '',
			dishes: ''
		}
	}
	
}