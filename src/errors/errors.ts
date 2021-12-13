class NotFound extends Error{
    constructor() {
        super('Não existe');
        this.name = 'NotFound';
        Object.setPrototypeOf(this, NotFound.prototype);
    }
}

class AlreadyAnswered extends Error{
    constructor() {
        super('Já respondido');
        this.name = 'AlreadyAnswered';
        Object.setPrototypeOf(this, AlreadyAnswered.prototype);
    }
}
export {
    NotFound,
    AlreadyAnswered,
}
