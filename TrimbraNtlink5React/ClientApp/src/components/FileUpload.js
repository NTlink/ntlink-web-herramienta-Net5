import React, { useState } from 'react';

const FileUpload = () => {
    
  const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState("");
    const [fileName, setFileName] = useState('Archivo XML'); // Estado para manejar el nombre del archivo


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Obtener el archivo seleccionado
        setFile(selectedFile); // Guardar el archivo en el estado
        setFileName(selectedFile ? selectedFile.name : 'Archivo XML'); // Actualizar el nombre del archivo

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor seleccione un archivo ");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch('http://localhost:39482/api/fileupload/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al cargar el archivo");
      }

      const result = await response.json();
      setFileContent(result.fileContent); // Mostrar el contenido del archivo XML


     // console.log("File content:", result.fileContent);
    } catch (error) {
        console.error("Error al cargar el archivo:", error);
    }
  };

  return (
      <div className="container mt-5">
          <div className="row">
              <div className="container mt-1">
                  <h2>Subir archivo XML</h2>
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">
                          <label htmlFor="fileInput" className="sr-only">Archivo XML</label>
                          <div className="custom-file">
                              <input
                                  type="file"
                                  className="custom-file-input"
                                  id="fileInput"
                                  accept=".xml"
                                  onChange={handleFileChange}
                              />
                              <label className="custom-file-label" htmlFor="fileInput">
                                  {fileName} {/* Mostrar el nombre del archivo seleccionado */}
                              </label>
                          </div>
                      </div>
                      <button type="submit" className="btn btn-primary mt-3">Timbrar XML</button>
                  </form>
              </div>
          </div>
          <div className="row">

              <div>
                  <span id="Label4" className="control-label">Salida</span>
                  <textarea name="txtSalida" value={fileContent } rows="15" cols="400" id="txtSalida" className="form-control" >
                      
                  </textarea>

              </div>

          </div>
      </div>
    );
    
};

export default FileUpload;