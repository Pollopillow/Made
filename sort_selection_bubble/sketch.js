
let img;
let selectionSorted;
let bubbleSorted;
let Nsorted = 0;

let frameP;

function setup() {
    createCanvas(windowWidth, windowHeight - 50/* space to print the paragraph with the frame-rate count, under */);

    noSmooth();
    img = createImage(35, 35);
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        img.pixels[i] = random(256);
        img.pixels[i + 1] = img.pixels[i];
        img.pixels[i + 2] = img.pixels[i];
        img.pixels[i + 3] = 100;
    }

    img.updatePixels();

    selectionSorted = img.get();
    bubbleSorted = img.get();

    frameP = createP();
    console.log("Pixel in img: 100x100 = 10'000", "    PIXEL* 4 (valori per descrivere ogni pixel). > Numero di elementi nell'Array img[] : ", img.pixels.length);
}


function draw() {
    frameP.html("Frame rate: " + nf(frameRate(), 2, 2));

    selectionSorted.loadPixels();
    bubbleSorted.loadPixels();

    if (Nsorted < img.pixels.length) {

        /*  TITLE: SELECTION-SORT ALGORITHM */
        let prevBcompare = -1;
        let selectedpix;

        for (let j = Nsorted; j < selectionSorted.pixels.length; j += 4) {
            let pix = color(
                selectionSorted.pixels[j],
                selectionSorted.pixels[j + 1],
                selectionSorted.pixels[j + 2],
                selectionSorted.pixels[j + 3]);

            let pixB = brightness(pix);

            if (pixB > prevBcompare) {
                selectedpix = j;
                prevBcompare = pixB;
            }
        }
        swap(selectionSorted, Nsorted, selectedpix);


        /*  TITLE: BUBBLE-SORT ALGORITHM */
        
        for (let j = 0; j < bubbleSorted.pixels.length - Nsorted - 1; j += 4) {

            let pix1 = color(
                bubbleSorted.pixels[j],
                bubbleSorted.pixels[j + 1],
                bubbleSorted.pixels[j + 2],
                bubbleSorted.pixels[j + 3]);

            let pix2 = color(
                bubbleSorted.pixels[j + 4],
                bubbleSorted.pixels[j + 5],
                bubbleSorted.pixels[j + 6],
                bubbleSorted.pixels[j + 7]);

            let pixB1 = brightness(pix1);
            let pixB2 = brightness(pix2);

            /* porto il pix meno luminoso verso la fine dell'array */
            /* es. [con a = valore più basso dei 3] a,b,b' _ b,a,b' _ b,b',a   */
            if (pixB1 < pixB2) {
                swap(bubbleSorted, j, j + 4);
            }
        }

        Nsorted += 4;
    }
    else {
        noLoop()
    }

    bubbleSorted.updatePixels();
    selectionSorted.updatePixels();

    /* DRAWING the IMAGES */
    background(200);

    let W_RenderingIMG = 400;
    let zoom2render = ceil(W_RenderingIMG / img.width);
    let imgZw = img.width * zoom2render;
    let imgZh = img.height * zoom2render;

    let images = [selectionSorted, img, bubbleSorted];
    let spacingimg = floor((width - imgZw * images.length) / (images.length + 1));

    for (let i = 0; i < images.length; i++) {
        image(images[i],
            (spacingimg * (i + 1)) + (imgZw * i), (height - imgZh) / 2, imgZw, imgZh);

    }

}


function swap(arr, arrCoordinate1, arrCoordinate2) {
    let temp = [0, 1, 2, 3];
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