/*

Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.

*/

let Size = 5;
let Cells = [];
let CellsMade;
let simStarted;

let sizeSlider;
let startButton;
let stopButton;
let updateButton;
let randomButton;

let centerOffset;
let scaledSize;

let scene;

function setup() 
{
    simStarted = false;
    CellsMade = false;

    scaledSize = windowWidth;
    if(windowWidth > windowHeight)
        scaledSize = windowHeight;

    scaledSize -= 100;

    scene = createCanvas(scaledSize, scaledSize)
    scene.mouseClicked(getInput); // attach listener for

    updateCanvas();

    initUI();
    pausedUI();
}

function windowResized() 
{

    updateCanvas();

    sizeSlider.remove();
    startButton.remove();
    randomButton.remove();
    stopButton.remove();
    updateButton.remove();
    initUI();
  
}

function updateCanvas()
{
    scaledSize = windowWidth;
    if(windowWidth > windowHeight)
        scaledSize = windowHeight;

    scaledSize -= 100;
    sce = resizeCanvas(scaledSize, scaledSize)

    centerOffset = (windowWidth - width) / 2;
    scene.position(centerOffset, 0);
}

function draw() 
{   

    if(!simStarted)
        Size = sizeSlider.value();

    background(0);

    if(CellsMade)
        drawCells();

    makeGrid();
}

function startSimulation()
{   
    if(!CellsMade)
    {
        initCells();
        CellsMade = true;
    }

    simStarted = true;
    runningUI();
}

function stopSimulation()
{
    simStarted = false;
    pausedUI();
}

function getInput()
{
    if(!CellsMade)
    {
        initCells();
        CellsMade = true;
    }

    let xPos = mouseX;
    let yPos = mouseY;

    xPos = round(Size * (xPos/width) - .5);
    yPos = round(Size * (yPos/width) - .5);

    if(xPos >= 0 && xPos < Size && yPos >= 0 && yPos < Size)
    {
        Cells[xPos][yPos].invert();
    }

}

function updateSimulation()
{
    for(let x = 0; x < Size; x++)
    {
        for(let y = 0; y < Size; y++)
        {
            Cells[x][y].calcNeighbors();
        }
    }

    for(let x = 0; x < Size; x++)
    {
        for(let y = 0; y < Size; y++)
        {
            Cells[x][y].update();
        }
    }
}

function initUI()
{
    stopButton = createButton('Stop');
    stopButton.position(centerOffset, width);
    stopButton.mousePressed(stopSimulation);
    stopButton.style('width', width + 'px');

    updateButton = createButton('Next Frame');
    updateButton.position(centerOffset, width + 25);
    updateButton.mousePressed(updateSimulation);
    updateButton.style('width', width + 'px');

    randomButton = createButton('Randomize');
    randomButton.position(centerOffset, width + 25);
    randomButton.mousePressed(randomizeCells);
    randomButton.style('width', width + 'px');

    sizeSlider = createSlider(5, 20, 10, 1);
    sizeSlider.position(centerOffset, width + 50);
    sizeSlider.input(initCells);
    sizeSlider.style('width', width + 'px');

    startButton = createButton('Start');
    startButton.position(centerOffset, width);
    startButton.mousePressed(startSimulation);
    startButton.style('width', width + 'px');
}

function runningUI()
{
    sizeSlider.hide();
    startButton.hide();
    randomButton.hide();

    stopButton.show();
    updateButton.show();
}

function pausedUI()
{
    stopButton.hide();
    updateButton.hide();

    sizeSlider.show();
    startButton.show();
    randomButton.show();
}

function initCells()
{
    CellsMade = false;

    for(let x = 0; x < Size; x++)
    {
        Cells[x] = [];
        for(let y = 0; y < Size; y++)
        {
            Cells[x][y] = new Cell(x, y, false);
        }
    }
}

function randomizeCells()
{
    for(let x = 0; x < Size; x++)
    {
        Cells[x] = [];
        for(let y = 0; y < Size; y++)
        {
            Cells[x][y] = new Cell(x, y, ranBool());
        }
    }

    CellsMade = true;
}

function ranBool()
{
    let value;
    if(random() > 0.5)
        value = true;
    else
        value = false;

    return value;
}

function drawCells()
{
    for(let x = 0; x < Size; x++)
    {
        for(let y = 0; y < Size; y++)
        {
            Cells[x][y].display();
        }
    }
}

function makeGrid()
{
    stroke(100);
    strokeWeight(2);
    for(let i = 0; i < Size + 1; i++)
    {
        line(i * (width/Size), 0, i * (width/Size), height);
        line(0 , i * (width/Size), width, i * (width/Size));
    }
}

class Cell 
{
    constructor(x, y, alive) 
    {
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.neighbors = 0;
    }
  
    display()
    {
        if(this.alive)
            fill(255);
        else
            fill(0);

        strokeWeight(0);
        rect((this.x * width/Size), (this.y * width/Size), width/Size, width/Size);
    }

    update()
    {
        if(this.alive)
        {
            switch (this.neighbors) 
            {
                case 0: this.alive = false; break;  //Underpopulation
                case 1: this.alive = false; break;  //Underpopulation
                case 2: this.alive = true;  break;  //Survives
                case 3: this.alive = true;  break;  //Survives
                case 4: this.alive = false; break;  //Overpopulation
                case 5: this.alive = false; break;  //Overpopulation
                case 6: this.alive = false; break;  //Overpopulation
                case 7: this.alive = false; break;  //Overpopulation
                case 8: this.alive = false; break;  //Overpopulation
            }
        }else
        {
            switch (this.neighbors) 
            {
                case 0: this.alive = false; break;  //Still Dead
                case 1: this.alive = false; break;  //Still Dead
                case 2: this.alive = false; break;  //Still Dead
                case 3: this.alive = true;  break;  //Cell is born
                case 4: this.alive = false; break;  //Still Dead
                case 5: this.alive = false; break;  //Still Dead
                case 6: this.alive = false; break;  //Still Dead
                case 7: this.alive = false; break;  //Still Dead
                case 8: this.alive = false; break;  //Still Dead
            }
        }
    }

    calcNeighbors()
    {
        let count = 0;

        for(let y = this.y - 1; y < this.y + 2; y++)
        {
            for(let x = this.x - 1; x < this.x + 2; x++)
            {   
                if(x >= 0 && x < Size && y >= 0 && y < Size)
                {
                    if(Cells[x][y].alive)
                    {
                        count++;
                    }
                }
            }
        }

        if(this.alive)
            count--;

        this.neighbors = count;
    }

    invert()
    {
        this.alive = !this.alive;
    }
}