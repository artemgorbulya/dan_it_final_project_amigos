export default class FilteringBuilder {
	constructor () {
		this.userFilter = {};
		this.eventFilter = {};
	}

	addFeedFilterEvent = (key, value) => {
		if (!value || value.length === 0) {
			return this;
		}
		this.eventFilter = {
			...this.eventFilter,
			[key]: value,
		}
		return this;
	}
	
	addFeedFilterUser = (key, value) => {
		if (!value || Object.values(value).filter(item => !!item).length === 0) {
			return this;
		}
		if (typeof value === "object") {
			if (!value.$gte) delete value.$gte
			if (!value.$lte) delete value.$lte
		}
		this.userFilter = {
			...this.userFilter,
			[key]: value,
		}
		return this;
	}
}