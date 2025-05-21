import React, { useState } from 'react'
import { CButton } from '@coreui/react'
import { read } from '../../api/api'

const OCR = () => {
  const [file, setFile] = useState(null)
  const [extractedText, setExtractedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const isValidFile = (file) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf']
    return file && allowedTypes.includes(file.type)
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (isValidFile(selected)) {
      setFile(selected)
      setError('')
    } else {
      setError('Please upload a PNG, JPG, or PDF file.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (isValidFile(droppedFile)) {
      setFile(droppedFile)
      setError('')
    } else {
      setError('Please drop a valid PNG, JPG, or PDF file.')
    }
  }

  const handleDragOver = (e) => e.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please upload a valid file.')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await read(formData)
      const { extracted_text } = response
      setExtractedText(extracted_text)
      setError('')
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.error || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div className="container auditor-section px-5">
      <div className="text-center mx-auto">
        <div className="d-inline-flex gap-1 align-items-center justify-content-center">
          <div className="image-holder">
            <img src="../../src/assets/images/auditor.png" alt="Auditor Icon" />
          </div>
          <h2 className="text-capitalize tool-head flex-1">OCR</h2>
        </div>
        <div className="tool-description">
          Upload a PNG, JPG, or PDF file. The OCR tool will extract and display the text content for
          easy review and copying.
        </div>

        {extractedText ? (
          <div className="result-section container-fluid mt-4">
            <div className="row">
              <div className="col-md-12 mb-2 d-flex justify-content-center">
                {showToast && (
                  <div
                    className="toast show m-3"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{ zIndex: 9999 }}
                  >
                    <div className="toast-body">Text copied to clipboard.</div>
                  </div>
                )}
              </div>
              <div className="col-md-12 mb-4 d-flex flex-column">
                <h5 className="text-start">Extracted Text (Click to Copy)</h5>
                <div
                  className="flex-grow-1 overflow-auto"
                  style={{
                    maxHeight: '600px',
                    background: '#f9f9f9',
                    padding: '1rem',
                    cursor: 'pointer',
                    userSelect: 'all',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    whiteSpace: 'pre-wrap',
                  }}
                  onClick={() => copyToClipboard(extractedText)}
                  title="Click to copy"
                >
                  {extractedText}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="drop-box col-12 mt-3"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('fileInput').click()}
              style={{
                border: '2px dashed #ccc',
                padding: '2rem',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
            >
              {file ? (
                <strong>{file.name}</strong>
              ) : (
                <div className="file-holder">
                  <div className="upload-text">
                    <h4>Upload File</h4>
                    <p>Please upload a PNG, JPG, or PDF file under 25 MB.</p>
                  </div>
                  <div className="inner-box">
                    <h5>
                      Drop file or <span style={{ textDecoration: 'underline' }}>Browse</span>
                    </h5>
                    <p>Allowed formats: PNG, JPG, PDF</p>
                  </div>
                </div>
              )}
            </div>

            <input
              id="fileInput"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <CButton className="primary-button mt-4" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Processing...' : 'Start OCR'}
            </CButton>
          </>
        )}

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  )
}

export default OCR
