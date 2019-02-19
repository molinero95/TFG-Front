export class CanvasHelper {

    /**
     * Obtiene el rawImage de la imagen de la url
     * @param url url de la imagen
     * @param callback funcion que tiene como parámetro el raw content de la imagen
     */
    public static getRawImageData(url: string, callback: (rawImageData: string) => void): Promise<string> {
        return new Promise<string>((resolve) => {
            this.getCanvasItemContext(url, (canvas, context, image) => {
                context.drawImage(image, 0, 0);
                resolve(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
            });
        });
    }

    /**
     * Obtiene el base64 de la imagen de la url
     * @param url url de la imagen 
     */
    public static getDataURI(url: string): Promise<string> {
        return new Promise<string>((resolve) => {
            this.getCanvasItemContext(url, (canvas, context, image) => {
                context.drawImage(image, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            });
        });
        
    }

    /**
     * Obtiene la imagen de la url especificada redimensionada
     * @param url url de la imagen
     * @param newHeight nueva altura
     * @param newWidth nueva anchura
     */
    public static getResizedImage(url: string, newHeight: number, newWidth: number): Promise<ImageData> {
        return new Promise<ImageData>((resolve) => {
            this.getCanvasItemContext(url, (canvas, context, image) => {
                context.drawImage(image, 0, 0, newWidth, newHeight, 0, 0, canvas.width, canvas.height);
                resolve(context.getImageData(0, 0, canvas.width, canvas.height));
            }, newWidth, newHeight);
        });
    }

    /**
     * Obtiene la imagen de la url especificada redimensionada y en blanco y negro
     * @param url url de la imagen
     * @param newHeight nueva altura
     * @param newWidth nueva anchura
     */
    public static async getResizedImageGrayScale(url: string, newHeight: number, newWidth: number): Promise<ImageData> {
        return new Promise<ImageData>((resolve) => {
            this.getCanvasItemContext(url, (canvas, context, image) => {
                context.drawImage(image, 0, 0, newWidth, newHeight, 0, 0, canvas.width, canvas.height);
                let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                resolve(this.canvasImgToGrayScale(imageData));
            }, newWidth, newHeight);
        });
    }


    /**
     * @param imgData los datos de la imagen
     * @returns la imagen en escala de grises
     */
    private static canvasImgToGrayScale(imgData: ImageData): ImageData {
        for (let i = 0; i < imgData.height; i++) {
            for (let j = 0; j < imgData.width; j++) {
                let index = (i * 4) * imgData.width + j * 4;
                let avg = (imgData.data[index] + imgData.data[index + 1] + imgData.data[index + 2]) / 3;
                imgData.data[index] = avg;
                imgData.data[index + 1] = avg;
                imgData.data[index + 2] = avg;
            }
        }
        return imgData;
    }


    /**
     * @param url url de la imagen
     * @param callback funcion que tiene como parámetro el canvas, el contexto y el item como HTMLElement
     * @param width opcional: nuevo ancho
     * @param heigh opcional: nueva altura
     */
    private static getCanvasItemContext(url: string, callback: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, item: HTMLImageElement) => any, width?: number, heigh?: number) {
        let image: HTMLImageElement = new Image();
        image.onload = (item: Event) => {
            let img = item.target as HTMLImageElement;
            this.removeOldCanvas();
            let canvas = document.createElement("canvas") as HTMLCanvasElement;
            if (width)
                canvas.width = width;
            else
                canvas.width = img.width;
            if (heigh)
                canvas.height = heigh;
            else
                canvas.height = img.height;
            canvas.hidden = true;
            let context = canvas.getContext("2d");
            callback(canvas, context, img);
        }
        image.src = url;
    }


    /**
     * Elimina todos los canvas generados
     */
    private static removeOldCanvas() {
        let canvasToRemove = document.querySelectorAll("canvas");
        canvasToRemove.forEach(canvas => {
            canvas.remove();
        });
    }
}