use num;

use consts::{ActionType, Direction};
use player::Player;
use action::Action;

#[derive(Debug)]
pub struct Game1 {
  pub remaining_rugs: u32
}
pub struct Game {
  remaining_rugs: u32,
  assam: Assam,
  action_type: ActionType
}

pub struct Assam {
  direction: Direction,
  position: [i8; 2]
}

impl Assam {
  pub fn new() -> Self {
    Assam {
      direction: Direction::U,
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
  pub fn is_over(self: &Self) -> bool {
    self.remaining_rugs == 0
  }

  pub fn show_game(self: &Self) {
    println!("hello {}", self.remaining_rugs);
  }
  // pub fn is_won(self: &Self, player: &Player) -> Boolean
  // pub fn is_lost(self: &Self, player: &Player) -> Boolean
  // pub fn winner(self: &Self) -> Option<&Player>
  // pub fn draw(self: &Self)

  pub fn play(self: &mut Self, players: &mut[&Player]) {
    let players_count = players.len();
    let mut i = 0;
    self.show_game();
    while !self.is_over() {
      let player = players[i];
      self.next_step(player);
      i += 1 % players_count;
    }
  }

  pub fn next_step(self: &mut Self, player: &Player) {
    let actions = self.get_actions(player);
    let action = player.get_action(actions.as_slice(), self);

    self.take_action(&action);
  }

  pub fn get_actions(self: &Self, player: &Player) -> Vec<Action> {
    match self.action_type {
      ActionType::ORIENT_ASSAM => self.get_orient_assam_actions(),
    }
  }

  fn get_orient_assam_actions(self: &Self) -> Vec<Action>  {
    let origin = self.assam.direction as u8;

    let mut directions = Vec::with_capacity(3);
    for i in 0..2 {
      directions.push(num::FromPrimitive::from_u8(((origin + 4 - 1 + i) % 4)).unwrap());
    }

    directions
      .into_iter()
      .map(|direction| Action::OrientAssam(direction))
      .collect()
  }

  pub fn take_action(self: &mut Self, action: &Action) {

    match *action {
      Action::OrientAssam(ref direction) => self.orient_assam(*direction),
      _ => (),
    }
  }

  pub fn orient_assam(self: &mut Self, direction: Direction) {
    println!("{:?}, {:?}", self.assam.direction, self.remaining_rugs);
    self.assam.direction = direction;
    self.action_type = ActionType::ORIENT_ASSAM;
    self.remaining_rugs = self.remaining_rugs - 1;

  }

  pub fn new() -> Self {
    Game {
      remaining_rugs: 16,
      assam: Assam::new(),
      action_type: ActionType::ORIENT_ASSAM
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

    let mut game = super::Game::new();

    game.play(&mut [&player]);

    assert_eq!(game.is_over(), true);
    // assert_eq!(game.remaining_rugs, 16);
    // assert_eq!(game.assam.direction, ::Direction::U);
    // assert_eq!(actions[0], Action::OrientAssam(super::consts::Direction::R));
  }
}

