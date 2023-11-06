// To get an item with expiry
const getItemWithExpiry = (key) => {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) {
        return null; // Item doesn't exist
    }
    const now = new Date().getTime();
    if (now > item.expiry) {
        localStorage.removeItem(key);
        return null; // Item has expired
    }
    return item;
};

export default getItemWithExpiry;