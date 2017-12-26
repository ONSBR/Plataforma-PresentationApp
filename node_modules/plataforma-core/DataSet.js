class DataSet {

    constructor(){
        this.entities = [];
    }

    save(entity, entityType) {
        this.entities.push(entity);
    }

    update(entity) {
    }

    delete(entity) {
    }
}

module.exports = DataSet;