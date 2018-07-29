use consts::{Direction, Position};

#[derive(PartialEq, Clone, Debug)]
pub enum Action {
  OrientAssam(Direction),
  LayRug {
    pos1: Position,
    pos2: Position,
  },
}

#[derive(PartialEq, Clone, Debug)]
pub enum ActionType {
  ORIENT_ASSAM,
  LAY_RUG
}