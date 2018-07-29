// extern crate rand;

// use self::rand::Rng;

use consts::Action;
use game::Game;

mod agent;
mod random_agent;

// use game::Game;
pub use self::agent::Agent;
pub use self::random_agent::RandomAgent;

#[derive(Debug)]
pub struct Player {
  index: u8,
  agent: Box<Agent>
}

impl Player {
  pub fn new(index: u8, agent: Box<Agent>) -> Self {
    Player {
      index,
      agent
    }
  }
}

impl Agent for Player {
  fn get_action(self: &Self, actions: &[Action], game: &Game) -> Action {
    self.agent.get_action(actions, game)
  }
}

