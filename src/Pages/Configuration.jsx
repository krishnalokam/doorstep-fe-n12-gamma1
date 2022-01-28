import React, { useState,useEffect } from "react";
import CLabel from "../library/components/Label";
import Content from "../library/components/Content";
import Header from "../library/components/AdminHeader";
import FileUpload from "../library/components/FileUpload";
import Icon from "../library/components/Icon";
import Button from "../library/components/Buttons";
import { postApi } from "../services/ApiService";
import ApiInfo from "../services/ApiInfoService";
import Theme from "../library/styleHelpers/customTheme";
import Link from "../library/components/Link"
import { useNavigate } from "react-router-dom";


const Configuration = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileMaxSize = 4000000;
  const navigate=useNavigate();
  const user =
    window.localStorage.getItem("user") !== null
      ? JSON.parse(window.localStorage.getItem("user"))
      : null;
  useEffect(() => {
    if (!user) navigate("/");
  }, [navigate, user]);

  const onFileChange = (event) => {
    console.log("event",event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > fileMaxSize) {
        alert(
          event.target.files[0].name + " Size more than 4MB"
        );
        return;
      } else if (
        event.target.files[0].type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        alert("Invalid File Format");
        return;
      }
    }
    setSelectedFile(event.target.files[0]);
    
  };

  const onFileUpload = async () => {
    console.log("selectedFile",selectedFile)
    const formData = new FormData();
    formData.append("ConfigurationFile", selectedFile, selectedFile.name);
    const result = await postApi(ApiInfo.uploadFile, formData);
    console.log("result",result)
    alert("File Uploaded Successfully");
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
       
         <CLabel><p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate.toDateString()}
          </p>
          </CLabel> 
        
      );
    }
    else {
      return (
        <div>
          <br />
          <CLabel><h4>Choose file before Pressing the Upload button</h4></CLabel>
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <Content className="MainContainer">
        <Content className="Container ConfigurationContent">
          <CLabel>
            <h2>Upload Configuration File</h2>
          </CLabel>
          <Content className="FileUploadContainer">
            <FileUpload onChange={onFileChange}></FileUpload>
            <Link to={JSON.parse(window.localStorage.getItem("user")).sampleConfigurationFileUrl}><Icon sx={{ color: `${Theme.Colors.primary}` }}>file_download</Icon></Link>
          </Content>
          <Button onClick={onFileUpload} className="Large">
            Upload
          </Button>
          {fileData()}
        </Content>
      </Content>
    </>
  );
};

export default Configuration;
