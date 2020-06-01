var upperGraphics, scene1, scene2, scene3, backLayer, upperLayer, grid, columnId, rowId, tempX, tempY;
let dataFromJSON
let arrayFromJSON;
let outputResult = [];
let winText, loseText;

//Adding buy button 
var buyBtn = PIXI.Sprite.from('res/buyTicketImage.png');
const addBuyBtn = () => {
    if (scene1) {
        buyBtn.anchor.set(0.0);
        buyBtn.x = 150;
        buyBtn.y = 865;
        buyBtn.visible = true;
        buyBtn.buttonMode = true;
        buyBtn.interactive = true;
        buyBtn.on('click', buyingBtn);
        buyBtn.on('tap', buyingBtn);
        return scene1.addChild(buyBtn);
    }
}

//Adding scratched background 
var unscrachtedBg = PIXI.Sprite.from('res/unScratched.png');
function addUnscratchedBackground() {
    if (scene1 && buyBtn.visible === false) {
        unscrachtedBg.anchor.set(0);
        unscrachtedBg.x = 0;
        unscrachtedBg.y = 0;
        return scene1.addChild(unscrachtedBg);
    }
}

//Adding scratched background
var scrachtedBg = PIXI.Sprite.from('res/scratched.png');
function addScratchedBackground() {
    if (backLayer) {
        scrachtedBg.anchor.set(0);
        scrachtedBg.x = 0;
        scrachtedBg.y = 0;
        return backLayer.addChild(scrachtedBg);
    }
}

//Adding win or lose image
var winLoseIcon = PIXI.Sprite.from('res/winlose.png');
function addResultText() {
    if (upperLayer) {
        // Set the initial position
        winLoseIcon.anchor.set(0.65);
        winLoseIcon.x = 416;
        winLoseIcon.y = 0;
        winLoseIcon.interactive = true;
        return upperLayer.addChild(winLoseIcon);
    }
}

//Adding gamelogo
var gameIcon = PIXI.Sprite.from('res/gamelogo.png');
function addGameIcon() {
    if (upperLayer) {
        // Set the initial position
        gameIcon.anchor.set(0.0);
        gameIcon.x = 120;
        gameIcon.y = 25;
        gameIcon.interactive = true;
        return upperLayer.addChild(gameIcon);
    }
}

//Adding price banner
var bannerIcon = PIXI.Sprite.from('res/pricebanner.png');
function addBannerIcon() {
    if (upperLayer) {
        // Set the initial position
        bannerIcon.anchor.set(0.0);
        bannerIcon.x = 520;
        bannerIcon.y = -20;
        bannerIcon.interactive = true;
        if (scene2.visible === true) {
            return upperLayer.addChild(bannerIcon);
        }
    }
}

//Adding button
var checkWinnings = PIXI.Sprite.from('res/checkWinBtn.png');
function addFinalResult() {
    if (upperLayer) {
        // Set the initial position
        checkWinnings.anchor.set(0.0);
        checkWinnings.x = 150;
        checkWinnings.y = 865;
        checkWinnings.visible = false;
        checkWinnings.buttonMode = true;
        checkWinnings.interactive = true;
        checkWinnings.on('click', checkWinBtn);
        checkWinnings.on('tap', checkWinBtn);
        return scene2.addChild(checkWinnings);
    }
}

//Adding button
var replayGame = PIXI.Sprite.from('res/buyTicketImage.png');

function addReplayBtn() {
    if (upperLayer) {
        // Set the initial position
        replayGame.anchor.set(0.0);
        replayGame.x = 150;
        replayGame.y = 865;
        replayGame.visible = false;
        replayGame.buttonMode = true;
        replayGame.interactive = true;
        replayGame.on('click', replayBtn);
        replayGame.on('tap', replayBtn);
        return scene3.addChild(replayGame);
    }
}

//Adding onclick for buying ticket button
function buyingBtn() {
    //Remove scratchable background    
    unscrachtedBg.visible = false;
    scene2.visible = true;
    checkWinnings.visible = true;
    winLoseIcon.position.y = 0;
    gameIcon.visible = true;
    buyBtn.visible = false;
    buyBtn.buttonMode = true;
    buyBtn.interactive = true;
    if (buyBtn.visible === false) {
        setUserActions();
    }
}

//Adding onclick for buying ticket button
function checkWinBtn() {
    setTimeout(() => theResult(), 1000);
    setTimeout(() => removeLogo(), 1000);
    setTimeout(() => winLoseIcon.position.y = 0, 5000);
    scene1.visible = false;
    scene2.visible = false;
    scene3.visible = true;
    replayGame.visible = true;
}
//Adding onclick for buying ticket button
function replayBtn() {
    scene1.visible = false;
    scene2.visible = false;
    scene3.visible = false;
    scene1.removeChild(winText);
    upperLayer.removeChild(winText);
    scene1.removeChild(loseText);
    upperLayer.removeChild(loseText);
    reloadPage();
}


function reloadPage() {
    window.location.reload();
    unscrachtedBg.visible = true;
}

//Adding onclick for buying ticket button
function removeLogo() {
    gameIcon.visible = false;
}


function getFinalResult(result) {
    var a = [],
        b = [],
        prev;

    result.sort();
    for (var i = 0; i < result.length; i++) {
        if (result[i] !== prev) {
            a.push(result[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = result[i];
    }
    let findMatch = b.map((match, i) => {
        if (match === 3) {
            let winningNumber = a[i];
            return winningNumber
        }
    })
    let filterMatch = findMatch.filter((e) => e);

    return filterMatch;
}

//Display result text
function theResult() {
    gameIcon.visible = false;
    scrachtedBg.position.y = 300;
    winLoseIcon.position.y = 300;
    scrachtedBg.y = 300;


    let checkWin = getFinalResult(outputResult);
    if (typeof checkWin != "undefined" && checkWin != null && checkWin.length != null &&
        checkWin.length > 0) {
        winText = new PIXI.Text(
            'You won\n' + checkWin, {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 'white',
                align: 'center'
            }
        );
        winText.anchor.set(0.5);
        winText.x = 320;
        winText.y = 250;
        upperLayer.addChild(winText);
    } else {
        let loseText = new PIXI.Text(
            'Sorry, no win this time', {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 'white',
                align: 'center'
            }
        );
        loseText.x = 200;
        loseText.y = 230;
        upperLayer.addChild(loseText);
    }
}

const createResultGrid = () => { 
    // Create a 3x3 grid of from json gameResult values
    for (var i = 0; i < 9; i++) {
        var resultGrid = new PIXI.Text(dataFromJSON && dataFromJSON.gameResult && dataFromJSON.gameResult.values[i], {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'white',
            align: 'center'
        });
        resultGrid.anchor.set(7.5, -1.4);
        resultGrid.height = 80;
        resultGrid.width = 40;
        resultGrid.x = (i % 3) * 185;
        resultGrid.y = Math.floor(i / 3) * 185;
        grid.addChild(resultGrid);

        // Center on the screen
        grid.x = 424;
        grid.y = 200;

        //Loop through gameResult json files and find 3 matching numbers and change color
        var k;
        var dataset = [];
        var resultOne = [];
        dataset = resultGrid;

        for (k = 0; k < dataset.length; k++) {
            if (dataset[k] == 2) {
                resultOne.push(k);
            }
        }

        //Loop through all values for resultOne and change the color value for those Indexes
        if (resultOne.length == 3) {
            //Highlight winnings
            resultGrid.tint = 0x223344;
            resultOne.fillStyle = "#FF0000";
        }
        var resultTwo = [];
        var j = 0;
        for (j = 0; j < dataset.length; j++) {
            if (dataset[j] == 22222) {
                resultTwo.push(j);
            }
        }
        if (resultTwo.length == 3) {
            //Highlight winnings
            resultGrid.tint = 0x551122;
        }
    }
}

/**
 * Setting of listeners and their logic.
 * Dragging logic.
 */
// App.prototype.setUserActions = function () {
const setUserActions = () => {
    var me = this;
    let stage = this.scratch.stage;

    stage.interactive = true;
    stage.touchstart = stage.mousedown = function () {
        me.isMouseDown = true;
    };
    stage.touchend = stage.mouseup = function () {
        me.isMouseDown = false;
    };
    stage.touchmove = stage.mousemove = function (mouseData) {
        if (!me.isMouseDown) {
            return;
        }

        //mousemove should only be active if you press buying Button buyBtn();
        me.scratch.gfx.ctx.clearRect(
            mouseData.data.global.x + me.scratch.CONFIG.verticalRect.xOffset + me.scratch.CONFIG.ghostRect.xOffset,
            mouseData.data.global.y + me.scratch.CONFIG.verticalRect.yOffset + me.scratch.CONFIG.ghostRect.yOffset,
            me.scratch.CONFIG.verticalRect.width,
            me.scratch.CONFIG.verticalRect.height
        );
        me.scratch.layer.texture.update();
    }
};
/**
 * PIXI loader for JSON
 */
App.prototype.loadJSON = function () {
    for (i = 0; i < 1; i++) {
        var randomNumber = Math.floor(Math.random() * 10);
    }

    var loader = new PIXI.Loader();
    // start loading
    loader.load();

    var request = new XMLHttpRequest();
    request.open("GET", "/json/gameOutcome" + randomNumber + ".json", true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {             
            arrayFromJSON = request && JSON.parse(request.responseText);
        }
    }

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    //read random JSON files:
    readTextFile("/json/gameOutcome" + randomNumber + ".json", function (text) {
        if (request.readyState === 4 && request.status === 200) {
            dataFromJSON = JSON.parse(request.responseText);
            if (dataFromJSON) {
                for (var i = 0; i < dataFromJSON.gameResult.values.length; i++) {
                    outputResult.push(dataFromJSON.gameResult.values[i]);
                }
            }
        }
    });
}

/**
 * Application
 * @constructor
 */
function App() {
    this.CONFIG = {
        images: [{
                name: 'scratched',
                path: '../res/scratched.png'
            },
            {
                name: 'unscratched',
                path: '../res/unScratched.png'
            },
            {
                name: 'gamelogo',
                path: '../res/gamelogo.png'
            },
            {
                name: 'winlose',
                path: '../res/winlose.png'
            },
            {
                name: 'pricebanner',
                path: '../res/priceBanner.png'
            },
            {
                name: 'buyticket',
                path: '../res/buyTicketBtn.jpg'
            }
        ],
        stageDimensions: {
            width: 640,
            height: 960
        },
        verticalRect: {
            width: 116,
            height: 124,
            xOffset: -3,
            yOffset: -12
        },
        ghostRect: {
            xOffset: 8,
            yOffset: 8
        },
        scratchArea: {
            columns: 3,
            rows: 3,
            cellWidth: 640,
            cellHeight: 960,
            offset: 20,
            scratchedBackground: 'scratched',
            unScratchedBackground: 'unscratched',
            gameLogo: 'gamelogo',
            winLose: 'winlose',
            priceBanner: 'pricebanner',
            buyTicket: 'buyticket'
        }
    };
    this.loadJSON();
    this.startRender();
    this.loadImages();
} 
 
/**
 * PIXI loader for images
 */
App.prototype.loadImages = function () {
    var me = this
    var images = [];

    this.loader = PIXI.Loader.shared;
    this.CONFIG.images.forEach(function (element) {
        me.loader.add(element.name, element.path);
    });

    this.loader.once('complete', function (loader, res) {
        for (var image in res) {
            images[image] = new PIXI.Texture(
                new PIXI.BaseTexture(res[image].data)
            );
        }
        me.generateLayers(images);
    });
    this.loader.load();
};

/**
 * Creating of a ticker and starting tick
 */
App.prototype.startRender = function () {
    var renderer = PIXI.autoDetectRenderer(
            this.CONFIG.stageDimensions.width,
            this.CONFIG.stageDimensions.height, {
                antialias: true,
                resolution: 1
            }
        ),
        stage = new PIXI.Container()
    this.ticker = new PIXI.Ticker();

    renderer.gl.canvas.height = this.CONFIG.stageDimensions.height || 960;
    renderer.gl.canvas.width = this.CONFIG.stageDimensions.width || 640;

    document.getElementById('container').appendChild(renderer.view);

    this.stage = stage;
    this.ticker.add(function () {
        renderer.render(stage);
    });
    this.ticker.start();
};
 

/**
 * Adding Images to stage
 * @param textures {Object} PIXI Texture
 */
App.prototype.generateLayers = function (textures) {
    upperGraphics = this.getCanvas(
            this.CONFIG.stageDimensions.width,
            this.CONFIG.stageDimensions.height
        ),
        scene1 = new PIXI.Container(),
        scene2 = new PIXI.Container(),
        scene3 = new PIXI.Container(),
        backLayer = new PIXI.Container(),
        upperLayer = new PIXI.Sprite(),
        grid = new PIXI.Container(),
        columnId,
        rowId,
        tempX,
        tempY;

    //add all the scenes to the stage
    upperLayer.addChild(scene1);
    upperLayer.addChild(scene2);
    upperLayer.addChild(scene3);
    //show only scene1
    scene2.visible = false;
    scene3.visible = false;

    //Adding of scratch boxes
    for (columnId = 0; columnId < this.CONFIG.scratchArea.columns; columnId++) {
        for (rowId = 0; rowId < this.CONFIG.scratchArea.rows; rowId++) {
            tempX = (columnId * this.CONFIG.scratchArea.cellWidth) + (columnId * this.CONFIG.scratchArea.offset);
            tempY = (rowId * this.CONFIG.scratchArea.cellHeight) + (rowId * this.CONFIG.scratchArea.offset);

            //Adding the unscratched area
            upperGraphics.ctx.drawImage(textures[this.CONFIG.scratchArea.unScratchedBackground].baseTexture.resource.source, tempX, tempY);

            upperGraphics.ctx.strokeRect(
                tempX,
                tempY,
                this.CONFIG.scratchArea.cellWidth,
                this.CONFIG.scratchArea.cellHeight
            );

            addBuyBtn();
            addScratchedBackground();
            addUnscratchedBackground();
            addResultText();
            addGameIcon();
            addBannerIcon();
            addFinalResult();
            addReplayBtn();
        }
    }

    createResultGrid()

    backLayer.cacheAsBitmap = true;
    this.gfx = upperGraphics;
    upperLayer.texture = PIXI.Texture.from(upperGraphics.canvas);
    this.layer = upperLayer;
    this.stage.addChild(backLayer);
    this.stage.addChild(upperLayer);
    backLayer.addChild(grid);
};
 
/**
 * Creating a new HTML5 Canvas
 * @param width {Number}
 * @param height {Number}
 * @returns {{canvas: Element, ctx: (CanvasRenderingContext2D|*)}}
 */
App.prototype.getCanvas = function (width, height) {
    var c = document.createElement("canvas");
    var ctx;
    c.width = width;
    c.height = height;
    ctx = c.getContext("2d");
    return {
        canvas: c,
        ctx: ctx
    }
};

//Creates an instance of a scratch mechanism class 
var scratch = new App();
 