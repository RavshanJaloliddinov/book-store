

class ApiFeature {
    #_query;
    #_queryString;

    constructor(query, queryString) {
        this.#_query = query;
        this.#_queryString = queryString;
    }
    filter() {
        // Filtering
        const excludeQueries = ["limit", "page", "sort", "fields"]

        // Remove excluded fields from query
        excludeQueries.map((efl) => delete this.#_queryString[efl])

        // Replacing this query fields
        this.#_queryString = JSON.parse(
            JSON.stringify(this.#_queryString).replace(
                /\b(lt|gt|lte|gte)\b/g,
                (match) => `$${match}`
            )
        );
        this.#_query = this.#_query.find(this.#_queryString);

        return this
    }
    paginate(defaultLimit = 10) {

        // Pagination
        const limit = this.#_queryString?.limit || defaultLimit
        const offset = this.#_queryString?.page ? (this.#_queryString.page - 1) * limit : 0
        
        this.#_query = this.#_query.limit(limit).skip(offset);
        return this
    }
    sort(defaultSortField) {
        // Sorting 
        if (this.#_queryString.sort) {
            console.log(1)
            const sortFields = this.#_queryString.sort.split(",").join(" ");
            this.#_query = this.#_query.sort(sortFields);
        } else {
            this.#_query = this.#_query.sort(defaultSortField)
        }
        return this
    }
    limitFields() {
        // Field limiting
        if (this.#_queryString?.fields) {
            const selectedFields = this.#_queryString.fields.split(",").join(" ");
            this.#_query = this.#_query.select(selectedFields);
        }
        return this
    }
    getQuery(){
        return this.#_query
    }
}

module.exports = ApiFeature