from ctypes import *

lib = cdll.LoadLibrary('../core/logic_ffi/target/debug/liblogic_ffi.so')
double_input = lib.c_hello
double_input.restype = c_char_p

input = 4
output = double_input()

print(output)