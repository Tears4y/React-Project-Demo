export const setupInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}



const onRequest = (config) => {
  const userToken = localStorage.getItem("react-demo-token")
  if (!config.url?.includes("login")) {
    // const newConfig = { ...config, headers: { ...config.headers, "token": userToken } }
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': 'Bearer ' + userToken
      }
    }
    return newConfig
  }
  return config
}

const onRequestError = (error) => {
  console.log(error)
  return error
}

const onResponse = (response) => {
  console.log(response)
  return response
}

const onResponseError = (error) => {
  console.log(error)
  return error
}



