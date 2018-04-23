extern crate logic;

use logic::player::{Player, RandomAgent};
use logic::game::Game;

fn main() {
  let agent = RandomAgent::new();

  let player = Player::new(0, Box::new(agent));

  let mut game = Game::new();

  game.play(&mut [&player]);
}