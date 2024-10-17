import { Modal} from "react-bootstrap";
import React, { useState } from "react";
import "./style/model.scss"
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import { deleteInfoApi, ShowInfosApi, closeInfo } from "../../redux/actions/info";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {useSelector} from 'react-redux'

const Popping = ({open, handleClose,info, deleteInfoApi, renderStatus, rerender})=> {
   const navigate = useNavigate();
   const token = useSelector(state => state.token)

   const {id, describe, title, start, end} = info;

   const handleDelete =async () => {
     await deleteInfoApi(info.id,token);
     rerender(!renderStatus)
   }

   

   const modal = ()=>{
     return (
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-capitalize">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {describe? <p className="lead">{describe}</p>: "No Dsecriptions Yet"}
            <div className="row justify-content-between">
              <p className="col small text-muted text-center pb-0 mb-0">de: {start}</p>
              <p className="col small text-muted text-center pb-0 mb-0">à: {end}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
     
          <Button variant="contained" color="warning" onClick={handleClose}>
          Fermer
      </Button>
      <Link to={`/inv/info/${id}/update`}>
        <Button variant="contained" color="success">
        Mise à jour
        </Button>
      </Link>
      <Button variant="contained" color="error" onClick={handleDelete}>
      Supprimer
      </Button>
        </Modal.Footer>
      </Modal>
     )
   }

   if(id){
     return modal()
   }else{
     <p>there is no modal to preview</p>
   }
   
  }

  function mapStateToProps({info}){
     return {
       info,
      //  modalStatus
     }
  }
  
  export default connect(mapStateToProps, {deleteInfoApi, closeInfo})(Popping)