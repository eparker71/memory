'use strict';

var d = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var iconList = []

for(var i=0; i < d.length;i++){
    var iconStr = '<span class="icon thing" data-value="'+i+'">'+d[i]+'</span>';
    var iconObj = { icon: iconStr};
    iconList.push(iconObj);
}
for(var i=0; i < d.length;i++){
    var iconStr = '<span class="icon thing" data-value="'+i+'">'+d[i].toLowerCase()+'</span>';
    var iconObj = { icon: iconStr};
    iconList.push(iconObj);
}


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

    var html = buildCardGrid(iconList);
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
                var spanElem = $(this).find("span.icon").first();
                var value = spanElem[0].dataset.value;
                if (!foundpairs.includes(value)) {
                    $(this).removeClass('flipped');
                }
            });
        }
    });


    $('.flip-card-inner').click(function () {
        var spanElem = $(this).find("span.icon").first();
        var spanId = spanElem.attr("id");
        var value = spanElem[0].dataset.value;
        if (!foundpairs.includes(value)) {
            if (!clicked.includes(spanId)) {
                if (stack.length < 2) {
                    stack.push($(this));
                    clicked.push(spanId);
                    $(this).addClass('flipped');
                    if (stack.length == 2) {
                        var prevElem = stack[0].find("span.icon").first();
                        var prevValue = prevElem[0].dataset.value;
                        if (prevValue == value) {
                            found += 1;
                            foundpairs.push(value);
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