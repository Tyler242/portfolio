public class Board {
    // The board will be stored as a multidimensional array of strings.
    char[][] board = new char[3][3];

    public Board() {
        /* Class constructor */
        // We need the board to start empty (dashes symbolize an empty square).
        for (int i = 0; i < board.length; ++i) {
            for (int j = 0; j < board[i].length; ++j) {
                board[i][j] = '-';
            }
        }
    }

    public void updateBoard(int position, char symbol) {
        board[position / 3][position % 3] = symbol;
    }

    public void clearBoard() {
        for (int i = 0; i < board.length; ++i) {
            for (int j = 0; j < board[i].length; ++j) {
                board[i][j] = '-';
            }
        }
    }
}
