var score = 0;
var tab_scores = [];
var best_score;

var moved_empty;
var merged;

var nb_male;
var nb_female;
var nb_fbis;
// console.log("var nb_fbis: "+nb_fbis);
var move_empty;

function is_empty() {

  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = 1; x <= sizetable; x++)
    {
      var nb = $('[x="' + x + '"][y="' + y + '"]').attr('nbr');
        // console.log(nb);
      if ((nb == 0)) {
        return true;
      }
    }
  }
  return false;
}


function isXleft_movable() {

  var i = 1;
  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = 1; x <= sizetable; x++)
    {
      // console.log("isXleft_movable compt: "+i);
      i++;

      var tdxy = $('[x="' + x + '"][y="' + y + '"]');
      var tile = parseInt(tdxy.attr('nbr'));
      var td_xy = $('[x="' + (x+1) + '"][y="' + y + '"]');
      var tile_xy = parseInt(td_xy.attr('nbr'));

      if (((tile > 0) && (tile_xy == tile)) || ((tile == 0) && (tile_xy > 0)))
        return true;
    }
  }
  return false;
}

function isXleft_movable_r() {

  var i = 1;
  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = 1; x <= sizetable; x++)
    {
      // console.log("isXleft_movable compt: "+i);
      i++;

      var tdxy = $('[x="' + x + '"][y="' + y + '"]');
      var tile = parseInt(tdxy.attr('nbr'));
      var td_xy = $('[x="' + (x+1) + '"][y="' + y + '"]');
      var tile_xy = parseInt(td_xy.attr('nbr'));

      if (((tile > 0) && (tile_xy == tile)) || ((tile == 0) && (tile_xy > 0)))
        return true;
    }
  }
  return false;
}

function isXright_movable() {

  var i = 1;
  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = sizetable; x >= 1; x--)
    {
      // console.log("is_movable compt: "+i);
      i++;

      var tdxy = $('[x="' + x + '"][y="' + y + '"]');
      var tile = parseInt(tdxy.attr('nbr'));
      var td_xy = $('[x="' + (x-1) + '"][y="' + y + '"]');
      var tile_xy = parseInt(td_xy.attr('nbr'));

      if (((tile > 0) && (tile_xy == tile)) || ((tile == 0) && (tile_xy > 0)))
        return true;
    }
  }
  return false;
}

function isYup_movable() {

  var i = 1;
  for (var x = 1; x <= sizetable; x++)
  {
    for (var y = 1; y <= sizetable; y++)
    {
      // console.log("is_movable compt: "+i);
      i++;

      var tdxy = $('[x="' + x + '"][y="' + y + '"]');
      var tile = parseInt(tdxy.attr('nbr'));
      var td_xy = $('[x="' + x + '"][y="' + (y+1) + '"]');
      var tile_xy = parseInt(td_xy.attr('nbr'));

      if (((tile > 0) && (tile_xy == tile)) || ((tile == 0) && (tile_xy > 0)))
        return true;
    }
  }
  return false;
}

function isYdown_movable() {
  console.log(sizetable);
  i = 1;
  for (var x = 1; x <= sizetable; x++)
  {
    for (var y = sizetable; y >= 1; y--)
    {
      // console.log("is_movable compt: "+i);
      i++;

      var tdxy = $('[x="' + x + '"][y="' + y + '"]');
      var tile = parseInt(tdxy.attr('nbr'));
      var td_xy = $('[x="' + x + '"][y="' + (y-1) + '"]');
      var tile_xy = parseInt(td_xy.attr('nbr'));

      if (((tile > 0) && (tile_xy == tile)) || ((tile == 0) && (tile_xy > 0)))
        return true;
    }
  }
  return false;
}

function is_movable() {
  if (is_empty() || isYdown_movable() || isYup_movable() || isXright_movable() || isXleft_movable()) {
      return true;
  }
  else
    return false;
}



function left_mergeable(y) {

  for (var x = 1; x <= sizetable; x++)
  {
    var tdxy = $('[x="' + x + '"][y="' + y + '"]');
    var nb_male = parseInt(tdxy.attr('nbr'));
    // console.log("left_mergeable nb_male: "+nb_male);
    var left = $('[x="' + (x - 1) + '"][y="' + y + '"]');
    var nb_f_left = parseInt(left.attr('nbr'));

    if ((nb_male > 0) && (nb_male == nb_f_left)) {
      return true;
    }
  }
  return false;
}







function merge_left(y) {
  var i = 0;
  for (var x = 1; x <= (sizetable -i); x++)
  {
    var tdxy = $('[x="' + x + '"][y="' + y + '"]');
    var tile = parseInt(tdxy.attr('nbr'));
    var td_xy = $('[x="' + (x+1) + '"][y="' + y + '"]');
    var tile_xy = parseInt(td_xy.attr('nbr'));

    if ((tile > 0) && (tile_xy == tile)) {
      tile = parseInt(tile_xy + tile);
      tdxy.attr('nbr', tile).text(tile);

      for (var line = x; line <= (sizetable -x); line++) {
        // console.log("tile == O")
        var tdxybis = $('[x="' + line + '"][y="' + y + '"]');
        var tilebis = parseInt(tdxybis.attr('nbr'));
        var td_xybis = $('[x="' + (line+1) + '"][y="' + y + '"]');
        var tile_xybis = parseInt(td_xybis.attr('nbr'));

        if (line == sizetable)
          $('[x="' + line + '"][y="' + y + '"]').attr("nbr", 0);
        else
          $('[x="' + line + '"][y="' + y + '"]').attr("nbr", tile_xybis);
        i++;
      }
    }
  }
}


function empty_left(y) {
  var i = 0;
  for (var x = 1; x <= (sizetable -i); x++)
  {
    var tdxy = $('[x="' + x + '"][y="' + y + '"]');
    var tile = parseInt(tdxy.attr('nbr'));
    var td_xy = $('[x="' + (x+1) + '"][y="' + y + '"]');
    var tile_xy = parseInt(td_xy.attr('nbr'));

    if ((tile == 0) && (tile_xy > 0)) {

      for (var line = x; line <= (sizetable -x); line++) {
        // console.log("tile == O")
        var tdxybis = $('[x="' + line + '"][y="' + y + '"]');
        var tilebis = parseInt(tdxybis.attr('nbr'));
        var td_xybis = $('[x="' + (line+1) + '"][y="' + y + '"]');
        var tile_xybis = parseInt(td_xybis.attr('nbr'));

        if (line == sizetable)
          $('[x="' + line + '"][y="' + y + '"]').attr("nbr", 0);
        else
          $('[x="' + line + '"][y="' + y + '"]').attr("nbr", tile_xybis);
        i++;
      }
    }
  }
}



function Xleft() {
  
  var i = 1;
  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = 1; x <= sizetable; x++)
    {
      // console.log("Xleft compt: "+i);
      i++;

      // left_empty(y);
      // empty_left(y);
      // merge_left(y);
      // empty_left(y);


      var tile_merged;

      left_empty(y);

      var tdxy = $('[x="' + x + '"][y="' + y + '"]');
      var tile = parseInt(tdxy.attr('nbr'));
      var td_xy = $('[x="' + (x + 1) + '"][y="' + y + '"]');
      var tile_xy = parseInt(td_xy.attr('nbr'));

      console.log("tile: "+tile);
      if ((tile > 0) && (tile_xy == tile)) {
        var tile_merged = parseInt(tile + tile_xy);
        console.log("Xleft tile_merged: "+tile_merged);

        tdxy.attr('nbr', tile_merged).text(tile_merged);
        td_xy.attr('nbr', 0).text("");
        this.score += parseInt(tile_merged);
        left_empty(y);
      }

      // if (moved_empty) {
      //   console.log("moved_empty (true)");
      //   if ((tile > 0) && (tile_xy == tile)) {
      //     tile_merged = parseInt(tile + tile_xy);

      //     tdxy.attr('nbr', tile_merged).text(tile_merged);
      //     td_xy.attr('nbr', 0).text("");
      //     left_empty(y);
      //   }
      // }





      // tdxy = $('[x="' + x + '"][y="' + y + '"]');
      // nb_male = parseInt(tdxy.attr('nbr'));
      // // console.log("nb_male: "+nb_male);
      // td_xy = $('[x="' + (x - 1) + '"][y="' + y + '"]');
      // nb_female = parseInt(td_xy.attr('nbr'));
      // nb_fbis = nb_female;
      // // console.log("nb_female: "+nb_female);

      // var was_couple = left_mergeable(y);
      // // console.log("was_couple: "+was_couple);
      
      // if ((nb_male > 0) && (nb_male == nb_female)) {
      //   var nb_baby = parseInt(nb_male + nb_female);
      //   // console.log("nb_baby: "+nb_baby);

      //   td_xy.attr('nbr', nb_baby).text(nb_baby);
      //   tdxy.attr('nbr', 0).text("");
      // }
      // if (was_couple == false)
      //   noXleft_empty();
    }
  }
}

// Game over : pb movable again

function left_empty(y) {
  this.moved_empty = false;
  // i = 1;
  // while (i <= (sizetable -2)) {
    for (var box = 1; box <= sizetable; box++)
    {
      // console.log("after_moved_empty compt: "+i);

      var tdxy = $('[x="' + box + '"][y="' + y + '"]');
      var tile = parseInt(tdxy.attr('nbr'));
      var td_xy = $('[x="' + (box + 1) + '"][y="' + y + '"]');
      var tile_xy = parseInt(td_xy.attr('nbr'));

      for (j = 1; j <= (sizetable - box); j++) {
        if ((tile == 0) && (tile_xy > 0)) {
          tdxy.attr('nbr', tile_xy).text(tile_xy);
          td_xy.attr('nbr', 0).text("");
          this.moved_empty = true;
        }
      }
    // }
    // i++;
  }
}

function noXleft_empty() {
  this.move_empty = false;
  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = 1; x <= sizetable; x++)
    {
      // console.log("no_empty");

      var tdxy = $('[x="' + x + '"][y="' + y + '"]');
      var nb_male = parseInt(tdxy.attr('nbr'));
      // console.log("nb_male: "+nb_male);
      var td_xy = $('[x="' + (x - 1) + '"][y="' + y + '"]');
      var nb_female = parseInt(td_xy.attr('nbr'));
      // console.log("nb_female: "+nb_female);

      if ((nb_male > 0) && (nb_female === 0)) {
        td_xy.attr('nbr', nb_male).text(nb_male);
        tdxy.attr('nbr', 0).text("");
        this.move_empty = true;
      }
    }
  }
}


function Xright() {

  i = 1;
  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = sizetable; x >= 1; x--)
    {
      // console.log("Xright compt: "+i);
      i++;

      tdxy = $('[x="' + x + '"][y="' + y + '"]');
      nb_male = parseInt(tdxy.attr('nbr'));
      // console.log("nb_male: "+nb_male);
      td_xy = $('[x="' + (x + 1) + '"][y="' + y + '"]');
      nb_female = parseInt(td_xy.attr('nbr'));
      // console.log("nb_female: "+nb_female);

      if ((nb_male > 0) && (nb_male == nb_female)) {
        var nb_baby = parseInt(nb_male + nb_female);
        // console.log("nb_baby: "+nb_baby);

        td_xy.attr('nbr', nb_baby).text(nb_baby);
        tdxy.attr('nbr', 0).text("");
        this.score += parseInt(nb_baby);
      }
      noXright_empty();
    }
  }
}


function noXright_empty() {
    move_empty = false;
  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = sizetable; x >= 1; x--)
    {
      // console.log("no_empty");

      tdxy = $('[x="' + x + '"][y="' + y + '"]');
      nb_male = parseInt(tdxy.attr('nbr'));
      // console.log("nb_male: "+nb_male);
      td_xy = $('[x="' + (x + 1) + '"][y="' + y + '"]');
      nb_female = parseInt(td_xy.attr('nbr'));
      // console.log("nb_female: "+nb_female);

      if ((nb_male > 0) && (nb_female == 0)) {
        td_xy.attr('nbr', nb_male).text(nb_male);
        tdxy.attr('nbr', 0).text("");
        move_empty = true;
      }
    }
  }
}


function Yup() {

  this.string += event['key'].slice(-42);
  var str = string.slice(-16);
  // console.log(str);
  if (str == "ArrowLeftArrowUp") {
    i = 1;
    for (var x = sizetable; x >= 1; x--)
    {
      for (var y = 1; y <= sizetable; y++)
      {
        console.log("Yup left up"+i);
        i++;

        tdxy = $('[x="' + x + '"][y="' + y + '"]');
        nb_male = parseInt(tdxy.attr('nbr'));
        // console.log("nb_male: "+nb_male);
        td_xy = $('[x="' + x + '"][y="' + (y + 1) + '"]');
        nb_female = parseInt(td_xy.attr('nbr'));
        // console.log("nb_female: "+nb_female);

        if ((nb_male > 0) && (nb_male == nb_female)) {
          var nb_baby = parseInt(nb_male + nb_female);
          // console.log("nb_baby: "+nb_baby);

          td_xy.attr('nbr', nb_baby).text(nb_baby);
          tdxy.attr('nbr', 0).text("");
          this.score += parseInt(nb_baby);
        }
        noYup_empty_r();
      }
    }
  }

  else {
    j = 1;
    for (var x = 1; x <= sizetable; x++)
    {
      for (var y = 1; y <= sizetable; y++)
      {
        // console.log("Yup compt: "+i);
        j++;

        tdxy = $('[x="' + x + '"][y="' + y + '"]');
        nb_male = parseInt(tdxy.attr('nbr'));
        // console.log("nb_male: "+nb_male);
        td_xy = $('[x="' + x + '"][y="' + (y - 1) + '"]');
        nb_female = parseInt(td_xy.attr('nbr'));
        // console.log("nb_female: "+nb_female);

        if ((nb_male > 0) && (nb_male == nb_female)) {
          var nb_baby = parseInt(nb_male + nb_female);
          // console.log("nb_baby: "+nb_baby);

          td_xy.attr('nbr', nb_baby).text(nb_baby);
          tdxy.attr('nbr', 0).text("");
          this.score += parseInt(nb_baby);
        }
        noYup_empty();
      }
    }
  }
}

function noYup_empty_r() {
  move_empty = false;
  for (var x = sizetable; x >= 1; x--)
  {
    for (var y = 1; y <= sizetable; y++)
    {
      // console.log("no_empty");

      tdxy = $('[x="' + x + '"][y="' + y + '"]');
      nb_male = parseInt(tdxy.attr('nbr'));
      // console.log("nb_male: "+nb_male);
      td_xy = $('[x="' + x + '"][y="' + (y - 1) + '"]');;
      nb_female = parseInt(td_xy.attr('nbr'));
      // console.log("nb_female: "+nb_female);

      if ((nb_male > 0) && (nb_female == 0)) {
        td_xy.attr('nbr', nb_male).text(nb_male);
        tdxy.attr('nbr', 0).text("");
        move_empty = true;
      }
    }
  }
}

function noYup_empty() {
  move_empty = false;
  for (var x = 1; x <= sizetable; x++)
  {
    for (var y = 1; y <= sizetable; y++)
    {
      // console.log("no_empty");

      tdxy = $('[x="' + x + '"][y="' + y + '"]');
      nb_male = parseInt(tdxy.attr('nbr'));
      // console.log("nb_male: "+nb_male);
      td_xy = $('[x="' + x + '"][y="' + (y - 1) + '"]');;
      nb_female = parseInt(td_xy.attr('nbr'));
      // console.log("nb_female: "+nb_female);

      if ((nb_male > 0) && (nb_female == 0)) {
        td_xy.attr('nbr', nb_male).text(nb_male);
        tdxy.attr('nbr', 0).text("");
        move_empty = true;
      }
    }
  }
}

function Ydown() {

  // i = 1;
  // for (var x = sizetable; x >= 1; x--)
  // {
  //   for (var y = sizetable; y >= 1; y--)
  //   {
  //     // console.log("Ydown compt: "+i);
  //     i++;

  //     tdxy = $('[x="' + x + '"][y="' + y + '"]');
  //     nb_male = parseInt(tdxy.attr('nbr'));
  //     // console.log("nb_male: "+nb_male);
  //     td_xy = $('[x="' + x + '"][y="' + (y + 1) + '"]');
  //     nb_female = parseInt(td_xy.attr('nbr'));
  //     // console.log("nb_female: "+nb_female);

  //     if ((nb_male > 0) && (nb_male == nb_female)) {
  //       var nb_baby = parseInt(nb_male + nb_female);
  //       // console.log("nb_baby: "+nb_baby);

  //       td_xy.attr('nbr', nb_baby).text(nb_baby);
  //       tdxy.attr('nbr', 0).text("");
          // this.score += parseInt(nb_baby);
  //     }
  //     noYdown_empty();
  //   }
  // }

  j = 1;
  for (var x = 1; x <= sizetable; x++)
  {
    for (var y = sizetable; y >= 1; y--)
    {
      // console.log("Ydown compt: "+i);
      j++;

      tdxy2 = $('[x="' + x + '"][y="' + y + '"]');
      nb_male2 = parseInt(tdxy2.attr('nbr'));
      // console.log("nb_male: "+nb_male);
      td_xy2 = $('[x="' + x + '"][y="' + (y + 1) + '"]');
      nb_female2 = parseInt(td_xy2.attr('nbr'));
      // console.log("nb_female: "+nb_female);

      if ((nb_male2 > 0) && (nb_male2 == nb_female2)) {
        var nb_baby2 = parseInt(nb_male2 + nb_female2);
        // console.log("nb_baby: "+nb_baby);

        td_xy2.attr('nbr', nb_baby2).text(nb_baby2);
        tdxy2.attr('nbr', 0).text("");
        this.score += parseInt(nb_baby);
      }
      noYdown_empty2();
    }
  }
}

function noYdown_empty() {

  for (var x = sizetable; x >= 1; x--)
  {
    for (var y = sizetable; y >= 1; y--)
    {
      // console.log("no_empty");

      tdxy = $('[x="' + x + '"][y="' + y + '"]');
      nb_male = parseInt(tdxy.attr('nbr'));
      // console.log("nb_male: "+nb_male);
      td_xy = $('[x="' + x + '"][y="' + (y - 1) + '"]');
      nb_female = parseInt(td_xy.attr('nbr'));
      // console.log("nb_female: "+nb_female);

      if ((nb_male > 0) && (nb_female == 0)) {
        td_xy.attr('nbr', nb_male).text(nb_male);
        tdxy.attr('nbr', 0).text("");
      }
    }
  }
}

function noYdown_empty2() {

  for (var x = 1; x <= sizetable; x++)
  {
    for (var y = sizetable; y >= 1; y--)
    {
      // console.log("no_empty");

      tdxy = $('[x="' + x + '"][y="' + y + '"]');
      nb_male = parseInt(tdxy.attr('nbr'));
      // console.log("nb_male: "+nb_male);
      td_xy = $('[x="' + x + '"][y="' + (y + 1) + '"]');
      nb_female = parseInt(td_xy.attr('nbr'));
      // console.log("nb_female: "+nb_female);

      if ((nb_male > 0) && (nb_female == 0)) {
        td_xy.attr('nbr', nb_male).text(nb_male);
        tdxy.attr('nbr', 0).text("");
      }
    }
  }
}

function add_class(cheat = 1) {
  // var cheat = this.cheat || 1;

  for (var x = 1; x <= sizetable; x++)
  {
    for (var y = 1; y <= sizetable; y++)
    {
      tdxy = $('[x="' + x + '"][y="' + y + '"]');
      tile = parseInt(tdxy.attr('nbr'));
      var nbr = parseInt(tile * cheat);

      if (nbr <= 2048) {
        tdxy.removeClass();
        var class_added = tdxy.addClass('class_'+nbr);
        console.log("class added: "+class_added);
        var text_rm = tdxy.text("");
      }
      if (nbr == 0) {
        tdxy.removeClass();
      }
    }
  }
}


var cheat = "codeandcheat";
var string = "";
var icheat = 0;

function cheatmode(keydown, multiple = 4) {
  // // document.addEventListener('keydown', function(e) {
  // $(document).ready(function() {
  //   $(this).on({
  //     keydown: function(e) {
      
        this.string += event['key'].slice(-42);
        var strcode = string.slice(-12);
        console.log("code: "+strcode);

        if (strcode == cheat) {
          if (icheat == 0) {
            add_class(multiple);
            alert("YOU CHEAT !");
          }
          if (icheat == 1) {
            add_class(multiple * 2);
            alert("You cheat a second time !");
          }
          if (icheat == 2) {
            add_class(multiple * 8);
            alert("DAMN YOU CHEATER PRO !");
          }
          if (icheat >= 3) {
            alert("You're banned of cheat now...");
          }
          this.icheat++;
        }
      }
//     });
//   });
// }


var saved_tab = [];

function saving() {

  for (var y = 1; y <= sizetable; y++)
  {
    for (var x = 1; x <= sizetable; x++)
    {
      var nb = $('[x="' + x + '"][y="' + y + '"]').attr('nbr');
      if (nb > 0) {
        var saved_boxes = $('[x="' + x + '"][y="' + y + '"]');
        this.saved_tab = {saved_tab, saved_boxes};
        console.log(saved_tab);
      }
    }
  }
}


function game_over() {
    alert("Game Over !");
}

function new_game() {
  this.tab_scores.push(this.score);
  this.score = 0;
  $('.score').text("Score : "+0);
  $('.Games').empty();
  $('.Games').game2048();
}