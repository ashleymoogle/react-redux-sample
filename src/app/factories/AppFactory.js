import i18n from '../i18n'
import toastr from 'toastr'

import axios from 'axios'

export default class AppFactory {
    init() {
        return new Promise((resolve, reject) => {
         // Add a response interceptor
        axios.interceptors.response.use(undefined, (error) => {
            toastr.error(i18n.t('trans.toast_error'))
            reject(error)
        })
        //this.start()
        resolve()  
        })
    }
}
