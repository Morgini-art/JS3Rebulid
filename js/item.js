class Item {
    constructor(name, price, type, rarity, effect, toBuyInShop) {
        this.itemName = name;
        this.itemPrice = price;
        this.itemType = type;
        this.itemRarity = rarity;//(0)ordinary,(1)unusual,(2)unusual,(3)epic,(4)legendary
        this.itemEffect = effect;
        this.toBuyInShop = toBuyInShop;
    }
}

export {Item};