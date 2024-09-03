function initLevel(level) {
    switch (level) {
        case 1:

            // player
            spelerX = 20;  // x-positie van speler
            spelerY = 660; // y-positie van speler
            bulletX = spelerX;

            //platforms
            platY = [660, 500, 470, 440, 410, 380, 350, 370, 580, 500, 400, 350, 270, 210, 150];
            platX = [0, 0, 990, 960, 930, 900, 870, 720, 1120, 1250, 430, 250, 90, 250, 290];
            platWidth = [1280, 1110, 30, 30, 30, 30, 30, 60, 170, 30, 60, 60, 90, 30, 1100];
            platHeight = [60, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];

            //walls
            wallX = [1250, 990, 960, 930, 900, 870, -30, 1280, 90, 1120, 1080];
            wallY = [500, 470, 440, 410, 380, 350, 0, 150, 240, 580, 500];
            wallWidth = [30, 30, 30, 30, 30, 30, 30, 10, 30, 10, 10];
            wallHeight = [200, 30, 30, 30, 30, 30, 800, 750, 30, 30, 30];

            //kill blocks
            killX = [
                //spike 0 1 2
                150, 270, 300,
                //apple 3 4 5 6 7
                660, 705, 770, 790, 820,
                // 8 9 10 11 12
                905, 870, 920, 985, 1040,
                // 13 14
                0, 290,
                //15 16
                1272, 1280,
                //17 18 19 20 30
                445, 300, 250, 120, 90, 1250
            ];

            killY = [
                //spike 0 1 2
                634, 530, 634,
                //apple 3 4 5 6 7
                565, 540, 585, 540, 570,
                // 8 9 10 11 12
                580, 545, 530, 540, 565,
                // 13 14
                474, 180,
                // 15 16
                150, 0,
                //17 18 19 20 21
                374, 340, 340, 240, 214, 474
            ];

            killWidth = [
                //spike 0 1 2
                90, 30, 60,
                //apple 3 4 5 6 7
                20, 20, 20, 20, 20,
                // 8 9 10 11 12
                20, 20, 20, 20, 20,
                // 13 14
                1000, 990,
                //15 16
                8, 30,
                //17 18 19 20 21 22
                30, 10, 10, 30, 30, 30
            ];

            killHeight = [
                //spike 0 1 2
                26, 26, 26,
                //apple 3 4 5 6 7
                20, 20, 20, 20, 20,
                // 8 9 10, 11, 12
                20, 20, 20, 20, 20,
                //13 14
                26, 26,
                //15 16
                8, 150,
                //17 18 19 20 21 22 
                26, 10, 10, 30, 26, 26
            ];

            //draw spike
            drawSpikeWidth = 30;
            drawSpikeHeight = 30;

            drawSmallSpikeX = 250;
            drawSmallSpikeY = 340;
            drawSmallSpikeW = 8;
            drawSmallSpikeH = 8;
            //spikeUp
            drawSpikeXUp = [
                //spikeUp 0
                150, 180, 210,
                //spikeUp 2
                300, 330,
                //spikeUp 3
                0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300,
                330, 360, 390, 420, 450, 480, 510, 540, 570, 600, 630,
                660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960,
                //spikeUp 4
                445, 1250,
                //spikeUp 5
                90
            ];

            drawSpikeYUp = [
                //spikeUp 0
                630, 630, 630,
                //spikeUp 2
                630, 630,
                //spikeUp 3
                470, 470, 470, 470, 470, 470, 470, 470, 470, 470, 470,
                470, 470, 470, 470, 470, 470, 470, 470, 470, 470, 470,
                470, 470, 470, 470, 470, 470, 470, 470, 470, 470, 470,
                //spikeUp 4
                370, 470,
                //spikeUp 5
                210
            ];

            //spikeLeft
            drawSpikeXLeft = [
                //spikeLeft 0 1 2 3 4
                1280, 1280, 1280, 1280, 1280
            ];
            drawSpikeYLeft = [
                //spikeLeft 0 1 2 3 4
                0, 30, 60, 90, 120
            ];

            //spikeDown
            drawSpikeXDown = [
                //spikeDown 0
                270,
                //spikeDown
                //1   2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25    26    27    28    29    30    31    32    33
                290, 320, 350, 380, 410, 440, 470, 500, 530, 560, 590, 620, 650, 680, 710, 740, 770, 800, 830, 860, 890, 920, 950, 980, 1010, 1040, 1070, 1100, 1130, 1160, 1190, 1220, 1250,
            ];

            drawSpikeYDown = [
                //spikeDown 0
                530,
                //spikeDown 
                //1   2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26   27   28   29   30   31   32   33
                180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180,
            ];

            drawSpikeXRight = [
                //spikeRight 0
                120
            ];

            drawSpikeYRight = [
                //spikeRight 0
                240
            ];


            // draw apple
            drawAppleWidth = [
                //apple 3 4 5 6 7
                20, 20, 20, 20, 20,
                // 8 9 10, 11, 12
                20, 20, 20, 20, 20
            ];
            drawAppleHeight = [
                //apple 3 4 5 6 7
                20, 20, 20, 20, 20,
                // 8 9 10, 11, 12
                20, 20, 20, 20, 20
            ];
            drawAppleX = [
                // apple 3 4 5 6 7 
                660, 705, 770, 790, 820,
                // 8 9 10 11 12
                905, 870, 920, 985, 1040
            ];
            drawAppleY = [
                //apple 3 4 5 6 7
                565, 540, 585, 540, 570,
                // 8 9 10 11 12
                580, 545, 530, 540, 565
            ];


            //decor
            treeX = [680, 790, 900, 1010];
            treeY = 580;
            treeWidth = 20;
            treeHeight = 80;

            treeLeavesY = 565;
            treeLeavesW = 80;
            treeLeavesH = 80;
            treeLeavesX = [690, 800, 910, 1020];

            trapTriggered1 = false;
            trapTriggered2 = false;
            apple3 = false;
            apple4 = false;
            apple5 = false;
            apple6 = false;
            apple7 = false;
            apple8 = false;
            apple9 = false;
            apple10 = false;
            apple11 = false;
            apple12 = false;
            miniSpike = false;
            spikeWall = false;
            timer = 100;
            beweegPlatform = false;
            kill20Up = false;
            kill20Right = false;
            kill22L = false;
            move22 = true;
            timer2 = 100;

            break;
        case 2:

            // player
            spelerX = 10;
            spelerY = 115;
            bulletX = spelerX;
            bulletY = spelerY;

            //platforms
            platX = [0, 0];
            platY = [660, 165];
            platWidth = [1290, 30];
            platHeight = [60, 30];

            //walls
            wallX = [-30, 90, 1280];
            wallY = [0, 0, 0];
            wallWidth = [30, 30, 30];
            wallHeight = [800, 480, 250];

            //enemy
            enemyHealth = 105;
            enemyX = 1050;
            enemyY = 470;
            enemyW = 200;
            enemyH = 200;

            killX = [30, enemyX, 1150, 1150, 1150, 1150, 1150];
            killY = [169, enemyY, 550, 570, 590, 610, 630];
            killWidth = [30, enemyW, 20, 20, 20, 20, 20];
            killHeight = [26, enemyH, 20, 20, 20, 20, 20];

            //draw spike
            drawSpikeWidth = 30;
            drawSpikeHeight = 30;
            //spikeUp
            drawSpikeXUp = [30
            ];
            drawSpikeYUp = [165
            ];
            //spikeLeft
            drawSpikeXLeft = [
            ];
            drawSpikeYLeft = [
            ];
            //spikeDown
            drawSpikeXDown = [
            ];
            drawSpikeYDown = [
            ];

            // draw apple
            drawAppleWidth = [
            ];
            drawAppleHeight = [];
            drawAppleX = [
            ];
            drawAppleY = [
            ];

            treeX = [0];
            treeY = 0;
            treeWidth = 0;
            treeHeight = 0;

            treeLeavesY = 0;
            treeLeavesW = 0;
            treeLeavesH = 0;
            treeLeavesX = 0;

            trapTriggered1 = false;
            trapTriggered2 = false;
            break;


        default:
            break;
    }
}