export const getCategoryColor = (category: string) => {
    let hash = 0;

    for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + (hash * 31);
    }

    const hue = Math.abs(hash) % 360;

    return `hsl(${hue}, 70%, 92%)`
};
