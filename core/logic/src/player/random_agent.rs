extern crate rand;

use player::Agent;
use consts::Action;
use game::Game;

#[derive(Debug)]
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

    let player = ::player::Player::new(0, Box::new(agent));
  }
}