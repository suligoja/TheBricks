var ballSpeed;
        function drawIt() {

            var x = 150;
            var y = 150;
            var dx;
            var dy;
            var WIDTH;
            var HEIGHT;
            var r = 10;
            var ctx;
            var paddlex;
            var paddleh;
            var paddlew;
            var tocke;
            var IntervalId;
            //timer
            var sekunde;
            var sekundeI;
            var minuteI;
            var intTimer;
            var izpisTimer;
            var start = true;

            function init_paddle() {
                paddlex = 2;
                paddleh = 10;
                paddlew = 75;
            }

            function init() {
                ctx = $('#canvas')[0].getContext("2d");
                // dodajanje kode v metodo init 
                tocke = 0;
                start = false;
                sekunde = 0;
                izpisTimer = "00:00";
                intTimer = setInterval(timer, 1000);

                $("#tocke").html(tocke);
                WIDTH = $("#canvas").width();
                HEIGHT = $("#canvas").height();
                //welcome sweet alert
                Swal.fire({
                    title: 'DOBRODOŠLI V IGRI <br>THE BRICKS!',
					html: 'Poskusite razbiti vse opeke.<br> Za premikanje ploščka lahko uporabite <br> puščice na tipkovnici ali miško. <br>  Pripravljeni?',                 
                    showConfirmButton: true,
                    confirmButtonText: 'Start',
					color: 'cyan',
                    background: 'black',
                    confirmButtonColor: 'rgb(0, 151, 151)',
                    allowOutsideClick: false,
                    backdrop: `rgb(0, 181, 181, 0.2)`
                }).then((result) => {
                    if (result.isConfirmed) {
                        var speed = result.value;
                        setBallSpeed(speed);
						audio.play();
                    }
                });

            }

            function setBallSpeed(speed) {
                speed === 'slow'
                    dx = 2;
                    dy = 4;
                
                start = false;
                intervalId = setInterval(draw, 10);// Start the game
            }

            function Rect(x, y, width, height, radius) {
            // Set the design properties for the blocks
            ctx.fillStyle = '#00FFFF'; // Change the fill color
            ctx.strokeStyle = '#00000'; // Change the stroke color
            ctx.lineWidth = 2; // Change the stroke width
            ctx.fillRect(x, y, width, height);
            // Draw the block

            // Calculate the coordinates for drawing the rounded rectangle
            var x = (j * (BRICKWIDTH + PADDING)) + PADDING;
            var y = (i * (BRICKHEIGHT + PADDING)) + PADDING;
            var width = BRICKWIDTH;
            var height = BRICKHEIGHT;
            var cornerRadius = 1; // Adjust the corner radius to make the blocks more or less round

            // Draw the rounded rectangle
            ctx.beginPath();
            ctx.moveTo(x + cornerRadius, y);
            ctx.lineTo(x + width - cornerRadius, y);
            ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
            ctx.lineTo(x + width, y + height - cornerRadius);
            ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
            ctx.lineTo(x + cornerRadius, y + height);
            ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
            ctx.lineTo(x, y + cornerRadius);
            ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
            ctx.closePath();

            ctx.fill();
            ctx.stroke();
            }

            function circle(x, y, r) {
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, true);
                ctx.fillStyle = '#00FFFF';
                ctx.closePath();
                ctx.fill();
            }

            function rect(x, y, w, h) {
                ctx.beginPath();
                ctx.rect(x, y, w, h);
                ctx.closePath();
                ctx.fill();
            }

            function clear() {
                ctx.clearRect(0, 0, WIDTH, HEIGHT);
            }
            var rightDown = false;
            var leftDown = false;

            //nastavljanje leve in desne tipke
            function onKeyDown(evt) {
                if (evt.keyCode == 39)
                    rightDown = true;
                else if (evt.keyCode == 37) leftDown = true;
            }

            function onKeyUp(evt) {
                if (evt.keyCode == 39)
                    rightDown = false;
                else if (evt.keyCode == 37) leftDown = false;
            }
            $(document).keydown(onKeyDown);
            $(document).keyup(onKeyUp);

            //premikanje miske
            var canvasMinX;
            var canvasMaxX;
            function init_mouse() {
                canvasMinX = $("canvas").offset().left;
                canvasMaxX = canvasMinX + WIDTH;
            }

            function onMouseMove(evt) {
                if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
                    paddlex = evt.pageX - canvasMinX;
                }
            }
            $(document).mousemove(onMouseMove);


            var bricks;
            var NROWS;
            var NCOLS;
            var BRICKWIDTH;
            var BRICKHEIGHT;
            var PADDING;

            function initbricks() { //inicializacija opek - polnjenje v tabelo
                NROWS = 5;
                NCOLS = 5;
                BRICKWIDTH = (WIDTH / NCOLS) - 1;
                BRICKHEIGHT = 15;
                PADDING = 1;
                bricks = new Array(NROWS);
                brickPoints = [5, 4, 3, 2, 1]; //tocke za vsako vrstico
                for (i = 0; i < NROWS; i++) {
                    bricks[i] = new Array(NCOLS);
                    for (j = 0; j < NCOLS; j++) {
                        bricks[i][j] = 1;

                    }
                }
            }

            function timer() {
                if (start == true) {
                    sekunde++;

                    sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
                    minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
                    izpisTimer = minuteI + ":" + sekundeI;

                    $("#cas").html(izpisTimer);
                }
                else {
                    sekunde = 0;
                    //izpisTimer = "00:00";
                    $("#cas").html(izpisTimer);
                }
            }

            //END LIBRARY CODE
            function draw() {
                clear();
                circle(x, y, 10);
                //premik ploščice levo in desno
                if (rightDown) {
                    if ((paddlex + paddlew) < WIDTH) {
                        paddlex += 5;
                    } else {
                        paddlex = WIDTH - paddlew;
                    }
                }
                else if (leftDown) {
                    if (paddlex > 0) {
                        paddlex -= 5;
                    } else {
                        paddlex = 0;
                    }
                }
                Rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

                //riši opeke
                for (i = 0; i < NROWS; i++) {
                    for (j = 0; j < NCOLS; j++) {
                        if (bricks[i][j] == 1) {
                            Rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                                BRICKWIDTH, BRICKHEIGHT);
                        }
                    }
                }

                rowheight = BRICKHEIGHT + PADDING / 2; //Smo zadeli opeko?
                colwidth = BRICKWIDTH + PADDING / 2;
                row = Math.floor(y / rowheight);
                col = Math.floor(x / colwidth);
                //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
                if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
                    dy = -dy; bricks[row][col] = 0;
                    var points = brickPoints[row]; // tocke za vrstico
                    tocke += 1;//ce damo namesto 1 (points)bo dodalo toliko tock kot v kateri vrstici je opeka
                    $("#tocke").html(tocke);
                }

                if (x + dx > WIDTH - r || x + dx < 0 + r)
                    dx = -dx;

                if (y + dy < 0 + r)
                    dy = -dy;

                else if (y + dy > HEIGHT - r) {
                    if (x > paddlex && x < paddlex + paddlew) {
                        dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
                        dy = -dy;
                        start = true;
                        paddleEnabled = true;
                    } else {
                        start = false;
                        Swal.fire({
                            title: 'Konec igre!',
                            html: `Žoga se je dotaknila tal! Poskusite znova!<br> Score: ${tocke}<br>Time: ${izpisTimer}`,
							iconHtml: '<img src="slike/error.png" style="width: 100px; height: 100px;">',
                            color: 'cyan',
                            background: 'black',
                            confirmButtonColor: 'rgb(0, 151, 151)',
                            confirmButtonText: 'Poskusi znova',                          
                            backdrop: `rgb(0, 141, 151, 0.2)`

                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        });
                        dx = 0;
                        dy = 0; //mogu sem dat to pred clearInterval ker drugace se sweetalert ne pojavi!
                        clearInterval(intervalId);
                    }


                }
                //pogleda ce so vse mozne tocke zadete
                if (tocke >= 25) {
                    start = false; // ustavi igro
                    clearInterval(intervalId);
                    // Show sweet alert
                    Swal.fire({
							title: 'Čestitke!',
							html: `Zbrali ste 25 točk!<br>Time: ${izpisTimer}`,
							iconHtml: '<img src="slike/success.png" style="width: 100px; height: 100px;">',
							color: 'cyan',
                            background: 'black',
                            confirmButtonColor: 'rgb(0, 151, 151)',
                            confirmButtonText: 'naprej',
                            backdrop: `rgb(0, 141, 151, 0.2)`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dx = 0;
                            dy = 0;
                            location.reload(); // Reload the page to restart the game
                        }
                    });

                }

                x += dx;
                y += dy;

            }
            init_paddle();
            init();
            init_mouse();
            initbricks();
        }
function musicGame() {
  const musicButton = document.getElementById("musicButton");
  const audio = document.getElementById("backgroundMusic");

  const currentImage = musicButton.style.backgroundImage;

  if (currentImage.includes("muted.png")) {
    musicButton.style.backgroundImage = "url('slike/speaker.png')";
    audio.play(); 
  } else {
    musicButton.style.backgroundImage = "url('slike/muted.png')";
    audio.pause();
  }
}


