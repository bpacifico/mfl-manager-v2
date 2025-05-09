import React from "react";
import html2canvas from "html2canvas";
import "./ExportButton.css";
import { useState } from "react";


const ExportButton = ({ targetRef, fileName = "exported-image.png" }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleExport = async () => {
        setIsProcessing(true);
        if (targetRef.current) {
            const target = targetRef.current;
            const proxyUrl = "http://localhost:5000/proxy?url=";

            // Sélectionner toutes les images dans l'élément à exporter
            const images = target.querySelectorAll("img");

            // Remplacer les URLs des images par l'URL du proxy avant d'exécuter html2canvas
            const imagePromises = Array.from(images).map(async (img) => {
                const imageUrl = img.src;
                if (imageUrl) {
                    const encodedImageUrl = encodeURIComponent(imageUrl); // Encoder l'URL
                    const imageProxyUrl = proxyUrl + encodedImageUrl; // Créer l'URL du proxy

                    console.log("Envoi de l'image via le proxy : ", imageProxyUrl);

                    // Remplacer l'URL de l'image par celle du proxy
                    try {
                        const response = await fetch(imageProxyUrl);
                        if (!response.ok) {
                            throw new Error("Erreur lors de la récupération de l'image via le proxy");
                        }
                        const blob = await response.blob(); // Récupérer l'image comme un blob
                        img.src = URL.createObjectURL(blob); // Remplacer l'URL de l'image par le blob
                    } catch (error) {
                        console.error("Erreur dans la récupération de l'image depuis le proxy :", error);
                    }
                } 
            });

            // Attendre que toutes les images soient récupérées et remplacées par le proxy
            await Promise.all(imagePromises);

            // Attendre que toutes les images soient complètement chargées avant de continuer
            const loadingPromises = Array.from(images).map((img) => {
                return new Promise((resolve) => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.onload = resolve;
                        img.onerror = resolve;
                    }
                });
            });

            // Attendre que toutes les images soient chargées
            await Promise.all(loadingPromises);

            // Générer l'image avec html2canvas
            const canvas = await html2canvas(target, {
                backgroundColor: null,
                allowTaint: true,
                useCORS: true,
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = fileName;
            link.click();
            setIsProcessing(false);
        }
    };

    return <button className="py-2 transparent-button export-button" onClick={handleExport}>{isProcessing ? "Processing..." : "Download"}</button>;
};

export default ExportButton;
