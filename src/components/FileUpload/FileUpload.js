import { FileInput, FileUploadContainer, FileUploadLabel } from "./FileUpload.style";

const FileUpload = ({ labelText }) => {
  return (
    <FileUploadContainer>
      <FileUploadLabel>{labelText}</FileUploadLabel>
      {/* <FileUploadButton>{btnText}</FileUploadButton> */}
      <FileInput type="file" hidden />
    </FileUploadContainer>
  );
};

export default FileUpload;
