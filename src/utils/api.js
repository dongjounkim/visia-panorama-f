class API {
    static endpoint = 'http://localhost:3000/api';

    constructor(endpoint = null) {
        this.endpoint = endpoint ? endpoint : this.endpoint;
    }

    static async datasetsFeatured() {
        const datasets = await fetch(`${this.endpoint}/datasets/featured`)
                            .then(response => response.json())
                            .catch(e => e);
        return datasets;
    }

    static async datasetsIndex() {
        const datasets = await fetch(`${this.endpoint}/datasets/all`)
                            .then(response => response.json())
                            .catch(e => e);
        return datasets;
    }

    static async datasetsOne(datasetID) {
        const dataset = await fetch(`${this.endpoint}/datasets/${datasetID}`)
                            .then(response => response.json())
                            .catch(e => e);
        return dataset;
    }

    static async authorsIndex() {
        const datasets = await fetch(`${this.endpoint}/authors/all`)
                            .then(response => response.json())
                            .catch(e => e);
        return datasets;
    }

    static async authorsOne(authorID) {
        const dataset = await fetch(`${this.endpoint}/authors/${authorID}`)
                            .then(response => response.json())
                            .catch(e => e);
        return dataset;
    }

    static async authorsImg(authorID) {
        const img = await fetch(`${this.endpoint}/authors/i/${authorID}`)
                            .then(response => response.json())
                            .catch(e => e);
        return img;
    }

    static async authorsWorks(authorID) {
        const works = await fetch(`${this.endpoint}/authors/w/${authorID}`)
                            .then(response => response.json())
                            .catch(e => e);
        return works;
    }

    static async content(query) { //query1+query2+...
        const content = await fetch(`${this.endpoint}/content/${query}`)
                            .then(response => response.json())
                            .catch(e => e);
        return content;
    }
}

export default API;