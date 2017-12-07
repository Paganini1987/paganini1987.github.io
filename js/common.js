var mainModule={
	content: {
		first_name: {
			value: '',
			valid: false
		},
		last_name:  {
			value: '',
			valid: false
		},
		primary_email:  {
			value: '',
			valid: false
		},
		phone_number:  {
			value: '',
			valid: false
		},
		country:  {
			value: '',
			valid: false
		},
		city:  {
			value: '',
			valid: false
		},
		comments:  {
			value: '',
			valid: true
		},
		check: {
			value: false,
			valid: false
		},
	},
	formStatus: function() {
		for (var prop in this.content) {
			if (!this.content[prop].valid) {
				return false;
			}
		}
		return true;
	},
	changeValue: function(obj, status) {
		var name=obj.id;
		var value=obj.value;

		if (name in this.content) {
			this.content[name].value=value;
			this.content[name].valid=status;

			if (status) {
				obj.classList.remove('invalid');
			} else {
				obj.classList.add('invalid');
				obj.focus()
			}

		} else {
			console.error(name, 'отсутствует в объекте');
		}	
	},
	isEmpty: function (value) {
		if (value=='') {
			return true;
		} else {
			return false;
		}
	},
	checkEmail: function(value) {
		var email=/.+@.+\..+/i;

		return email.test(value);
	},
	checkPhone: function(value) {
		var phone=/^([0-9]|[-]|[+]|\s){8,100}$/;

		return phone.test(value);
	},
	checkBox: function() {
		var checkbox=document.querySelector('#check')

		return checkbox.value;
	},
	sendData: function() {
		var xhr = new XMLHttpRequest();
		var data=JSON.stringify(this.content);
		
		xhr.open('GET', 'http://localhost:3000/', true);
		xhr.send(data);
		
		xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		
		if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				console.log('Ответ от сервера');
			}	
		}
		console.log(data);
	},
	checkForm: function(obj_) {
		var obj=obj_.target ? obj_.target : obj_;
		var key=obj_.target ? obj_.key : '';
		
		if (key==='Tab') {
			return null;
		}

		if (obj.id==='first_name' || obj.id==='last_name' || obj.id==='country' || obj.id==='city') {
			if (this.isEmpty(obj.value)) {
				this.changeValue(obj, false);
			} else {
				this.changeValue(obj, true);
			}
		}

		if (obj.id==='comments') {
			this.changeValue(obj, true);
		}

		if (obj.id==='primary_email') {
			if (!this.isEmpty(obj.value) && this.checkEmail(obj.value)) {
				this.changeValue(obj, true);
			} else {
				this.changeValue(obj, false);
			}
		}

		if (obj.id==='phone_number') {
			if (!this.isEmpty(obj.value) && this.checkPhone(obj.value)) {
				this.changeValue(obj, true);
			} else {
				this.changeValue(obj, false);
			}
		}

		if (obj.id==='check' && key=='') {
			if (!obj.checked) {
				alert('Вы должны согласиться с условиями');
				this.changeValue(obj, false);
			}
		}
	},
	addListeners: function() {
		var that=this;
		var button=document.querySelector('.next_button');
		var check=document.querySelector('#check');
		var hamburger=document.querySelector('.hamburger');
		var m_menu=document.querySelector('.m_menu');
		var close_m_menu=document.querySelector('.close_m_menu');

		document.addEventListener('keyup', this.checkForm.bind(this))

		document.addEventListener('keypress', function(e) {
			var form = document.forms.personal_information;

			if (e.key==='Enter') {
				if (!that.formStatus()) {
					for (var i=0; i<form.elements.length; i++) {
						that.checkForm(form.elements[i]);
					}
				} else {
					that.sendData();
				}
			}
		})

		check.addEventListener('click', function(e) {
			console.log(e);
			if (e.target.checked) {
				that.changeValue(e.target, true);
			} else {
				that.changeValue(e.target, false);
			}
			
		})

		button.addEventListener('click', function() {
			var form = document.forms.personal_information;

			if (!that.formStatus()) {
				for (var i=0; i<form.elements.length; i++) {
					that.checkForm(form.elements[i]);
				}
			} else {
				that.sendData();
			}
		})

		hamburger.addEventListener('click', function() {
			m_menu.style.display='block';
		})

		close_m_menu.addEventListener('click', function() {
			m_menu.style.display='none';
		})

		window.addEventListener('resize', function() {
			m_menu.style.display='none';
		})

	}
}



window.onload=function() {
	mainModule.addListeners();
}


