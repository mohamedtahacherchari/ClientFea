import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addEventApi } from "../../../redux/actions/event";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { fr } from 'date-fns/locale';
import {useSelector} from 'react-redux'

// Schema de validation des inputs d'événement
const schema = yup.object({
  title: yup.string().required("Le titre ne peut pas être vide"),
  start: yup.date().required("Veuillez spécifier l'heure de début"),
  youtubeLink: yup.string().url("Veuillez entrer une URL valide pour YouTube"),
  imageUrl: yup.string().url("Veuillez entrer une URL valide pour l'image"),
  pdfUrl: yup.string().url("Veuillez entrer une URL valide pour le PDF"),
  googleDriveVideoUrl: yup.string().url("Veuillez entrer une URL valide pour la vidéo Google Drive")
}).required();

const AddEvents = ({ addEventApi, error }) => {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const [dbError, setError] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const token = useSelector(state => state.token)

  useEffect(() => {
    if (error && !firstRender) {
      setError(error);
    }
    if (!error.start && !error.end && dbError !== false) {
      setTimeout(() => navigate("/"));
    }
  }, [rerender]);

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (values) => {
    setFirstRender(false);
    addEventApi(values,token)
      .then(() => {
        setRerender(!rerender);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="align-content-center m-5">
      <div className="mb-4">
        <label htmlFor="title" className="form-label">Titre de l'événement</label>
        <input {...register("title")} type="text" placeholder="Titre" className="form-control" id="title" aria-describedby="title" />
        <p className={`error text-warning position-absolute ${errors.title ? "active" : ""}`}>{errors.title ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.title?.message}</p>
      </div>
      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="start" className="form-label">Date de début</label>
        <Controller
          control={control}
          name="start"
          render={({ field }) => {
            
            console.log("Field value:", field.value); // Ajoutez le console.log ici

            return (
            <DatePicker
              placeholderText="Sélectionner une date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              value={field.value}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control"
              id="start"
              locale={fr} // Spécifiez la locale française ici

            />
          )}}
        />
        <p className={`error text-warning position-absolute ${errors.start ? "active" : ""}`}>{errors.start ? <i className=" bi bi-info-circle me-2"></i> : ""}{errors.start?.message}</p>
        <p className={`error text-warning position-absolute ${dbError.start ? "" : "d-none"}`}>{dbError.start ? <i className=" bi bi-info-circle me-2"></i> : ""}{dbError.start}</p>
      </div>
      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="end" className="form-label">Date de fin</label>
        <Controller
          control={control}
          name="end"
          render={({ field }) => (
            <DatePicker
              placeholderText="Sélectionnez la date de fin"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              value={field.value}
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              className="form-control"
              id="end"
              locale={fr} // Spécifiez la locale française ici

            />
          )}
        />
        <p className={`error text-warning position-absolute ${dbError.end ? "" : "d-none"}`}>{dbError.end ? <i className=" bi bi-info-circle me-2"></i> : ""}{dbError.end}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="describe" className="form-label">Description de l'événement<span className="text-danger small">(facultative)</span></label>
        <input {...register("describe")} type="text" placeholder="Décrivez votre événement" className="form-control" id="describe" aria-describedby="describe" />
      </div>
      <div className="mb-4">
        <label htmlFor="youtubeLink" className="form-label">Lien YouTube</label>
        <input {...register("youtubeLink")} type="text" placeholder="Lien YouTube" className="form-control" id="youtubeLink" aria-describedby="youtubeLink" />
        <p className={`error text-warning position-absolute ${errors.youtubeLink ? "active" : ""}`}>{errors.youtubeLink ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.youtubeLink?.message}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="imageUrl" className="form-label">URL de l'image</label>
        <input {...register("imageUrl")} type="text" placeholder="URL de l'image" className="form-control" id="imageUrl" aria-describedby="imageUrl" />
        <p className={`error text-warning position-absolute ${errors.imageUrl ? "active" : ""}`}>{errors.imageUrl ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.imageUrl?.message}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="pdfUrl" className="form-label">URL du PDF</label>
        <input {...register("pdfUrl")} type="text" placeholder="URL du PDF" className="form-control" id="pdfUrl" aria-describedby="pdfUrl" />
        <p className={`error text-warning position-absolute ${errors.pdfUrl ? "active" : ""}`}>{errors.pdfUrl ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.pdfUrl?.message}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="googleDriveVideoUrl" className="form-label">Lien de la vidéo Google Drive</label>
        <input {...register("googleDriveVideoUrl")} type="text" placeholder="Lien de la vidéo Google Drive" className="form-control" id="googleDriveVideoUrl" aria-describedby="googleDriveVideoUrl" />
        <p className={`error text-warning position-absolute ${errors.googleDriveVideoUrl ? "active" : ""}`}>{errors.googleDriveVideoUrl ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.googleDriveVideoUrl?.message}</p>
      </div>
      <Button variant="contained" color="success" type="submit">Créer</Button>
    </form>
  );
}

function mapStateToProps({ event, error }) {
  return {
    error
  }
}

export default connect(mapStateToProps, { addEventApi })(AddEvents);