extern crate rand;

use self::rand::Rng;

use action::Action;
use game::Game;


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
  pub fn get_action(self: &Self, actions: &[Action], game: &Game) -> Action {
    self.agent.get_action(actions, game)
  }
}

pub trait Agent {
  fn get_action(self: &Self, actions: &[Action], game: &Game) -> Action;
}

pub struct RandomAgent {
  rng: rand::ThreadRng
}

impl RandomAgent {
  pub fn new() -> RandomAgent {
    let rng = rand::thread_rng();

    RandomAgent {
      rng
    }
  }
}

impl Agent for RandomAgent {
  fn get_action(self: &Self, actions: &[Action], game: &Game) -> Action {
    // let r = self.rng.gen_range();
    actions[0].clone()
  }
}

#[cfg(test)]
mod tests {
  #[test]
  fn init_player() {
    let agent = super::RandomAgent::new();

    let player = super::Player::new(0, Box::new(agent));
  }
}