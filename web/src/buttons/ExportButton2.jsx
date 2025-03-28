import React, { useState } from "react";
import { get } from "utils/request";  // Import de la fonction get de requests.js
import html2canvas from "html2canvas";

const ExportButton = ({ targetRef, fileName = "exported-image.png" }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleExport = async () => {
    if (targetRef.current) {
      try {
        setIsDownloading(true);
        
        // Trouver toutes les images dans la div
        const images = targetRef.current.getElementsByTagName("img");

        // Modifier les URLs des images pour les envoyer via le backend
        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const imageUrl = image.src;
          
          // Utilisation de la fonction get pour récupérer l'image via ton API ou CORS
          await get(imageUrl, (response) => {
            // Créer un objet image avec le contenu téléchargé
            console.log(response)
            const imgBlob = new Blob([response], { type: "image/png" });

            // Créer un URL de l'image à partir du Blob
            const imgURL = URL.createObjectURL(imgBlob);
            imageUrls.push(imgURL);
          }, (error) => {
            console.error("Erreur lors du téléchargement de l'image", error);
          });
        }

        // Appliquer les URLs téléchargées aux images dans la div cible
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          image.src = imageUrls[i];
        }

        // Maintenant, utiliser html2canvas pour prendre la capture d'écran de la div
        const canvas = await html2canvas(targetRef.current, {
          backgroundColor: null, // Utiliser l'arrière-plan transparent
          useCORS: true, // Autoriser CORS pour les images
        });

        // Convertir le canvas en image (format base64)
        const image = canvas.toDataURL("image/png");
        
        // Créer un lien pour télécharger l'image
        const link = document.createElement("a");
        link.href = image;
        link.download = fileName;
        link.click();

        setIsDownloading(false);
      } catch (error) {
        console.error("Erreur lors de l'export", error);
        setIsDownloading(false);
      }
    }
  };

  return (
    <button onClick={handleExport} disabled={isDownloading}>
      {isDownloading ? "Téléchargement en cours..." : "Télécharger"}
    </button>
  );
};

export default ExportButton;
