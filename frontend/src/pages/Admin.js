import React from 'react'
import { useState, useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
    },

    errorMsg: {
      color: 'red',
      fontSize: '20px',
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
  const [category, setCategory] = useState("");

  const [svgItemName, setSvgItemName] = useState("");
  const [wavItemName, setWavItemName] = useState("");

  const [titleError, setTitleError] = useState(true);
  const [privateKeyError, setPrivateKeyError] = useState(true);
  const [categoryError, setCategoryError] = useState(true);
  const [svgError, setSvgError] = useState(true);
  const [wavError, setWavError] = useState(true);

  const svg = useRef();
  const wav = useRef();

  const handleSvgClick = () => {
    svg.current.click();
  };
  const handleWavClick = () => {
    wav.current.click();
  };

  // 아이템 업로드 핸들링
  

  const handleTitle = (event) => {
    setTitle(event.target.value);

    if (event.target.value != "") {
      setTitleError(false);
    }
    else {
      setTitleError(true);
    } 
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handlePrivKey = (event) => {
    setPrivateKey(event.target.value);

    if (event.target.value != "") {
      setPrivateKeyError(false);
    }
    else {
      setPrivateKeyError(true);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setCategoryError(false);
  }

  const handleSvgItem = (value) => {
    setSvgItem(value);

    if (value !== "") {
      setSvgItemName(value.name);
      setSvgError(false);
    }
    else {
      setSvgItemName("");
      setSvgError(true);
    } 
  };

  const handleWavItem = (value) => {
    setWavItem(value);

    if (value !== "") {
      setWavItemName(value.name);
      setWavError(false);
    }
    else {
      setWavItemName("");
      setWavError(true);
    }
  };

  const addItem = async () => {
    if (titleError || privateKeyError || categoryError || svgError || wavError) {
      alert("Check miss input!!!");
    } else {
      // TODO : MINTING 기능 추가
      alert("Ready to mint!!!");
    }
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
                onChange={handleTitle}
              />
              {titleError && <div style={styles.errorMsg}>no title input</div>}
            </div>

            <div style={styles.inputField}>
              <TextField
                label="token description"
                id="outlined-size-small"
                size="small"
                onChange={handleDescription}
              />
            </div>

            <div style={styles.inputField}>
              <TextField
                label="private key"
                id="outlined-size-small"
                size="small"
                onChange={handlePrivKey}
              />
              {privateKeyError && <div style={styles.errorMsg}>no privateKey input</div>}
            </div>

            <div style={styles.inputField}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={category}
                label="category"
                onChange={handleCategoryChange}
              >
                <MenuItem value={"화남"}>화남</MenuItem>
                <MenuItem value={"밝음"}>밝음</MenuItem>
                <MenuItem value={"차분"}>차분</MenuItem>
                <MenuItem value={"어두움"}>어두움</MenuItem>
                <MenuItem value={"극적"}>극적</MenuItem>
                <MenuItem value={"펑키"}>펑키</MenuItem>
                <MenuItem value={"행복"}>행복</MenuItem>
                <MenuItem value={"낭만적"}>낭만적</MenuItem>
                <MenuItem value={"슬픔"}>슬픔</MenuItem>
              </Select>
              {categoryError && <div style={styles.errorMsg}>no category input</div>}
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
              {svgError && <div style={styles.errorMsg}>no svg input</div>}
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
              {wavError && <div style={styles.errorMsg}>no wav input</div>}
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

