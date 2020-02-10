function lsGetData () {
	let string = window.localStorage.dinnerAtHome;
	let data;

	if (string) {
		data = JSON.parse(string)
	}

	return data
}

function lsSetData (key, data) {
	let oldData = lsGetData();

	if (oldData) {
		oldData[key] = data
	} else {
		oldData = {}
		oldData[key] = data
	}
	

	window.localStorage.dinnerAtHome = JSON.stringify(oldData)

	return true
}

export { lsSetData, lsGetData }