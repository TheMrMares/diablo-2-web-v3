export const createImage = (url) => {
    let myImage = new Image();
    myImage.src = url;
    return myImage;
}