import java.util.Scanner;

public class Console {
    Scanner scanner = new Scanner(System.in);

    public void displayBoard(char[][] board) {
        /* This method will display the board. */
        for (int i = 0; i < board.length; ++i) {
            System.out.println(" " + board[i][0] + " | " +
                    board[i][1] + " | " + board[i][2]);
            if (i < 2) {
                System.out.println("---+---+---");
            }
        }
        System.out.println("\n");

    }

    public void displayMenu(String name) {
        /* This method will display the menu */
        System.out.println(name + "'s turn.");
        System.out.println("Press Q to quit, R to reset, F to forfeit, or 1-9 to fill a square.");
    }

    public void welcome() {
        /* This method will display a welcome screen for the players */
        System.out.println("Welcome to a game of Tic-Tac-Toe!\n");
        System.out.println(" 1 | 2 | 3 ");
        System.out.println("---+---+---");
        System.out.println(" 4 | 5 | 6 ");
        System.out.println("---+---+---");
        System.out.println(" 7 | 8 | 9 \n");

    }

    public char getMenuOption() {
        /* This method will return the users menu selection */

        System.out.println("> ");
        String selection = scanner.nextLine();
        char selectChar = selection.charAt(0);
        return selectChar;
    }

    public String[] getPlayerName() {
        /* This method will get the players name */
        // Get the first players name
        System.out.println("Player 1 please enter your name: ");
        String nameOne = scanner.nextLine();

        // Get the second players name
        System.out.println("Player 2 please enter your name: ");
        String nameTwo = scanner.nextLine();

        // Return both names
        String[] names = { nameOne, nameTwo };
        return names;
    }

    public void displayError() {
        /* This method will display an error message */
        System.out.println("Error occured with input.");
    }

    public void displayInvalid() {
        /*
         * This mehtod will display a message when an
         * invalid input is received or a square is full
         */
        System.out.println("Invalid selection, we don't recognize that command or that square is already full.\n");
    }

    public void displayGameOver(String name, char condition) {
        /* This method will display a game over message */
        if (condition == 'w') {
            System.out.println("Congrats! " + name + " won the game!");
        } else if (condition == 't') {
            System.out.println("It's a tie! No winner.");
        } else {
            System.out.println("Don't know how this happened...No winner!");

        }
    }

}
