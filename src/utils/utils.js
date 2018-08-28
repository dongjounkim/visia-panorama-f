import _ from 'lodash';

class Utils {
    constructor() {};

    static calculatePercentageOf(child, parent, precision = 2) {
        const percentage = parseFloat((child/ parent * 100).toPrecision(precision));
        return percentage;
    }

    static filterMultipleByProperty(array, propertyName, filterConditions) {
        return array.filter(e => filterConditions.includes(e[propertyName]));
    }

    static filterThenPluck(array, filterCondition, pluckedElement) {
        const filteredArray = _.filter(array, filterCondition);
        return _.map(filteredArray, pluckedElement);
    }

    static findEveryIndexes(array, element) {
        let indexes = [],
            i = _.indexOf(array, element);
        while (i !== -1) {
            indexes.push(i);
            i = _.indexOf(array, element, i+1);
        }
        return indexes;
    }

    static intersperse(array, seperator) {
        if (array.length === 0) {
            return [];
        }
    
        return array.slice(1).reduce((xs, x, i) => {
            return xs.concat([seperator, x]);
        }, [array[0]]);
    }

    static pluckThenUniq(array, element) {
        const pluckedArray = _.map(array, element);
        return _.uniq(pluckedArray);
    }

    static uniqObjs(objs) {
        return _.uniqWith(objs, _.isEqual);
    }

    static generateString() {
        return Math.random().toString(36).substring(7);
    }

    static createMarkup(HTMLString) {
        return {__html: HTMLString};
    }

}

export default Utils;