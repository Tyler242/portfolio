public class Logic {
    boolean xTurn = true;
    char endCondition;

    public void updateTurn(char[][] board) {
        /* Determine if it is x's turn. */
        int countX = 0, countO = 0;
        for (int i = 0; i < board.length; ++i) {
            for (int j = 0; j < board[i].length; ++j) {
                if (board[i][j] == 'X') {
                    ++countX;
                } else if (board[i][j] == 'O') {
                    ++countO;
                }
            }
        }
        if (countX == countO) {
            xTurn = true;
        } else {
            xTurn = false;
        }
    }

    public boolean isValid(char input, char[][] board) {
        /* This method will determine whether the users input is valid. */

        if (Character.isAlphabetic(input)) {
            // if the character is a letter, it must match one of the options.
            char upperInput = Character.toUpperCase(input);
            if (upperInput == 'Q' | upperInput == 'R' | upperInput == 'F') {
                return true;
            } else {
                return false;
            }
        } else if (Character.isDigit(input)) {
            // if the character is a number, it must be within the valid range
            int intInput = Character.getNumericValue(input);
            if (intInput > 0 & intInput < 10) {
                // the number must also be the position of an open space.
                if (isOpenSquare(intInput - 1, board)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            // if the character is anything but a number or letter, it is invalid.
            return false;
        }
    }

    public boolean isOpenSquare(int position, char[][] board) {
        /* This method will determine if the selected square is open or filled */

        if (board[position / 3][position % 3] == '-') {
            return true;
        } else {
            return false;
        }
    }

    public boolean isGameOver(char[][] board) {
        /* This method will determine when a player has won the game or tied. */

        // check for vertical or horizontal victory
        for (int i = 0; i < board.length; ++i) {
            if (board[0][i] == board[1][i] & board[0][i] == board[2][i] & board[0][i] != '-'
                    | board[i][0] == board[i][1] & board[i][2] == board[i][0] & board[i][0] != '-') {
                endCondition = 'w';
                return true;
            }
        }
        // check for either diagonal victory
        if (board[0][0] == board[1][1] & board[1][1] == board[2][2] & board[0][0] != '-'
                | board[0][2] == board[1][1] & board[1][1] == board[2][0] & board[0][2] != '-') {
            endCondition = 'w';
            return true;
        }
        // check for a tie by checking every square.
        for (int i = 0; i < board.length; ++i) {
            for (int j = 0; j < board.length; ++j) {
                if (board[i][j] == '-') {
                    return false;
                }
            }
        }
        // if we get to this point then the game board is completely full and there is
        // no winner, therefore it's a tie.
        endCondition = 't';
        return true;
    }
}
