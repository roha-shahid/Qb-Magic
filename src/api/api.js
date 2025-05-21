import invoke from '../utils/invoke'

// const apikey = process.env.REACT_APP_API_KEY

// const apikey = import.meta.env.VITE_APP_ROOT_URL

export const removeBg = async (formData) => {
  const response = await invoke({
    url: '/cropper/',
    method: 'POST',
    headers: {
    //   apikey,
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    // baseURL: 'http://46.250.225.64:4000',
  })
  return response.data
}

export const auditReport = async (formData) => {
  const response = await invoke({
    url: '/solidity_auditor/',
    method: 'POST',
    headers: {
    //   apikey,
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    // baseURL: 'http://46.250.225.64:4000',
  })
  return response.data
}


export const read = async (formData) => {
    const response = await invoke({
      url: '/read/',
      method: 'POST',
      headers: {
      //   apikey,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      // baseURL: 'http://192.168.100.4:8000/',
    })
    return response.data
  }