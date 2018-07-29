use consts::{Action, ActionType, Direction, Position};
use player::Agent;

mod internals;
mod assam;
mod rug;

use self::assam::Assam;

use player::Player;

#[derive(Debug)]
pub struct Game<'a> {
  action_type: ActionType,
  assam: Assam,
  players: &'a[&'a Player],
  players_count: u32,
  remaining_rugs: u32
}

impl<'a> Game<'a> {
  pub fn new(players: &'a [&'a Player]) -> Self {
    info!("create new game");

    Game {
      action_type: ActionType::ORIENT_ASSAM,
      assam: Assam::new(),
      players_count: players.len() as u32,
      players,
      remaining_rugs: 16,
    }
  }

  pub fn is_over(self: &Self) -> bool {
    self.remaining_rugs == 0
  }

  pub fn show_game(self: &Self) {
    debug!("r_rugs: {}", self.remaining_rugs);
  }
  // pub fn is_won(self: &Self, player: &Player) -> Boolean
  // pub fn is_lost(self: &Self, player: &Player) -> Boolean
  // pub fn winner(self: &Self) -> Option<&Player>
  // pub fn draw(self: &Self)

  pub fn play(self: &mut Self) {
    let mut i = 0;
    self.show_game();
    while !self.is_over() {
      let player = self.players[i];
      self.next_step(player);
      i += 1;
      i = i % (self.players_count as usize);
    }
  }

  pub fn next_step(self: &mut Self, player: &Player) {
    let actions = self.get_actions(player);
    let action = player.get_action(actions.as_slice(), self);

    self.take_action(&action);
  }

  pub fn get_actions(self: &Self, player: &Player) -> Vec<Action> {
    match self.action_type {
      ActionType::ORIENT_ASSAM => self.assam.get_orient_actions(),
      ActionType::LAY_RUG => self.assam.get_orient_actions(),
    }
  }

  // fn get_lay_rug_actions(self: &Self) -> Vec<Action>  {
  //   self::internals::get_free_rug_spots(self)
  // }

  pub fn take_action(self: &mut Self, action: &Action) {
    match *action {
      Action::OrientAssam(ref direction) => self.orient_assam(*direction),
      _ => (),
    }
  }

  pub fn orient_assam(self: &mut Self, direction: Direction) {
    debug!("dir: {:?}, r_rugs: {:?}", self.assam.get_direction(), self.remaining_rugs);
    self.assam.orient(direction);
    self.action_type = ActionType::ORIENT_ASSAM;
    self.remaining_rugs = self.remaining_rugs - 1;
  }
}

#[cfg(test)]
mod tests {
  // use consts::Action;

  #[test]
  fn init_game() {
    let agent1 = Box::new(::player::RandomAgent::new());
    let agent2 = Box::new(::player::RandomAgent::new());

    // let player1 = super::Player::new(0, agent1);
    // let player2 = super::Player::new(0, agent2);

    let players = [
      &super::Player::new(0, agent1),
      &super::Player::new(0, agent2)
    ];

    let mut game = super::Game::new(&players);

    game.play();

    // assert_eq!(player1, true);
    assert_eq!(game.is_over(), true);
    // assert_eq!(game.remaining_rugs, 16);
    // assert_eq!(game.assam.direction, ::Direction::U);
    // assert_eq!(actions[0], Action::OrientAssam(super::consts::Direction::R));
  }
}

