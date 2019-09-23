const qs = require('querystring');

class RequestParamsModel {
    constructor({
        // baseUrl = 'http://106.14.216.163',
        // baseUrl = 'http://116.62.168.88',
        // baseUrl = 'http://127.0.0.1',
        baseUrl = 'http://192.168.1.8',
        port = '16160',
        path = '',
        method = 'GET',
        json = true
    } = {}) {
        // this.baseUrl = 'http://192.168.3.24:16160';
        // this.baseUrl = 'http://localhost:16160';
        this.baseUrl = baseUrl + ((port === '80' || port === '') ? '' : (':' + port));
        this.uri = path;
        this.method = method.toUpperCase();
        this.headers = {
            'Content-Type': method.toUpperCase() === 'GET' 
                ? 'application/json'
                : 'application/x-www-form-urlencoded'
        };
        this.json = json;

        Object.defineProperty(this, 'myParams', {
            enumerable: false,
            set(newValue) {
                if (this.method === 'GET' || this.method === 'DELETE') {
                    this.qs = newValue;
                } else {
                    Object.defineProperty(this, 'body', {
                        configurable: true,
                        enumerable: true,
                        get() {
                            return this._body;
                        },
                        set(newValue) {
                            if (typeof newValue !== 'string') {
                                this._body = qs.stringify(newValue);
                            } else {
                                this._body = newValue;
                            }
                        }
                    });
                    this.body = newValue;
                }
            }
        });
        // if (method.toUpperCase() !== 'GET') {
        //     Object.defineProperty(this, 'body', {
        //         configurable: true,
        //         enumerable: true,
        //         get() {
        //             return this._body;
        //         },
        //         set(newValue) {
        //             if (typeof newValue !== 'string') {
        //                 this._body = qs.stringify(newValue);
        //             } else {
        //                 this._body = newValue;
        //             }
        //         }
        //     });
        // }
    }
}

module.exports = RequestParamsModel;