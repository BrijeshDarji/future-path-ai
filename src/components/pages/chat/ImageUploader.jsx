import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import axiosInstance from '../../helpers/AxiosConfig';

import {
    CrossRedIcon,
    IMAGE,
    LoadingIcon,
} from '../../../assets/constants/Constant';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];

            if (file) {
                setError('');
                setSelectedFile(file)
                const reader = new FileReader();

                reader.onload = (e) => {
                    setSelectedImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }

        if (rejectedFiles.length > 0) {
            const file = rejectedFiles[0];

            if (file.file.size > IMAGE.SIZE.MAX) {
                setError('File size should be less than 2MB');
            }
            else {
                setError('Only jpg, jpeg, and png files are allowed');
            }
            setSelectedImage(null)
            setSelectedFile(null)
            return;
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        // accept: IMAGE.ALLOWED_TYPES.join(","),
        accept: "image/*",
        maxSize: IMAGE.SIZE.MAX,
        multiple: false
    });

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setSelectedFile(null)
    };

    const handleSubmit = () => {
        if (!selectedFile) {
            setError('Please select an image');
            return;
        }
        setError('');
        setLoading(true)

        const formData = new FormData();
        formData.append('image', selectedFile);

        axiosInstance.post(
            "/api/chat-bot/extract-details",
            formData
        )
            .then(response => {
                if (response.data) {
                    if (!response.data.success) {
                        toast.error(response.data.reply)
                    }
                }
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || error.message
                toast.error(errorMessage)
            })
            .finally(() => {
                setLoading(false)
            })
    };

    return (
        <div>
            <div style={containerStyle}>
                {!selectedImage && (
                    <div
                        {...getRootProps()}
                        style={dropzoneStyle}
                    >
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop an image here, or click to select one</p>
                    </div>
                )}

                {selectedImage && (
                    <div style={previewContainerStyle}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                style={imagePreviewStyle}
                            />

                            <div
                                style={removeButtonStyle}
                            >
                                <img
                                    src={CrossRedIcon}
                                    alt="Selected"
                                    width={20}
                                    height={20}
                                    onClick={handleRemoveImage}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <p style={errorStyle}>{error}</p>
            )}

            {selectedImage && (
                <button
                    onClick={handleSubmit}
                    style={submitButtonStyle}
                    disabled={loading}
                >
                    {loading
                        ? (
                            <img
                                src={LoadingIcon}
                                alt="Loading"
                                width={60}
                                height="auto"
                            />
                        )
                        : "Submit"
                    }
                </button>
            )}
        </div >
    );
};

const containerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '20px'
};

const dropzoneStyle = {
    border: '2px dashed #aa69ff',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '20px'
};

const previewContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const imagePreviewStyle = {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    display: 'block'
};

const removeButtonStyle = {
    position: 'absolute',
    top: '-9px',
    right: '-9px',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px'
};

const errorStyle = {
    color: 'red',
    marginTop: '10px'
};

const submitButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#aa69ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    height: "45px",
    width: "95px",
};

export default ImageUploader;
