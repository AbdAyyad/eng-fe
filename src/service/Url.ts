class Url {
    static base = 'http://localhost:8080'
    static api = this.base + '/api'
    public static login = this.api + '/login'
    public static user = this.api + '/user'
    public static order = this.api + '/order'
    public static excel = this.order + '/csv'
    public static createUser = this.api + '/user'
    public static category = this.api + '/category'
    public static type = this.api + '/type'
    public static item = this.api + '/item'
}

export default Url