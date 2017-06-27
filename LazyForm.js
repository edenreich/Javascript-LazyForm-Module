var LazyForm = (function() {
	
	/**
	 * Stores the form element.
	 */
	var form;

	/**
	 * Elements Tags that allowed to be retrieved.
	 */
	var tags = ['inputs', 'selects', 'textareas', 'checkboxs', 'radioboxs', 'hidden'];

	/**
	 * Stores the requested form inputs.
	 */
	var elements = {
		inputs: [],
		selects: [],
		textareas: [],
		checkboxs: [],
		radioboxs: []
	};

	/**
	 * Initialize - selecting the form.
	 */
	function init(selector) {
		if(selector.constructor == HTMLFormElement) {
			form = selector;
			return;
		}

		form = document.querySelector(selector);
	}

	/**
	 * Retrieve specific inputs from the form. 
	 */
	function getData(options) {

		if(options.constructor === Array) {
			for(var i = 0; i < options.length; i++) {
				if(! in_array(options[i], tags)) {
					throw new Error('LazyForm.getData() expected one of the following: ' + tags.join(', ') + ' but ' + options[i] + ' is not there.');
				}

				switch(options[i]) {
					case 'inputs':
						elements.inputs = document.querySelectorAll('input[type=text]');
						break;
					case 'selects':
						elements.selects = document.querySelectorAll('select');
						break;
					case 'textareas':
						elements.textareas = document.querySelectorAll('textarea');
						break;
					case 'checkboxs':
						elements.checkboxs = document.querySelectorAll('input[type=checkbox]');
						break;
					case 'radioboxs':
						elements.radioboxs = document.querySelectorAll('input[type=radio]');
						break;
					case 'hidden':
						elements.hidden = document.querySelectorAll('input[type=hidden]');
						break;
				}
			}
		}
	}

	/**
	 * Retrieve JSON.
	 */
	function toJson() {
		var json = {};
		
		for(var inputs in elements) {
			var inputs = elements[inputs];

			inputs = Array.prototype.filter.call(inputs, function(input) {
				return input.name != '' && input.value != '';
			});
	
			Array.prototype.map.call(inputs, function(input) {
				return json[input.name] = input.value;
			});
		}

		return json;
	}

	/**
	 * Retrieve key value pairs.
	 */
	function toQueryString() {
		var queryString = '';
		
		for(var inputs in elements) {
			var inputs = elements[inputs];

			inputs = Array.prototype.filter.call(inputs, function(input) {
				return input.name != '' && input.value != '';
			});
	
			queryString += Array.prototype.map.call(inputs, function(input) {
				return input.name + '=' + input.value;
			}).join('&');
		}

		return queryString;
	}

	/**
	 * Checks if a value is in array. 
	 */
	function in_array(needle, hystack) {
		for(var i = 0; i < hystack.length; i++) {
			if(needle !== hystack[i]) {
				continue;
			}

			return true;
		}

		return false;
	}

	return {
		select: function(selector) {
			init(selector);

			return this;
		},
		get: function(options) {
			getData(options);

			return {
				toJson: toJson,
				toQueryString: toQueryString
			};
		}
	}

})();
