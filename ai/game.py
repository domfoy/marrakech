import os
import copy
import time
import random
import numpy as np
from enum import Enum

class Direction(Enum):
	right = 1
	up = 2
	left = 3
	down = 4


class Game:
	def __init__():
		self.remaining_rugs = 12
		self.step = 'ORIENT_ASSAM'

	@staticmethod
	def new():
		game = Game()
		return game

  def extract_features(self, player):
      features = []
      for p in self.players:
          for col in self.grid:
              feats = [0.] * 6
              if len(col) > 0 and col[0] == p:
                  for i in range(len(col)):
                      feats[min(i, 5)] += 1
              features += feats
          features.append(float(len(self.bar_pieces[p])) / 2.)
          features.append(float(len(self.off_pieces[p])) / self.num_pieces[p])
      if player == self.players[0]:
          features += [1., 0.]
      else:
          features += [0., 1.]
      return np.array(features).reshape(1, -1)

	def roll_dice(self):
		return (random.randint(1, self.die), random.randint(1, self.die))

	def play(self, players, debug=False):
		player_num = random.randint(0, 1)
		while not self.is_over():
			self.next_step(players[player_num], debug=debug)
			player_num = (player_num + 1) % 2
		return self.winner()

	def next_step(self, player, draw=False):
		moves = self.get_actions(player.player)
		move = player.get_action(moves, self)

		self.take_action(move, player.player)

	def get_actions(self, player):
		switch self.current_step:
			case 'ORIENT_ASSAM':
				return self.get_assam_orientations()
			case 'LAY_RUG':
				return self.get_rug_locations()

	def get_assam_orientations(self)


	def clone(self):
			"""
			Return an exact copy of the game. Changes can be made
			to the cloned version without affecting the original.
			"""
			return Game(None, self.grid, self.off_pieces,
									self.bar_pieces, self.num_pieces, self.players)

	def take_action(self, action):
			ateList = [0] * 4
			for i, (s, e) in enumerate(action):
					if s == Game.ON:
							piece = self.bar_pieces[token].pop()
					else:
							piece = self.grid[s].pop()
					if e == Game.OFF:
							self.off_pieces[token].append(piece)
							continue
					if len(self.grid[e]) > 0 and self.grid[e][0] != token:
							bar_piece = self.grid[e].pop()
							self.bar_pieces[bar_piece].append(bar_piece)
							ateList[i] = 1
					self.grid[e].append(piece)
			return ateList

	def undo_action(self, action, player, ateList):
			"""
			Reverses given move for player, assumes move is valid,
			will remove pieces from play
			"""
			for i, (s, e) in enumerate(reversed(action)):
					if e == Game.OFF:
							piece = self.off_pieces[player].pop()
					else:
							piece = self.grid[e].pop()
							if ateList[len(action) - 1 - i]:
									bar_piece = self.bar_pieces[self.opponent(player)].pop()
									self.grid[e].append(bar_piece)
					if s == Game.ON:
							self.bar_pieces[player].append(piece)
					else:
							self.grid[s].append(piece)

	def find_moves(self, rs, player, move, moves, start=None):
			if len(rs)==0:
					moves.add(move)
					return
			r, rs = rs[0], rs[1:]
			# see if we can remove a piece from the bar
			if self.bar_pieces[player]:
					if self.can_onboard(player, r):
							piece = self.bar_pieces[player].pop()
							bar_piece = None
							if len(self.grid[r - 1]) == 1 and self.grid[r - 1][-1]!=player:
									bar_piece = self.grid[r - 1].pop()

							self.grid[r - 1].append(piece)

							self.find_moves(rs, player, move+((Game.ON, r - 1), ), moves, start)
							self.grid[r - 1].pop()
							self.bar_pieces[player].append(piece)
							if bar_piece:
									self.grid[r - 1].append(bar_piece)
					return

			# otherwise check each grid location for valid move using r
			offboarding = self.can_offboard(player)

			for i in range(len(self.grid)):
					if start is not None:
							start = i
					if self.is_valid_move(i, i + r, player):

							piece = self.grid[i].pop()
							bar_piece = None
							if len(self.grid[i+r]) == 1 and self.grid[i+r][-1] != player:
									bar_piece = self.grid[i + r].pop()
							self.grid[i + r].append(piece)
							self.find_moves(rs, player, move + ((i, i + r), ), moves, start)
							self.grid[i + r].pop()
							self.grid[i].append(piece)
							if bar_piece:
									self.grid[i + r].append(bar_piece)

					# If we can't move on the board can we take the piece off?
					if offboarding and self.remove_piece(player, i, r):
							piece = self.grid[i].pop()
							self.off_pieces[player].append(piece)
							self.find_moves(rs, player, move + ((i, Game.OFF), ), moves, start)
							self.off_pieces[player].pop()
							self.grid[i].append(piece)

	def opponent(self, token):
			"""
			Retrieve opponent players token for a given players token.
			"""
			for t in self.players:
					if t != token:
							return t

	def is_won(self, player):
			"""
			If game is over and player won, return True, else return False
			"""
			return self.is_over() and player == self.players[self.winner()]

	def is_lost(self, player):
			"""
			If game is over and player lost, return True, else return False
			"""
			return self.is_over() and player != self.players[self.winner()]

	def reverse(self):
			"""
			Reverses a game allowing it to be seen by the opponent
			from the same perspective
			"""
			self.grid.reverse()
			self.players.reverse()

	def reset(self):
			"""
			Resets game to original layout.
			"""
			for col in self.layout.split(','):
					loc, num, token = col.split('-')
					self.grid[int(loc)] = [token for _ in range(int(num))]
			for col in self.grid:
					for piece in col:
							self.num_pieces[piece] += 1

	def winner(self):
		if  not self.is_over()
			return -1

		first_player_points = self.players[0].points
		second_player_points = self.players[1].points

		if first_player_points > second_player_points
			return 0

		if second_player_points > first_player_points
			return 1

		return 0 if self.players[0].money > self.players[1].money else 1

	def is_over(self):
		return self.remaining_rugs == 0:

	def can_offboard(self, player):
			count = 0
			for i in range(Game.NUMCOLS - self.die, Game.NUMCOLS):
					if len(self.grid[i]) > 0 and self.grid[i][0] == player:
							count += len(self.grid[i])
			if count+len(self.off_pieces[player]) == self.num_pieces[player]:
					return True
			return False

	def can_onboard(self, player, r):
			"""
			Can we take a players piece on the bar to a position
			on the grid given by roll-1?
			"""
			if len(self.grid[r - 1]) <= 1 or self.grid[r - 1][0] == player:
					return True
			else:
					return False

	def remove_piece(self, player, start, r):
			"""
			Can we remove a piece from location start with roll r ?
			In this function we assume we are cool to offboard,
			i.e. no pieces on the bar and all are in the home quadrant.
			"""
			if start < Game.NUMCOLS - self.die:
					return False
			if len(self.grid[start]) == 0 or self.grid[start][0] != player:
					return False
			if start + r == Game.NUMCOLS:
					return True
			if start + r > Game.NUMCOLS:
					for i in range(start - 1, Game.NUMCOLS - self.die - 1, -1):
							if len(self.grid[i]) != 0 and self.grid[i][0] == self.players[0]:
									return False
					return True
			return False

	def is_valid_move(self, start, end, token):
			if len(self.grid[start]) > 0 and self.grid[start][0] == token:
					if end < 0 or end >= len(self.grid):
							return False
					if len(self.grid[end]) <= 1:
							return True
					if len(self.grid[end]) > 1 and self.grid[end][-1] == token:
							return True
			return False

	def draw_col(self,i,col):
			print "|",
			if i==-2:
					if col<10:
							print "",
					print str(col),
			elif i==-1:
					print "--",
			elif len(self.grid[col])>i:
					print " "+self.grid[col][i],
			else:
					print "  ",

	def draw(self):
			os.system('clear')
			largest = max([len(self.grid[i]) for i in range(len(self.grid)/2,len(self.grid))])
			for i in range(-2,largest):
					for col in range(len(self.grid)/2,len(self.grid)):
							self.draw_col(i,col)
					print "|"
			print
			print
			largest = max([len(self.grid[i]) for i in range(len(self.grid)/2)])
			for i in range(largest-1,-3,-1):
					for col in range(len(self.grid)/2-1,-1,-1):
							self.draw_col(i,col)
					print "|"
			for t in self.players:
					print "<Player %s>  Off Board : "%(t),
					for piece in self.off_pieces[t]:
							print t+'',
					print "   Bar : ",
					for piece in self.bar_pieces[t]:
							print t+'',
					print
