export default {
	methods: {
		checkHash () {
			// Проверяем хэш на наличие категории
			let hash = window.location.hash;
			let cat;

			if (hash) {
				hash = decodeURI(hash);

				cat = this.categoriesList.filter(cat=>cat.url === hash).length > 0 ? this.categoriesList.filter(cat=>cat.url === hash)[0] : undefined;
			}

			if (cat) {
				this.$store.dispatch('SET_CURRENT_CATEGORY', cat)
			} else if (this.categoriesList.filter(cat=>cat.active).length > 0) {
				this.$store.dispatch('SET_CURRENT_CATEGORY', this.categoriesList.filter(cat=>cat.active)[0])
				console.log('wrong category!');
			} else {
				this.$store.dispatch('SET_CURRENT_CATEGORY', this.categoriesList[0])
				console.log('wrong category!');
			}
		}
	}
}