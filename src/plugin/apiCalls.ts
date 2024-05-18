import axios from "axios"

const api = axios.create({
    withCredentials: true
})

export default {
    install: (app: any) => {
        app.config.globalProperties.$apiGet = async (endPoint: string): Promise<any> => {
            const res = await api.get(import.meta.env.VITE_BASE_URL + '/api/users' + endPoint)
            return res
        }

        app.config.globalProperties.$apiPost = async (endPoint: string, payload: user): Promise<any> => {
            const res = await api.post(import.meta.env.VITE_BASE_URL + '/api/users' + endPoint, payload)
            return res
        }
    }
}
