
let img;
let selectionSorted;
let index = 0;

let frameP;

function setup() {
    createCanvas(windowWidth, 600);

    noSmooth();
    img = createImage(100, 100);


    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        img.pixels[i] = random(256);
        img.pixels[i + 1] = img.pixels[i];
        img.pixels[i + 2] = img.pixels[i];
        img.pixels[i + 3] = 100;
    }

    img.updatePixels();

    selectionSorted = img.get();

    frameP = createP();
}


function draw() {
    frameP.html("Frame rate: " + nf(frameRate(), 2, 2));

    selectionSorted.loadPixels();

    /*  TITLE: SELECTION-SORT ALGORITHM */
    let prevBcompare = -1;
    let selectedPixel = index;

    for (let j = index; j < selectionSorted.pixels.length; j += 4) {
        let pix = color(
            selectionSorted.pixels[j],
            selectionSorted.pixels[j + 1],
            selectionSorted.pixels[j + 2],
            selectionSorted.pixels[j + 3]);
        let pixB = brightness(pix);
        if (pixB > prevBcompare) {
            selectedPixel = j;
            prevBcompare = pixB;
        }
    }

    swap(selectionSorted, index, selectedPixel);

    if (index < selectionSorted.pixels.length - 1 - 1) {
        index += 4;
    }
    else {
        noLoop()
    }

    selectionSorted.updatePixels();

    /* DRAWING the IMAGES */
    background(200);

    let imgZw = img.width * 4;
    let imgZh = img.height * 4;

    let images = [img, selectionSorted];
    let spacingimg = floor((width - imgZw * images.length) / (images.length + 1));

    for (let i = 0; i < images.length; i++) {
        image(images[i], 
        (spacingimg * (i+1)) + (imgZw * i), (height - imgZh) / 2, imgZw, imgZh);

    }

}



function swap(arr, arrCoordinate1, arrCoordinate2) {
    let temp = [0,1,2,3];
    temp[0] = arr.pixels[arrCoordinate1];
    temp[1] = arr.pixels[arrCoordinate1 + 1];
    temp[2] = arr.pixels[arrCoordinate1 + 2];
    temp[3] = arr.pixels[arrCoordinate1 + 3];
    arr.pixels[arrCoordinate1] = arr.pixels[arrCoordinate2];
    arr.pixels[arrCoordinate1 + 1] = arr.pixels[arrCoordinate2 + 1];
    arr.pixels[arrCoordinate1 + 2] = arr.pixels[arrCoordinate2 + 2];
    arr.pixels[arrCoordinate1 + 3] = arr.pixels[arrCoordinate2 + 3];
    arr.pixels[arrCoordinate2] = temp[0];
    arr.pixels[arrCoordinate2 + 1] = temp[1];
    arr.pixels[arrCoordinate2 + 2] = temp[2];
    arr.pixels[arrCoordinate2 + 3] = temp[3];
}