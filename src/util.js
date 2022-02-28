export default function convertToLayout(layoutString) {
    const pattern = /{[a-zA-Z0-9]+}/g
    const res = []
    let lines = layoutString.split('_')
    
    for (let line of lines) {
        const store = []
        let matches = line.match(pattern)
        for (let match of matches) {
            store.push(match.substring(1, match.length-1))
        }
        res.push(store);
    }
    return res;
} 
