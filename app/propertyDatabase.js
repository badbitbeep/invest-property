export class PropertyDatabase {
    constructor() {}

    loadDatabase(address) {
        if (address === 'default') {

        } else {
            throw new Error('unsupported database address');
        }
    }
}