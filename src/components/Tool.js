import React, { useState } from 'react';
import axios from 'axios';

const Tool = () => {
  const [file, setFile] = useState(null);
  const [colorOption, setColorOption] = useState('bw');
  const [resultUrl, setResultUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setError('');
    } else {
      setError('Please upload a valid image.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Please drop a valid image file.');
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleOptionChange = (e) => setColorOption(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('color_option', colorOption);

    try {
      const response = await axios.post('http://your-django-backend-url/api/cropper/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.cropped_image_url) {
        setResultUrl(response.data.cropped_image_url);
        setError('');
      } else {
        setError('Image processing failed.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '1rem' }}>
      <h2>Upload Image for Background Removal</h2>

      {/* Drag & Drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput').click()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '10px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '1rem',
          background: '#fafafa',
          cursor: 'pointer',
        }}
      >
        {file ? (
          <strong>{file.name}</strong>
        ) : (
          <p>Drag & Drop image here or <span style={{ color: '#007bff' }}>click to select</span></p>
        )}
      </div>

      {/* Hidden file input */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <form onSubmit={handleSubmit}>
        <label>
          Background Option:
          <select
            value={colorOption}
            onChange={handleOptionChange}
            style={{ marginLeft: '10px', marginBottom: '1rem' }}
          >
            <option value="bw">Black & White</option>
            <option value="color">Color</option>
          </select>
        </label>
        <br />
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Submit</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {resultUrl && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Result:</h4>
          <img src={resultUrl} alt="Cropped Output" style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
};

export default Tool;
