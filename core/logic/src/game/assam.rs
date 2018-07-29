use num;
use consts::Action;
use consts::Direction;
use consts::Position;

#[derive(PartialEq, Clone, Debug)]
pub struct Assam {
  direction: Direction,
  position: Position
}

impl Assam {
  pub fn new() -> Self {
    Assam {
      direction: Direction::U,
      position: Position{x:0, y:0},
    }
  }

  pub fn get_direction(self: &Self) -> Direction {
    self.direction
  }

  pub fn get_orient_actions(self: &Self) -> Vec<Action>  {
    let origin = self.direction as u8;

    let mut directions = Vec::with_capacity(3);
    for i in 0..2 {
      directions.push(num::FromPrimitive::from_u8((origin + 4 - 1 + i) % 4).unwrap());
    }

    directions
      .into_iter()
      .map(|direction| Action::OrientAssam(direction))
      .collect()
  }

  pub fn orient(self: &mut Self, direction: Direction) {
    self.direction = direction;
  }

  pub fn get_position(self: &Self) -> Position {
    self.position
  }
}