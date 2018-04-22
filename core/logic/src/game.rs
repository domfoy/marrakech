use num;

use consts;
use player::Player;
use action::Action;

#[derive(Debug)]
pub struct Game1 {
  pub remaining_rugs: u32
}
pub struct Game {
  remaining_rugs: u32,
  assam: Assam,
  action_type: consts::ActionType
}

pub struct Assam {
  direction: consts::Direction,
  position: [i8; 2]
}

impl Assam {
  pub fn new() -> Self {
    Assam {
      direction: consts::Direction::U,
      position: [0, 0]
    }
  }
}

impl Game1 {
  pub fn new() -> Self {
    Game1{remaining_rugs: 16}
  }
  pub fn show_game(self: &Self) {
    format!("hello {}", self.remaining_rugs);
  }
}

impl Game {
  // pub fn is_over(self: &Self) -> Boolean
  // pub fn is_won(self: &Self, player: &Player) -> Boolean
  // pub fn is_lost(self: &Self, player: &Player) -> Boolean
  // pub fn winner(self: &Self) -> Option<&Player>
  // pub fn draw(self: &Self)

  // pub fn play(self: &Self, players: &mut[Player]) {

  // }
  // pub fn next_step(self: &Self, players: &Player)
  pub fn get_actions(self: &Self, player: &Player) -> Vec<Action> {
    match self.action_type {
      consts::ActionType::ORIENT_ASSAM => self.get_orient_assam_actions(),
      _ => vec![]
    }
  }

  fn get_orient_assam_actions(self: &Self) -> Vec<Action>  {
    let origin = self.assam.direction as u8;

    let direction = num::FromPrimitive::from_u8(origin).unwrap();

    vec![Action::OrientAssam(direction)]
  }
  // pub fn take_action(action: &Action, player: &Player) {

  // }

  pub fn new() -> Self {
    Game {
      remaining_rugs: 16,
      assam: Assam::new(),
      action_type: consts::ActionType::ORIENT_ASSAM
    }
  }
}

#[cfg(test)]
mod tests {
  use action::Action;

  #[test]
  fn init_game() {
    let agent = ::player::RandomAgent::new();

    let player = super::Player::new(0, Box::new(agent));

    let game = super::Game::new();

    let actions = game.get_actions(&player);

    // assert_eq!(2 + 2, 4);
    // assert_eq!(game.remaining_rugs, 16);
    // assert_eq!(game.assam.direction, ::consts::Direction::U);
    assert_eq!(actions[0], Action::OrientAssam(::consts::Direction::U));
  }
}

