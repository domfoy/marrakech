from ctypes import *

lib = cdll.LoadLibrary('../core/logic_ffi/target/debug/liblogic_ffi.so')
# double_input = lib.c_hello
# double_input.restype = c_char_p

# input = 4
# output = double_input()

# print(output)


def wrap_function(lib, funcname, restype, argtypes):
    """Simplify wrapping ctypes functions"""
    func = lib.__getattr__(funcname)
    func.restype = restype
    func.argtypes = argtypes
    return func

class GameS(Structure):
  # pass
  _fields_ = [
    ("remaining_rugs", c_uint)
  ]

  # def __repr__(self):
  #   return '({0})'.format(self.remaining_rugs)


init_game = wrap_function(lib, 'init_game', POINTER(GameS), None)
destroy_game = wrap_function(lib, 'destroy_game', None, [POINTER(GameS)])
show_game = wrap_function(lib, 'show_game', None, [POINTER(GameS)])
incr_game = wrap_function(lib, 'incr_game', None, [POINTER(GameS)])
get_rugs = wrap_function(lib, 'get_rugs', c_uint, [POINTER(GameS)])

class Game:
  def __init__(self):
    self.obj = lib.init_game()

  def __enter__(self):
    return self

  def __exit__(self, exc_type, exc_value, traceback):
    lib.destroy_game(self.obj)


with Game() as g:
  print(get_rugs(g.obj))
  incr_game(g.obj)
  print(get_rugs(g.obj))

# print(g)
# incr_game(g)
# print(g)
# show_game(g)
