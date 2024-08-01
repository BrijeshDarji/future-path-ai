import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import SuggestionAndActions from './SuggestionAndActions';
import BarChart from '../../common/charts/BarChart';

import axiosInstance from '../../helpers/AxiosConfig';

import {
    CrossRedIcon,
    IMAGE,
    LoadingIcon,
} from '../../../assets/constants/Constant';

import { htmlToPlainText } from '../../helpers/Utils';

import {
    Container,
    Dropzone,
    ImagePreview,
    PreviewContainer,
    RemoveButton,
    SubmitButton,
} from './ImageUploader.style';

const getMessage = {
    "file-invalid-type": "Invalid file type. Only jpg, jpeg, and png files are allowed",
    "file-too-large": `File is larger than ${IMAGE.SIZE.MAX / 1000000} MB.`
}

const ImageUploader = ({
    handleDynamicSuggestion,
    handlePreBuildSuggestion,
    setInputLoading,
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const [markSheetDetails, setMarkSheetDetails] = useState({})

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
            rejectedFiles.forEach(rejectedFile => {
                if (rejectedFile?.errors?.length) {
                    rejectedFile.errors.forEach(error => {
                        const errorMessage = getMessage[error.code] || error.message
                        toast.error(errorMessage)
                    })
                }
            })

            setSelectedImage(null)
            setSelectedFile(null)
            return;
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: IMAGE.ALLOWED_TYPES,
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
        setInputLoading(true)

        const formData = new FormData();
        formData.append('image', selectedFile);

        axiosInstance.post(
            "/api/chat-bot/extract-details",
            formData
        )
            .then(response => {
                if (response.data) {
                    if (response.data.success) {
                        setMarkSheetDetails(response.data)
                    }
                    else {
                        toast.error(response.data.reply)
                    }
                }
            })
            .catch(error => {
                const errorMessage = error.response?.data?.reply || error.message
                toast.error(errorMessage)
            })
            .finally(() => {
                setLoading(false)
                setInputLoading(false)
            })
    };

    const hasValidMarketSheetData = markSheetDetails.reply?.length
    let text = ""

    if (hasValidMarketSheetData && markSheetDetails.suggestion) {
        text = htmlToPlainText(markSheetDetails.suggestion)
    }

    return (
        <div>
            <Container>
                {!selectedImage && (
                    <Dropzone
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop an image here, or click to select one</p>
                    </Dropzone>
                )}

                {selectedImage && (
                    <PreviewContainer>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <ImagePreview
                                src={selectedImage}
                                alt="Selected"
                            />

                            {
                                !hasValidMarketSheetData &&
                                !loading && (
                                    <RemoveButton>
                                        <img
                                            src={CrossRedIcon}
                                            alt="Selected"
                                            width={20}
                                            height={20}
                                            onClick={handleRemoveImage}
                                        />
                                    </RemoveButton>
                                )
                            }
                        </div>
                    </PreviewContainer>
                )}
            </Container>

            {error && (
                <Error>{error}</Error>
            )}

            {selectedImage && !hasValidMarketSheetData && (
                <SubmitButton
                    onClick={handleSubmit}
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
                </SubmitButton>
            )}

            {
                hasValidMarketSheetData &&
                markSheetDetails.suggestion && (
                    <div dangerouslySetInnerHTML={{ __html: markSheetDetails.suggestion }}></div>
                )
            }

            {
                hasValidMarketSheetData && (
                    <>
                        <BarChart chartData={markSheetDetails.reply} />

                        <SuggestionAndActions
                            chat={{
                                showSuggestion: true,
                                text,
                                hideActions: false,
                            }}
                            handleDynamicSuggestion={handleDynamicSuggestion}
                            handlePreBuildSuggestion={handlePreBuildSuggestion}
                        />
                    </>
                )
            }
        </div >
    );
};

export default ImageUploader;
