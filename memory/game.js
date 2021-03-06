var ac = [
  "cat_1.jpeg",
  "cat_2.jpeg",
  "cat_3.jpeg",
  "cat_4.jpeg",
  "cat_5.jpeg",
  "cat_6.jpeg",
  "cat_7.jpeg",
  "cat_8.jpeg",
  "cat_1.jpeg",
  "cat_2.jpeg",
  "cat_3.jpeg",
  "cat_4.jpeg",
  "cat_5.jpeg",
  "cat_6.jpeg",
  "cat_7.jpeg",
  "cat_8.jpeg"
]

var r = /\d+/

function create_game() {
  return {
    state : null,
    number_of_moves : 0,
    flipped_card : null,
    flipped_cards : [],
    total_flipped_cards : 0,
    board : ac
  }
}

function shuffle_array(arr) {
  for (var i = 0; i < 16; ++i) {
    var n_i = Math.floor((Math.random() * 16))
    var tmp = arr[n_i];
    arr[n_i] = arr[i];
    arr[i] = tmp;
  }
}

function start_game(game_state) {
  game_state.state = "time_to_flip"
  shuffle_array(game_state.board)

  document.addEventListener("DOMContentLoaded", function(ev) {
    // set up init anim
    for (let i = 0; i < 16; ++i) {
      const el = document.getElementById(i.toString())
      el.className += "spawn"
      setTimeout(function() {
        el.className += " scale"
      }, (i * 100))
    }
  })

}

function flip_card(game_state, id) {
    
  var img = document.getElementById(id.toString())
  console.log(img.src);
  if (!img.src.endsWith("dog.jpg")) return;
  if (game_state.in_trans) return;

  if (game_state.state == "time_to_flip") {

    game_state.state = "time_to_match"
    game_state.flipped_card = id 
    game_state.number_of_moves++
    game_state.in_trans = true
    
    img.className = "flip"
    setTimeout(function() {
      img.src = "img/" + game_state.board[id]
    }, 250)
    setTimeout(function() {
      game_state.in_trans = false
      img.className = ""
    }, 500)

    game_state.flipped_cards[0] = id
    console.log("[time_to_flip -> time_to_match] id: " + id)

  } else if (game_state.state == "time_to_match") {

    if (game_state.board[game_state.flipped_card] == game_state.board[id]) {
      // WE MATCH
      game_state.flipped_cards = []
      game_state.in_trans = true
      img.className = "flip"
      setTimeout(function() {
        img.src = "img/" + game_state.board[id]
      }, 250)
      setTimeout(function() {
        game_state.in_trans = false
        img.className = ""
      }, 500)
      console.log("[time_to_match -> ?] match: " + id)
      game_state.flipped_card = null
      game_state.total_flipped_cards += 1
    } else {
      // WE NO MATCH
      game_state.flipped_cards[1] = id
      game_state.in_trans = true
      img.className = "flip"
      setTimeout(function() {
        img.src = "img/" + game_state.board[id]
      }, 250)
      setTimeout(function() {
        img.className = ""
      }, 500)

      for (var i = 0; i < game_state.flipped_cards.length; ++i) {
        const card = document.getElementById(game_state.flipped_cards[i])
          setTimeout(function() {
            card.className = "flip"
          }, 750)
          setTimeout(function() {
            card.src = "img/dog.jpg"
          }, 1000)
        setTimeout(function() {
          game_state.in_trans = false
          card.className = ""
        }, 1250)
      }
      console.log("[time_to_match - ?] no match: " + id)
      game_state.flipped_card = null
    }

    game_state.number_of_moves++
    console.log("moves : " + game_state.number_of_moves + " correct moves: " + game_state.total_flipped_cards)

    if (game_state.total_flipped_cards == 8) {
      document.getElementById("main").style = "display: none;";
      document.getElementById("won").style = "";
      game_state.state = "game_winrar"
    } else {
      game_state.state = "time_to_flip"
    }

  }

}
