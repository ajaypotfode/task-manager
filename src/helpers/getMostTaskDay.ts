export const getMostTaskDay = (data: [{ day: string, complete: number, pending: number }]) => {
    const maxTaskCount = Math.max(...data.map(d => d.pending + d.complete));

    const mostTaskDay = data.filter(d => {
        if ((d.complete + d.pending) === maxTaskCount) {
            return d.day
        }
    })
    return mostTaskDay
}

