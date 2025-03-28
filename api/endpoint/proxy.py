from fastapi import Request
from fastapi.responses import StreamingResponse
import requests
from io import BytesIO
from PIL import Image
import cairosvg

async def proxy_image(request: Request):
    url = request.query_params.get('url')  # Récupérer l'URL passée dans la query string
    
    if url is None:
        return {"error": "No URL provided"}
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            content_type = response.headers.get('Content-Type', '')
            img_bytes = BytesIO(response.content)
            
            # Si l'image est un SVG, on la convertit en PNG
            if 'image/svg+xml' in content_type:
                # Utiliser cairosvg pour convertir le SVG en PNG
                png_bytes = BytesIO()
                cairosvg.svg2png(file_obj=img_bytes, write_to=png_bytes)
                png_bytes.seek(0)  # Revenir au début du BytesIO
                
                # Renvoi de l'image PNG
                headers = {"Access-Control-Allow-Origin": "*", "Content-Type": "image/png"}
                return StreamingResponse(png_bytes, media_type="image/png", headers=headers)
            
            # Si c'est une image PNG ou JPEG, on la renvoie telle quelle
            elif 'image/png' in content_type or 'image/jpeg' in content_type:
                headers = {"Access-Control-Allow-Origin": "*", "Content-Type": content_type}
                return StreamingResponse(img_bytes, media_type=content_type, headers=headers)
            else:
                return {"error": "Unsupported image format"}
        else:
            return {"error": f"Image not found or cannot be fetched, status code: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error fetching the image: {str(e)}"}
