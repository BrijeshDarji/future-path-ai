import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
`;

export const Dropzone = styled.div`
    border: 2px dashed #aa69ff;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    margin-right: 20px;
`;

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ImagePreview = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    display: block;
`;

export const RemoveButton = styled.button`
    position: absolute;
    top: -9px;
    right: -9px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

export const Error = styled.p`
    color: red;
    margin-top: 10px;
`;

export const SubmitButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background: #aa69ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 45px;
    width: 95px;
`;
