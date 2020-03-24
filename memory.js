var iconList = [
  { icon: "fa-thermometer" },
  { icon: "fa-bicycle" },
  { icon: "fa-instagram" },
  { icon: "fa-snowflake-o" },
  { icon: "fa-bank" },
  { icon: "fa-instagram" },
  { icon: "fa-bank" },
  { icon: "fa-joomla" },
  { icon: "fa-gavel" },
  { icon: "fa-bomb" },
  { icon: "fa-leanpub" },
  { icon: "fa-bath" },
  { icon: "fa-linux" },
  { icon: "fa-bed" },
  { icon: "fa-birthday-cake" },
  { icon: "fa-briefcase" },
  { icon: "fa-beer" },
  { icon: "fa-bus" },
  { icon: "fa-hourglass" },
  { icon: "fa-fighter-jet" },
  { icon: "fa-gift" },
  { icon: "fa-shield" },
  { icon: "fa-recycle" },
  { icon: "fa-shopping-cart" },
  { icon: "fa-plane" },
  { icon: "fa-ship" },
  { icon: "fa-shower" },
  { icon: "fa-spoon" },
  { icon: "fa-trophy" },
  { icon: "fa-umbrella" },
  { icon: "fa-wheelchair" },
  { icon: "fa-trash" },
  { icon: "fa-tree"},
  { icon: "fa-rocket"}
];

var iconListCopy = iconList.slice(0);
var iconArray = iconList.concat(iconListCopy);

// implementation of the Fisher-Yates Shuffle
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array) {
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}


$(document).ready(function () {
  var source = document.getElementById("card-template").innerHTML;
  var template = Handlebars.compile(source);

  // doing a double shuffle
  var context = {
    icons: shuffle( shuffle(iconArray) )
  };

  Handlebars.registerHelper('icon', function () {
    var icon = Handlebars.escapeExpression(this.icon);
    return new Handlebars.SafeString(icon);
  });
  var html = template(context);
  document.getElementById('card-grid').innerHTML = html;

  var stack = [];
  var found = 0;

  $('#flipcards').change(function(){
    if(this.checked){
      $('.flip-card-inner').addClass('flipped');
    }
    else {
      $('.flip-card-inner').removeClass('flipped');
    }
  });
  

  $('.flip-card-inner').click(function () {
      if(stack.length < 2) {
        stack.push($(this));
        $(this).addClass('flipped');
        if (stack.length == 2) {
          if (stack[0].find("i").attr("class") == stack[1].find("i").attr("class")) {
            found += 1;
            $('#score').html(found);
            
          } else {
            var card1 = stack[0];
            var card2 = stack[1];
            setTimeout(function () {
              card1.removeClass('flipped');
              card2.removeClass('flipped');
            }, 1000);
            
          }
          stack = [];
        }
      }
  });
});
