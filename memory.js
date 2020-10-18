'use strict';


var iconList = [{
        icon: '<i class="fa fa-thermometer fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-bicycle fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-instagram fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-snowflake-o fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-bank fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-joomla fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-gavel fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-bomb fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-leanpub fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-bath fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-linux fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-bed fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-birthday-cake fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-briefcase fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-beer fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-bus fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-hourglass fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-fighter-jet fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-gift fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-shield fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-recycle fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-shopping-cart fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-plane fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-ship fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-shower fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-spoon fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-trophy fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-umbrella fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-wheelchair fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-trash fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-tree fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-rocket fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-eyedropper fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-eye fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-diamond fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-hashtag fa-2x thing"></i>'
    },
    {
        icon: '<i class="fa fa-life-ring fa-2x thing"></i>'
    }
]


/**
 * 
 * @param {*} iconList 
 */
function selectGameIcons(iconList) {
    var gameBoard = [];
    var randNum;
    var seenList = [];

    while (gameBoard.length < 20) {
        randNum = Math.floor((Math.random() * (iconList.length - 1)) + 1);
        if (!seenList.includes(randNum)) {
            seenList.push(randNum);
            gameBoard.push(iconList[randNum]);
        }
    }
    var gameBoardCopy = gameBoard.slice(0);
    var newBoard = gameBoard.concat(gameBoardCopy);
    return newBoard;
}

/**
 * 
 * @param {string[]} array
 * 
 * implementation of the Fisher-Yates Shuffle
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle 
 */
function shuffle(array) {
    var m = array.length,
        t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

/**
 *
 * @param {*} iconArray 
 */
function buildCardGrid(gameBoard) {

    var source = document.getElementById("card-template").innerHTML;
    var template = Handlebars.compile(source);

    // doing a double shuffle, a single shuffle does
    // not provide enough randomness in the results
    var context = {
        icons: shuffle(shuffle(gameBoard))
    };

    var html = template(context);
    return html;
};


$(document).ready(function () {

    var stack = [];
    var found = 0;
    var foundpairs = [];
    var clicked = [];
    var cards_visible = false;

    var gameBoard = selectGameIcons(iconList);
    var html = buildCardGrid(gameBoard);
    document.getElementById('card-grid').innerHTML = html;

    $('.thing').each(function (index) {
        $(this).attr("id", index);
    });

    $('#flipcards-btn').click(function () {
        if (!cards_visible) {
            cards_visible = true;
            this.innerHTML = "Hide Cards"
            $('.flip-card-inner').addClass('flipped');
        } else {
            cards_visible = false;
            this.innerHTML = "View Cards"
            $('.flip-card-inner').each(function () {
                var id = $(this).find("i").attr("class");
                if (!foundpairs.includes(id)) {
                    $(this).removeClass('flipped');
                }
            });
        }
    });


    $('.flip-card-inner').click(function () {

        var iconId = $(this).find("i").attr("id");
        var iconClass = $(this).find("i").attr("class");

        if (!foundpairs.includes(iconClass)) {
            if (!clicked.includes(iconId)) {
                if (stack.length < 2) {
                    stack.push($(this));
                    clicked.push(iconId);
                    $(this).addClass('flipped');
                    if (stack.length == 2) {
                        var prevIconClass = stack[0].find("i").attr("class");
                        if (prevIconClass == iconClass) {
                            found += 1;
                            foundpairs.push(iconClass);
                            if (found > 1) {
                                $('#score').html(found + " pairs");
                            } else {
                                $('#score').html(found + " pair");
                            }
                        } else {
                            var card1 = stack[0];
                            var card2 = stack[1];
                            setTimeout(function () {
                                card1.removeClass('flipped');
                                card2.removeClass('flipped');
                            }, 1000);
                        }
                        stack = [];
                        clicked = [];
                    }
                }
            }
        }
    });
});