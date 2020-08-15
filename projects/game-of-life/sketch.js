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
let simStarted;

let sizeSlider;
let startButton;
let stopButton;
let updateButton;

function setup() 
{
    simStarted = false;

    createCanvas(400, 400);

    initUI();
    pausedUI();
}

function draw() 
{   

    if(!simStarted)
        Size = sizeSlider.value();

    background(220);

    if(simStarted)
        drawCells();

    makeGrid();
}

function startSimulation()
{
    initCells();

    simStarted = true;
    runningUI();
}

function stopSimulation()
{
    simStarted = false;
    pausedUI();
}

function updateSimulation()
{
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
    stopButton.position(0, 400);
    stopButton.mousePressed(stopSimulation);
    stopButton.style('width', '400px');

    updateButton = createButton('Next Frame');
    updateButton.position(0, 425);
    updateButton.mousePressed(updateSimulation);
    updateButton.style('width', '400px');

    sizeSlider = createSlider(3, 10, 5, 1);
    sizeSlider.position(0, 425);
    sizeSlider.style('width', '400px');

    startButton = createButton('Start');
    startButton.position(0, 400);
    startButton.mousePressed(startSimulation);
    startButton.style('width', '400px');
}

function runningUI()
{
    sizeSlider.hide();
    startButton.hide();

    stopButton.show();
    updateButton.show();
}

function pausedUI()
{
    stopButton.hide();
    updateButton.hide();

    sizeSlider.show();
    startButton.show();
}

function initCells()
{
    for(let x = 0; x < Size; x++)
    {
        Cells[x] = [];
        for(let y = 0; y < Size; y++)
        {
            Cells[x][y] = new Cell((x * width/Size), (y * width/Size), ranBool());
        }
    }
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
    stroke(150);
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
    }
  
    display()
    {
        if(this.alive)
            fill(0);
        else
            fill(255);

        strokeWeight(0);
        rect(this.x, this.y, width/Size, width/Size);
    }

    update()
    {
        this.alive = !this.alive;
    }
}