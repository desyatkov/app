import _ from 'lodash';

const parseAllTags = (object) => {
    const arr = object.reduce((acc, items) => {
        if (items.tags !== null) {
            items.tags.forEach(item => {
                if (!acc[item]) {
                    acc[item] = {
                        count: 1,
                        ids: items.ids,
                        id: _.random(10000000, 99999999)
                    }
                } else {
                    acc[item].count += 1
                    acc[item].ids = [...acc[item].ids, ...items.ids]
                }
            });
        }
        return acc
    }, []);
    

    const tagsArr = [];
    for (let key in arr) {
        tagsArr.push({
            key: key,
            count: arr[key].count,
            ids: arr[key].ids,
            id: arr[key].id
        })
    }
    
    return tagsArr.sort( (a, b) => b.count - a.count );
}

export default parseAllTags;