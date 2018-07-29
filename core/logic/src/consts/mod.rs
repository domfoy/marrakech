pub mod action_type;
pub mod direction;
pub mod position;

pub use self::action_type::{Action, ActionType};
pub use self::direction::{Direction};
pub use self::position::{Position};

pub const BOARD_MAX : i8 = 7;