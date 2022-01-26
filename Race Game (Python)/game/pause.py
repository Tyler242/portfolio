import arcade
import time
from game import constants

class Pause_Menu(arcade.View):

    def set_parameter(self, cast, script, input_service):
        self._cast = cast
        self._script = script
        self._input_service = input_service

    def on_draw(self):
        print("Y")
        arcade.set_background_color(arcade.csscolor.ROYAL_BLUE)

        # Reset the viewport, necessary if we have a scrolling game and we need
        # to reset the viewport back to the start so we can see what we draw.
        arcade.set_viewport(0, constants.MAX_X - 1, 0, constants.MAX_Y - 1)

    def on_show(self):
        """ Draw this view """
        arcade.start_render()
        arcade.draw_text("Game Paused", constants.MAX_X / 2, constants.MAX_Y / 2,
                         arcade.color.WHITE, font_size=50, anchor_x="center")
        arcade.draw_text("Click to advance", constants.MAX_X / 2, constants.MAX_Y / 2-75,
                         arcade.color.WHITE, font_size=20, anchor_x="center")

    def pause(self):
        while self._sleep:
            time.sleep(5)

    def on_mouse_press(self, _x, _y, _button, _modifiers):
        """ If the user presses the mouse button, start the game. """
        self._sleep = False
        from game.director import Director
        self.game_view = Director(self._cast, self._script, self._input_service)
        self.game_view.pause = False
        # from game import constants
        self.window.show_view(self.game_view)
        self.start_sound = arcade.load_sound(":resources:sounds/coin1.wav")
        arcade.play_sound(self.start_sound)
        