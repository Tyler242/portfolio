"""
Show a timer on-screen.

"""
from game.point import Point
import arcade
import datetime


class Timer():
    """
    Main application class.
    """
    def __init__(self):
        self.output = str

    def timer_draw(self, total_time):
        """ Use this function to draw everything to the screen. """

        # Calculate minutes
        minutes = int(total_time) // 60

        # Calculate seconds
        seconds = int(total_time) % 60

        # Figure out our output
        self.output = f"Time: {minutes:02d}:{seconds:02d}"


#window = Timer()
#window.setup()