export default function (_week) {
	let week = Object.assign({}, _week);
	let from = new Date();
	let to = new Date();

	let arrRaw;
	let day;
	let month;
	let year;

	let monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

	if (week.code) {
		arrRaw = week.code.split('-');

		if (Array.isArray(arrRaw) && arrRaw.length === 3) {
			day = +arrRaw[0]
			month = +arrRaw[1]
			year = +arrRaw[2]

			if (day && month && year) {
				from.setFullYear(year, month - 1, day)
				from.setHours(0, 0, 0, 0)

				to.setFullYear(year, month - 1)
				to.setDate(day + 6)
				to.setHours(23, 59, 59, 0)

				week._from = from

				week._to = to

				// Формат для вывода

				// Если начало и конец недели в рвзные месяцы
				let str = '';

				if (week._from.getMonth() !== week._to.getMonth()) {
					str = `с ${week._from.getDate()} ${getMontString(week._from.getMonth())} по ${week._to.getDate()} ${getMontString(week._to.getMonth())}`
				} else {
					str = `с ${week._from.getDate()} по ${week._to.getDate()} ${getMontString(week._to.getMonth())}`
				}

				week._str = str
			}
		}
	}

	function getMontString (month) {
		return monthList[month]
	}

	return week
}