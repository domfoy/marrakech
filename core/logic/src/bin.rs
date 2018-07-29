#[macro_use] extern crate log;
extern crate env_logger;
extern crate logic;

use logic::game::Game;
use logic::player;

fn main() {
  env_logger::init();
  info!("logger initialized");

  let agent1 = Box::new(player::RandomAgent::new());
  let agent2 = Box::new(player::RandomAgent::new());

  let players = [
    &player::Player::new(0, agent1),
    &player::Player::new(0, agent2)
  ];

  let mut game = Game::new(&players);

  game.play();
}