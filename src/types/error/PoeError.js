// PoeError class

class PoeError extends Error {
	constructor(message) {
		super(message);
		this.name = 'PoeError';
	}
}