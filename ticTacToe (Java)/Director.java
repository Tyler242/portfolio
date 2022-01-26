public class Director {

    public static void main(String[] args) {
        Board currentBoard = new Board();
        Console userIO = new Console();
        Logic logic = new Logic();
        String[] names = userIO.getPlayerName();

        // Controls when the game is finished.
        boolean done = false;

        // play the game.
        while (done != true) {
            // Display the board.
            userIO.displayBoard(currentBoard.board);

            userIO.displayMenu((logic.xTurn) ? names[0] : names[1]);

            // get what the user chooses to do.
            char selection;
            boolean isValid = false;
            do {
                selection = userIO.getMenuOption();
                if (logic.isValid(selection, currentBoard.board) == true) {
                    isValid = true;
                } else {
                    userIO.displayInvalid();
                }
            } while (isValid == false);

            // What did the user select?
            if (Character.isDigit(selection) == false) {
                // If the user entered a letter, we handle it here.
                char select = Character.toUpperCase(selection);
                switch (select) {
                    // Quit option
                    case 'Q':
                        done = true;
                        break;
                    // Reset the game option
                    case 'R':
                        currentBoard.clearBoard();
                        break;
                    // Forfeit option
                    case 'F':
                        done = true;
                        break;
                    // This code should NEVER run.
                    default:
                        userIO.displayError();
                        continue;
                }
            } else {
                // convert to an integer to be used as an index.
                int position = Character.getNumericValue(selection) - 1;
                // pass x if it's x's turn otherwise o.
                char symbol = (logic.xTurn == true) ? 'X' : 'O';
                currentBoard.updateBoard(position, symbol);
            }

            if (logic.isGameOver(currentBoard.board)) {
                done = true;
                userIO.displayBoard(currentBoard.board);
                userIO.displayGameOver((logic.xTurn) ? names[0] : names[1], logic.endCondition);
            }

            logic.updateTurn(currentBoard.board);
        }
    }
}