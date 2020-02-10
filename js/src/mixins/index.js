export default {
	methods: {
		checkHash () {
			// Проверяем хэш на наличие категории
			let hash = window.location.hash;
			let cat;

			if (hash) {
				hash = decodeURI(hash).splice(1);

				cat = this.categories.filter(cat=>cat.name === hash).length > 0 ? this.categories.filter(cat=>cat.name === hash)[0] : undefined;
			}

			if (cat) {
				this.$store.dispatch('SET_CURRENT_CATEGORY', cat)
			} else if (this.categories.filter(cat=>cat.uf_default).length > 0) {
				this.$store.dispatch('SET_CURRENT_CATEGORY', this.categories.filter(cat=>cat.uf_default)[0])
				console.log('wrong category!');
			} else {
				this.$store.dispatch('SET_CURRENT_CATEGORY', this.categories[0])
				console.log('wrong category!');
			}
		}
	}
}