use consts::Direction;

#[derive(PartialEq, Clone, Debug)]
pub enum Action {
  OrientAssam(Direction)
}