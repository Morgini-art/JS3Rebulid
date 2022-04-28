class Item {
    constructor(name, price, type, rarity, effect, toBuyInShop) {
        this.ItemName = name;
        this.ItemPrice = price;
        this.ItemType = type;
        this.ItemRarity = rarity;//(0)ordinary,(1)unusual,(2)unusual,(3)epic,(4)legendary
        this.ItemEffect = effect;
        this.toBuyInShop = toBuyInShop;
    }
}

export {Item};