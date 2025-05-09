import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Result = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { imageUrl } = location.state || {}

    if (!imageUrl) {
        navigate('/')
        return null
    }

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = 'cropped-image.jpg'
        link.click()
    }

    return (
        <>
            <div className="text-center p-4 mx-auto result-section">
                <h2 className='tool-head'>Background Removed Result</h2>
                <img src={imageUrl} alt="Result" style={{ maxWidth: '100%', borderRadius: '8px', margin: '20px 0' }} />
                <br />
                <button className="btn btn-success" onClick={handleDownload(imageUrl)}>
                    Download Image
                </button>
            </div>
        </>
    )
}

export default Result
