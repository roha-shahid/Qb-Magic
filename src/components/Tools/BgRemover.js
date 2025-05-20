import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const BgRemover = () => {
  const [file, setFile] = useState(null);
  const [colorOption, setColorOption] = useState('bw');
  const [recentImages, setRecentImages] = useState([]);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState(null); // State to hold the result image URL

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setError('');
      const imageUrl = URL.createObjectURL(selected);
      setRecentImages((prev) => [imageUrl, ...prev.slice(0, 4)]);
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
      const imageUrl = URL.createObjectURL(droppedFile);
      setRecentImages((prev) => [imageUrl, ...prev.slice(0, 4)]);
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
      const response = await axios.post('http://46.250.225.64:4000/cropper/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.cropped_image_url) {
        const fullUrl = `http://46.250.225.64:4000${response.data.cropped_image_url}`;
        setImageUrl(fullUrl); // Set the result image URL
      } else {
        setError('Image processing failed.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  // inside BgRemover component
  useEffect(() => {
    const handleWindowDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        setFile(file);
        setError('');
        const imageUrl = URL.createObjectURL(file);
        setRecentImages((prev) => [imageUrl, ...prev.slice(0, 4)]);
      } else {
        setError('Please drop a valid image file.');
      }
    };

    const preventDefaults = (e) => e.preventDefault();

    window.addEventListener('dragover', preventDefaults);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragover', preventDefaults);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, []);

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cropped_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Download failed', error);
    }
  };
  
  return (
    <>
    <div className='container px-5'>
    <div className='row'>
        <div className='col-12'>
          <div className='text-center mx-auto'>
            <div className='d-inline-flex gap-1 align-items-center justify-content-center'>
              <div className='image-holder'>
              <img src='../../src/assets/images/bgRemover.png' />
              </div>
            <h2 className='text-capitalize tool-head flex-1'>Background Remover</h2>
            </div>
            <div className='tool-description'>
              Erase image backgrounds for free and replace it with different backgrounds of your choosing.
            </div>

            {/* Conditionally render the form or the result */}
            {imageUrl ? (
              <div className="text-center p-4 mx-auto result-section">
                <img src={imageUrl} alt="Result" />
                <br />
                <button className="secondary-button mt-4" onClick={() => handleDownload(imageUrl)}>
                  Download Image
                </button>
              </div>
            ) : (
              <div className='row'>
                <div
                  className='drop-box col-12 mt-3'
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {file ? (
                    <strong>{file.name}</strong>
                  ) : (
                    <div className='file-holder'>
                      <button className='secondary-button'>
                        <span className='plus-icon'>
                          <CIcon icon={cilPlus} />
                        </span>
                        Start from a photo
                      </button>
                      <div>Or drop an image here</div>
                    </div>
                  )}
                </div>
                <div className='recent-img col-12 d-flex justify-content-center py-3 gap-3'>
                  <div className='add-image mb-3' onClick={() => document.getElementById('fileInput').click()}>
                    <CIcon icon={cilPlus} size="lg" />
                  </div>
                  <div className=" d-flex gap-3">
                    {recentImages.map((img, index) => (
                      <img key={index} src={img} alt={`Recent ${index}`} className='recent-thumbnail mb-2' />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

            {!imageUrl && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="colorSelect" className="form-label fw-bold">
                    Background Option:
                  </label>
                  <select id="colorSelect" className="form-select" value={colorOption} onChange={handleOptionChange}>
                    <option value="bw">Black & White</option>
                    <option value="color">Color</option>
                  </select>
                </div>

                <button className="btn btn-primary mt-3" type="submit">
                  Submit
                </button>
              </form>
            )}

            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default BgRemover;
