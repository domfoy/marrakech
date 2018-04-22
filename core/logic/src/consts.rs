

#[derive(Debug, PartialEq, Clone, Copy, FromPrimitive)]
pub enum Direction {
  R = 0,
  U = 1,
  L = 2,
  D = 3
}

#[derive(Debug, PartialEq)]
pub enum ActionType {
  ORIENT_ASSAM,
  // LAY_RUG
}