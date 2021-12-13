class NotFound extends Error{
    constructor() {
        super('Não existe');
        this.name = 'NotFound';
        Object.setPrototypeOf(this, NotFound.prototype);
    }
}

export {
    NotFound,
}