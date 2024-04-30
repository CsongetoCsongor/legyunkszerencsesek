class Item {
    constructor(row) {
        const splitted = row.split(';');

        this.name = splitted[0];
        this.price = splitted[1];
        
        


    }

    static loadData(itemData) {
        let items = [];
        itemData.forEach(element => {
            items.push(new Item(element));
        });
        return items;

    }
}


export { Item }