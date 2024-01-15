import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cancel from '../../../img/admin/Cancel.svg';
import { TableRow } from './TableHead';

interface SelectedFile {
    id: number;
    name: string;
}

interface EmailModalProps {
    onCancel: () => void;
    selectedRows: number[];
    data: TableRow[];
}

const EmailModal: React.FC<EmailModalProps> = ({
    onCancel,
    selectedRows,
    data,
}) => {
    const [sender] = useState('XXXX@likelion.org');
    const [recipient, setRecipient] = useState<string[]>([]);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [isButtonActive, setIsButtonActive] = useState(false);

    // Function to handle sending the email
    const handleSendEmail = () => {
        const selectedRecipients = selectedRows.map(
            index => data[index]?.name || '',
        );
        setRecipient(selectedRecipients);

        setRecipient([]);
        setSubject('');
        setContent('');
        setAttachment(null);

        // Close the modal
        onCancel();
    };

    const selectedRecipientsString = selectedRows
        .map(index => data[index]?.name || '')
        .join(', ');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []).map(
            (file, index) => ({
                id: index,
                name: file.name,
            }),
        );
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const removeFile = (id: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    };

    useEffect(() => {
        setIsButtonActive(subject.trim() !== '' && content.trim() !== '');
    }, [subject, content]);

    return (
        <>
            <BackgroundOverlay />
            <Wrapper>
                <Title>이메일 보내기</Title>
                <CancelIcon
                    style={{ width: '18px', height: '18px' }}
                    src={cancel}
                    onClick={onCancel}
                    alt="취소"
                />

                <Divider />
                <Content>
                    <div className="BoxName">보내는 사람</div>
                    <input
                        className="InputBox"
                        type="text"
                        value={sender}
                        readOnly
                    />
                    <div className="BoxName">받는 사람</div>
                    <input
                        className="InputBox"
                        placeholder={`${selectedRecipientsString}`}
                        readOnly
                    />
                    <Divider />
                    <div className="BoxName">제목</div>
                    <input
                        className="InputBox"
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                    />
                    <div className="BoxName">내용</div>
                    <Textarea
                        className="InputBox"
                        placeholder="내용을 입력하세요..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <div className="BoxName">파일 첨부</div>
                    <label htmlFor="fileInput">
                        <FileInputLabel>
                            <FileInput
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                                multiple
                            />
                        </FileInputLabel>
                    </label>
                    {selectedFiles.map(file => (
                        <SelectedFileBox key={file.id}>
                            {file.name}
                            <CloseIcon onClick={() => removeFile(file.id)}>
                                X
                            </CloseIcon>
                        </SelectedFileBox>
                    ))}
                </Content>

                <Button
                    style={{
                        backgroundColor: isButtonActive ? '#ff7710' : '#ADB3BA',
                        cursor: isButtonActive ? 'pointer' : 'default',
                    }}
                    onClick={isButtonActive ? handleSendEmail : undefined}
                >
                    보내기
                </Button>
            </Wrapper>
        </>
    );
};

export default EmailModal;

const BackgroundOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
`;

export const Wrapper = styled.div`
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
    margin-top: 32px;
    background-color: white;
    padding: 32px 24px 24px 24px;
    min-width: 688px;
    min-height: 600px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    border-radius: 20px;

    position: fixed;
`;

const Button = styled.div`
    margin: 20px;
    width: 95%;
    height: 40px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    color: #fff;
    border: none;
    cursor: pointer;

    background-color: #ff7710;

    border-radius: 8px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const CancelIcon = styled.img`
    width: 18px;
    height: 18px;
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
`;
export const Content = styled.div`
    flex-direction: column;
    display: flex;
    margin: 20px;
    position: relative;

    .BoxName {
        margin: 20px 0px 20px 0px;
        font-weight: 700;
    }

    .InputBox {
        width: 100%;
        height: 48px;
        padding-left: 20px;
        border-radius: 6px;
        border: 1px solid #dcdfe3;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
    }
`;

const Divider = styled.div`
    height: 1px;
    background-color: var(--Grey-900, #dcdfe3);
    width: 100%;
    margin: 13px 0px 13px 0px;
`;

const Input = styled.input`
    // Styles for input
`;

const Textarea = styled.textarea`
    width: 0 auto;
    height: 200px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #dcdfe3;
    margin-bottom: 16px;
    resize: vertical;
    overflow-y: auto;
`;

const FileInput = styled.input`
    /* Hide the actual file input */
    display: none;
`;

const FileInputLabel = styled.label`
    &::before {
        content: '파일 선택하기';
        background-color: #ffffff;
        color: #4d5359;
        font-weight: 700;
        border: 1px solid #dcdfe3;
        padding: 7px 16px;
        border-radius: 4px;
        cursor: pointer;
    }
`;

const SelectedFileBox = styled.div`
    width: 100%;
    height: 48px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #dcdfe3;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CloseIcon = styled.span`
    cursor: pointer;
`;
