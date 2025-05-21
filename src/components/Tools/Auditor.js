import React, { useState } from 'react'
import axios from 'axios'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import jsPDF from 'jspdf'
import { auditReport } from '../../api/api'

const Auditor = () => {
  const [file, setFile] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [auditText, setAuditText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.name.endsWith('.sol')) {
      setFile(selected)
      setError('')
    } else {
      setError('Please upload a valid .sol file.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.name.endsWith('.sol')) {
      setFile(droppedFile)
      setError('')
    } else {
      setError('Please drop a valid .sol file.')
    }
  }

  const handleDragOver = (e) => e.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please upload a .sol file.')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      // const response = await axios.post('http://46.250.225.64:4000/solidity_auditor/', formData)

      const response = await auditReport(formData)
      // const { audit_text, pdf_base64, filename } = response.data

      const { audit_text, pdf_base64, filename } = response
      // Decode base64 to Blob
      const byteCharacters = atob(pdf_base64)
      const byteArray = new Uint8Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i)
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)

      setPdfUrl({ url, filename })
      setAuditText(audit_text)
      setError('')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a')
      link.href = pdfUrl.url
      link.setAttribute('download', pdfUrl.filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(pdfUrl.url)
      setPdfUrl(null)
    }
  }

  const downloadTextAsPdf = (text) => {
    const doc = new jsPDF()
    const lines = doc.splitTextToSize(text, 180)
    doc.text(lines, 10, 10)
    doc.save('audit_report_text.pdf')
  }
  const [showToast, setShowToast] = useState(false)

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
            <img src="../../src/assets/images/auditor.png" />
          </div>
          <h2 className="text-capitalize tool-head flex-1">Smart Contract Auditor</h2>
        </div>
        <div className="tool-description">
          Introducing the Smart Contract Auditor Tool, your go-to for securing blockchain contracts.
          It scans for vulnerabilities and provides detailed reports to ensure your contracts are
          safe and sound.
        </div>

        {pdfUrl ? (
          <>
            <div className="result-section container-fluid mt-4">
              <div className="row">
                {/* Audit Text Summary */}
                <div className="col-md-12 mb-2 d-flex justify-content-center">
                  {showToast && (
                    <div
                      className="toast show m-3"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                      style={{ zIndex: 9999 }}
                    >
                      <div className="toast-body">Audit text copied to clipboard.</div>
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-4 d-flex flex-column">
                  <h5 className="text-start">Audit Summary (Click to Copy)</h5>
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
                    onClick={() => copyToClipboard(auditText)}
                    title="Click to copy"
                  >
                    {auditText}
                  </div>
                </div>

                {/* PDF Preview */}
                <div className="col-md-6 mb-4 d-flex flex-column">
                  <h5 className="text-start">PDF Preview</h5>
                  <div
                    className="flex-grow-1 overflow-auto"
                    style={{
                      maxHeight: '600px',
                      width: '100%',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                    }}
                  >
                    <iframe
                      src={pdfUrl.url}
                      title="PDF Preview"
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                    ></iframe>
                  </div>
                </div>
                <div className="text-center col-md-12 mb-3">
                  <CButton className="primary-button mb-2" onClick={handleDownload}>
                    Download Audit Report
                  </CButton>
                  <p>
                    File will download as: <strong>{pdfUrl.filename}</strong>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="drop-box col-12 mt-3"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('fileInput').click()}
            >
              {file ? (
                <strong>{file.name}</strong>
              ) : (
                <div className="file-holder">
                  <div className="upload-text">
                    <h4>Upload Projects</h4>
                    <p>
                      Please upload files in sol format and make sure the file size is under 25 MB.
                    </p>
                  </div>
                  <div className="inner-box">
                    <h5>
                      Drop file or <span>Browse</span>
                    </h5>
                    <p>Format: sol & Max file size: 25 MB</p>
                  </div>
                </div>
              )}
            </div>

            <input
              id="fileInput"
              type="file"
              accept=".sol"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <CButton className="primary-button mt-4" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Auditing...' : 'Audit Smart Contract'}
            </CButton>
          </>
        )}

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  )
}

export default Auditor
