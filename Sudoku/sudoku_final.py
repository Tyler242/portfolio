# 1. Name:
#      Tyler Shellman
# 2. Assignment Name:
#      Lab 05 : Sudoku Draft
# 3. Assignment Description:
#      Play the game of sudoku!
# 4. What was the hardest part? Be as specific as possible.
#      The display function was challenging for me. I wasn't sure how to
#      continue a print statement before I learned about end="".
# 5. How long did it take for you to complete the assignment?
#

import json


def get_file():
    '''User will select which board they would like to play'''
    easy = 'boards/131.05.Easy.json'
    medium = 'boards/131.05.Medium.json'
    hard = 'boards/131.05.Hard.json'

    print('Difficutly:\n'
          'Enter 1 for easy.\n'
          '2 for Medium.\n'
          '3 for Hard.')

    # Get and validate the users choice of board.
    chosen = False
    while not(chosen):
        # Make sure it's an integer between 1-3.
        try:
            board_choice = int(input("Please select a board "
                                     "to play (1-3): "))
            if board_choice < 1 or board_choice > 3:
                print('Input must be between 1-3.')
            else:
                chosen = True
        except:
            print('Input must be an integer between 1-3.')

    # Check for any issues.
    assert isinstance(board_choice, int), 'board_choice is not an integer.'
    assert 1 <= board_choice <= 3, 'board_choice is out of valid range.'

    # Match the users input with a board file.
    if board_choice == 1:
        return easy
    elif board_choice == 2:
        return medium
    elif board_choice == 3:
        return hard
    else:  # This case should never happen.
        assert False, 'Error selecting and returning board'


def read_board(filename):
    '''Read the board in from the file'''

    # Ensure the filename is a string.
    assert isinstance(filename, str), 'Filename is not a string.'

    # Open and read the file specified by the user.
    try:
        with open(filename, 'r') as f:
            data = json.load(f)

        # Calls for board validation and completion check will happen here.

        assert len(data['board']) == 9, 'Data is not in correct form.'
        return data['board']
    except:
        print('Unable to read board. Please check the board file and try '
              'again. Goodbye.')


def get_square(board):
    '''Return the square that the user would like to update.'''
    # I built this function intending to avoid the use of try, except.
    # I wanted to see what it would take to do everything without that.

    # Keep prompting the user for input until a valid input is
    # received.
    done = False
    while not(done):
        # Grab input from the user.
        print('Specify a coordinate to edit or \'Q\' to save and quit')
        square = input('> ')

        # This will catch the case if the user only pressed the enter key.
        if len(square) != 0:

            # If the user entered the letter Q, return Q to save and quit.
            if square.capitalize() == 'Q':
                return "Q"

            # Did the user enter the letter or number first?
            if ord(square[0]) < ord('A') and ord(square[1]) >= ord('A'):
                row = int(square[0]) - 1
                col_letter = square[1]
            elif ord(square[0]) >= ord('A') and ord(square[1]) < ord('A'):
                row = int(square[1]) - 1
                col_letter = square[0]
            else:
                # User entered two letters or two numbers which is an error.
                # These values will cause the validation tests to fail.
                row = 9
                col_letter = 'Z'

            # Convert the letter to a number.
            col = ord(col_letter.capitalize()) - ord('A')

            # Make sure the given coordinates are valid and the
            # square is unfilled.
            if not(col > 8 or col < 0 or row > 8 or row < 0):
                if board[row][col] == 0:
                    done = True
                else:
                    print('ERROR: Square', col_letter.upper() +
                          str(row + 1), 'is filled')

            else:
                print('ERROR: Square', str(
                    square[0]) + str(square[1]), 'is invalid')
        else:
            print('Empty')

    return row, col


def get_num(square, valid_nums):
    '''Return the number the user would like to place in the square'''
    assert len(square) == 2, 'Square has too many or not enough values.'
    assert square[0] >= 0 and square[0] <= 8, 'row value is out of range.'
    assert square[1] >= 0 and square[1] <= 8, 'col value is out of range.'
    assert 1 <= len(valid_nums) <= 9, 'valid_nums is too large or small.'

    done = False
    # Validate the input
    while not(done):
        # Make sure we get an integer from the user.
        try:
            num = input('What number goes in ' +
                        chr(square[1] + ord('A')) + str(square[0]+1) +
                        ' (Press S to see possible values)?')

            if num == 's' or num == 'S':
                print(valid_nums)
            else:
                # Make sure the integer is within the acceptable range.
                num = int(num)
                valid = False
                count = 0

                if num < 1 or num > 9:
                    print('ERROR: The value ', num,  'is invalid.')

                else:
                    while not(valid) and count <= (len(valid_nums) - 1):

                        if valid_nums[count] == num:
                            valid = True
                            done = True

                        count += 1

                    if valid == False:
                        print("Number cannot be placed in square.")

        except:
            print('ERROR: Input must be an integer.')

    assert isinstance(num, int), 'Input is not an integer.'
    assert num > 0 and num < 10, 'Input is out of the range.'
    return num


def display_board(board):
    '''Display the board'''
    # Asserts verifying the board
    assert isinstance(board, list), 'disp_board is not a list.'
    assert len(board) == 9, 'board is missing rows.'

    print('   A B C   D E F   G H I')
    for row in range(0, len(board)):
        print(row + 1, end="  ")
        for col in range(0, 9):
            print(board[row][col] if board[row][col] != 0 else ' ', end=" ")
            if col == 2 or col == 5:
                print('| ', end="")
        print('')
        if row == 2 or row == 5:
            print('   ------+-------+------')


def compute_possible(board, square):
    '''Compute the possible values for a square.'''
    # square will be a list of two numbers: square = [row, col]
    possible = [False, True, True, True, True, True, True, True, True, True]

    # Check the column for numbers
    for index in range(1, len(possible)):
        # Has the index number already appeared in the column?
        if possible[index]:
            for num in range(0, 9):
                # Is the current square 0 or something else?
                if board[num][square[1]]:
                    # If it's 1-9 then the value at that index
                    # will be set to false in the possible list.
                    possible[board[num][square[1]]] = False

    # Check the row for numbers
    for index in range(1, len(possible)):
        # Has the number already appeared?
        if possible[index]:
            for num in range(0, 9):
                # Does the current square have value 1-9?
                if board[square[0]][num]:
                    # If it's 1-9 then the value at that index
                    # will be set to false in the possible list.
                    possible[board[square[0]][num]] = False

    # Check the square for numbers
    # Compute the square coordinates
    col_inside = (square[1] // 3) * 3
    row_inside = (square[0] // 3) * 3

    for index in range(1, len(possible)):
        # Has the number already appeared?
        if possible[index]:
            # Iterate through each col inside of each row and
            # check for a new number that has been seen already.
            for row_cnt in range(row_inside, row_inside + 3):
                for col_cnt in range(col_inside, col_inside + 3):
                    if board[row_cnt][col_cnt]:
                        possible[board[row_cnt][col_cnt]] = False

    # Place each index in possible that is still True into a separate list
    nums = []
    for index in range(1, len(possible)):
        if possible[index]:
            nums.append(index)
    return nums


def update_board(board):
    '''Control the updating of the board through user input.'''
    # Display the board
    display_board(board)

    square = get_square(board)

    # If the user entered 'Q' for the square then we will save and quit.
    if square[0] == 'Q':
        print('Q was entered. Saving and quiting. Goodbye.')
        return True, board

    # Call the compute_possible function to find the
    # possible values for the square.
    valid_nums = compute_possible(board, square)

    # Get the user input for the number.
    new_num = get_num(square, valid_nums)

    # Update the board
    board[square[0]][square[1]] = new_num

    return False, board


def save_board(file, board):
    '''Save the board to the same file that it was read from.'''
    # Convert board to a python dictionary to match json format.
    save_dict = {
        'board': board
    }
    # Save the board to the file.
    with open(file, 'w') as outfile:
        json.dump(save_dict, outfile)


def play_game(board):
    '''Control the flow of the game.'''

    is_done = False
    while not(is_done):

        is_done, board = update_board(board)

    return board


# Get the filename
filename = get_file()
assert isinstance(filename, str), 'Filename is not a string.'

# Read the board in
board = read_board(filename)

# Make sure the board won't cause us to crash and burn.
assert len(board) == 9, 'Board does not have enough rows'
for row in board:
    assert len(row) == 9, f'Board does not enough columns at {row}'

# Run the game loop.
board = play_game(board)

# Make sure the board is valid when it gets saved.
assert len(board) == 9, 'Board does not have enough rows'
for row in board:
    assert len(row) == 9, f'Board does not have enough columns at {row}'

save_board(filename, board)
