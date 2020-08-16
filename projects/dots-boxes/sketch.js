let Size = 5;
let diameter;

let centerOffset;
let scaledSize;

let scene;

function setup() 
{
    scaledSize = windowWidth;
    if(windowWidth > windowHeight)
        scaledSize = windowHeight;
    scaledSize -= 100;

    scene = createCanvas(scaledSize, scaledSize)
    scene.mouseClicked(getInput); // attach listener for
    updateCanvas();
}

function windowResized() 
{
    updateCanvas();
}

function updateCanvas()
{
    scaledSize = windowWidth;
    if(windowWidth > windowHeight)
        scaledSize = windowHeight;
    sce = resizeCanvas(scaledSize, scaledSize)

    centerOffset = (windowWidth - width) / 2;
    scene.position(centerOffset, 0);
}

function draw() 
{   
    background(0);
    makeDots();
}

function getInput()
{
    /*
    let xPos = mouseX;
    let yPos = mouseY;

    xPos = round(Size * (xPos/width) - .5);
    yPos = round(Size * (yPos/width) - .5);

    if(xPos >= 0 && xPos < Size && yPos >= 0 && yPos < Size)
    {
        Cells[xPos][yPos].invert();
    }
    */
}

function makeDots()
{
    strokeWeight(0);
    fill(255);
    diameter = (height/Size)/8;
    for(let x = 1; x < Size; x++)
    {
        for(let y = 1; y < Size; y++)
        {
            circle(x * (width/Size), y * (height/Size), diameter);
        }
    }
}

class Line 
{
    constructor() 
    {
        
    }
}