extern crate std;

use ::consts::Action;
use ::game::Game;

pub trait Agent: std::fmt::Debug {
  fn get_action(self: &Self, actions: &[Action], game: &Game) -> Action;
}