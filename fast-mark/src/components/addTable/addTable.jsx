import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { baseURL, uploadTable } from '../../const/endpoints';

export default function AddTable() {
  const handleUpload = async (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.file;
    const file = fileInput.files[0];
    console.log("получен файл")
    if (!file) {
      alert('Пожалуйста, выберите файл для загрузки.');
      return;
    }

    const formData = new FormData();
    formData.append('table', file);

    // try {
    //   const response = await axios.post(`${baseURL}${uploadTable}`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   alert('Таблица успешно загружена.');
    // } catch (error) {
    //   console.error('Ошибка при загрузке таблицы:', error);
    //   alert('Ошибка при загрузке таблицы.');
    // }
  };

  return (
    <form onSubmit={handleUpload}>
      <Button variant="contained" component="label">
            Add table
        <input type="file" hidden />
      </Button>
    </form>
  );
};
