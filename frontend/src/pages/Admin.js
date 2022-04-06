import React from 'react'
import { useState, useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Admin = () => {
  const styles = {
    boxContainer: {
      width: '650px',
      borderRadius: '10px',
      border: '1px solid black',
      margin: '20px',
      padding: '20px 0px 20px 20px',
    },
    
    inputField: {
      margin : '20px 0px 0px 20px',
    },

    buttonStyle: {
      margin : '10px 0px 0px 20px',
    }
  }
  
  const Input = styled('input')({
    display: 'none',
  });

  const [svgItem, setSvgItem] = useState("");
  const [wavItem, setWavItem] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const [svgItemName, setSvgItemName] = useState("");
  const [wavItemName, setWavItemName] = useState("");

  const svg = useRef();
  const wav = useRef();

  const handleSvgClick = () => {
    svg.current.click();
  };
  const handleWavClick = () => {
    wav.current.click();
  };

  // 아이템 업로드 핸들링
  const handleSvgItem = (value) => {
    setSvgItem(value);

    if (value !== "") setSvgItemName(value.name);
    else setSvgItemName("");
  };

  const handleWavItem = (value) => {
    setWavItem(value);

    if (value !== "") setWavItemName(value.name);
    else setWavItemName("");
  };

  const addItem = async () => {
    console.log("title : ", title);
    console.log("description : ", description);
    console.log("privateKey : ", privateKey);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <Box>
      <h1 style={styles.inputField}>관리자 민팅 페이지</h1>
      <Box style={styles.boxContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <div style={styles.inputField}>
              <TextField
                label="token title"
                id="outlined-size-small"
                size="small"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div style={styles.inputField}>
              <TextField
                label="token description"
                id="outlined-size-small"
                size="small"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={styles.inputField}>
              <TextField
                label="private key"
                id="outlined-size-small"
                size="small"
                onChange={(e) => setPrivateKey(e.target.value)}
              />
            </div>

            <div style={styles.inputField}>
                <TextField sx={{ width: "400px" }} type="text" label="이미지 (업로드 확장자 형식: svg)" value={svgItemName} disabled />
                <Input
                  type="file"
                  accept="image/svg+xml"
                  ref={svg} 
                  onChange={(e) => (e.target.files.length !== 0 ? handleSvgItem(e.target.files[0]) : handleSvgItem(""))}/>
              <Button style={styles.buttonStyle} variant="contained" component="span" onClick={handleSvgClick}>
                  SVG upload
                </Button>
            </div>

            <div style={styles.inputField}>
              <TextField sx={{ width: "400px" }} type="text" label="사운드 파일 (업로드 확장자 형식: wav)" value={wavItemName} disabled />
                <Input
                  type="file"
                  accept="audio/wav"
                  ref={wav} 
                  onChange={(e) => (e.target.files.length !== 0 ? handleWavItem(e.target.files[0]) : handleWavItem(""))}/>
                <Button style={styles.buttonStyle} variant="contained" component="span" onClick={handleWavClick}>
                  wav upload
                </Button>
            </div>
          </div>
          <div style={styles.inputField}>
            <Button
              sx={{ mt: 5, width: "550px", fontSize: 18 }}
              size="large"
              type="submit"
              variant="contained"
              onClick={addItem}
            >
              등록
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  ) 
}

export default Admin

