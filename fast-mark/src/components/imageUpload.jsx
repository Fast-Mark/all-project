import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function ImageUpload({setImageURL}) {
    // TODO: перенести это в стартовое окно или сделать так, чтобы это был общий компонент для загрузки
    function handleImageLoad(event) {
        const file = event.target.files[0]
        // проверка на наличие файла вообще
        if (!file.type) {
            return
        }

        setImageURL(URL.createObjectURL(file))
    }

    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });
        

  return (
        <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
          
        >
          upload image
          <input hidden accept="image/*" type="file" onChange={handleImageLoad}/>
          <VisuallyHiddenInput type="file" />
        </Button>
        
  );
}




