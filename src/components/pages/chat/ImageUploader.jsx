import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IMAGE } from '../../../assets/constants/Constant';
import { motion } from "framer-motion";

const ImageUploader = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImageBox] = useState(props.showImageBox || false);
    const [error, setError] = useState('');
    const [marksheetType, setMarksheetType] = useState('');

    const markSheet = ['10th', '12th', 'graduation'];

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];
            if (file) {
                setError('');
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
            } else {
                setError('Only jpg, jpeg, and png files are allowed');
            }
            setSelectedImage(null)
            return;
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image': IMAGE.ALLOWED_TYPES,
        },
        maxSize: IMAGE.SIZE.MAX,
        multiple: false
    });

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleTypeChange = (item) => {
        setMarksheetType(item);
    };

    const handleSubmit = () => {
        if (!selectedImage || !marksheetType) {
            setError('Please select an image and marksheet type.');
            return;
        }
        setError('');
        // Call API with for sumbit image
        const data = {
            image: selectedImage,
            type: marksheetType
        };
        console.log('Submitted data: ', data);
    };

    return (
        <div>
            <div style={containerStyle}>
                {showImageBox && !selectedImage && (
                    <div {...getRootProps()} style={dropzoneStyle}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop an image here, or click to select one</p>
                    </div>
                )}
                {selectedImage && (
                    <div style={previewContainerStyle}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img src={selectedImage} alt="Selected" style={imagePreviewStyle} />
                            <button onClick={handleRemoveImage} style={removeButtonStyle}>✖</button>
                        </div>
                    </div>
                )}
            </div>
            {selectedImage && (
                <div style={typeSelectionStyle}>
                    <label htmlFor="marksheetType">Select Marksheet Type:</label>
                    <div style={pillsContainer}>
                        {markSheet.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    ...pills,
                                    ...(marksheetType === item ? selectedPill : {}),
                                }}
                                key={index}
                                onClick={() => handleTypeChange(item)}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
            {error && <p style={errorStyle}>{error}</p>}

            {
                selectedImage && marksheetType &&
                <button
                    onClick={handleSubmit}
                    style={submitButtonStyle}
                >
                    Submit
                </button>
            }
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
    top: '5px',
    right: '5px',
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

const typeSelectionStyle = {
    marginTop: '20px'
};

const submitButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#aa69ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

const pillsContainer = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
};

const pills = {
    border: "1px solid var(--matt-dark)",
    padding: "8px 15px",
    borderRadius: "30px",
    fontSize: "14px",
    cursor: "pointer",
    background: "var(--matt-dark)",
    transition: "0.2s ease-in-out",

    "&:hover": {
        border: "1px solid var(--sub-text-dark)",
    }
};

const selectedPill = {
    background: "#aa69ff",
    color: "white",
};

export default ImageUploader;
