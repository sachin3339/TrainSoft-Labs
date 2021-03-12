const c = `
#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}
`;

const java = `import java.util.Scanner;

public class HelloWorld {

    public static void main(String[] args) {

        // Creates a reader instance which takes
        // input from standard input - keyboard
        Scanner reader = new Scanner(System.in);
        System.out.print("Enter a number: ");

        // nextInt() reads the next integer from the keyboard
        int number = reader.nextInt();

        // println() prints the following line to the output screen
        System.out.println("You entered: " + number);
    }
}
`;


const python = `
# This program adds two numbers

num1 = 1.5
num2 = 6.3

# Add two numbers
sum = num1 + num2

# Display the sum
print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))`

const cPlus2 = `// Your First C++ Program

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}`

export const Language = [
      {
        label: "Java",
        name: "index.java",
        language: "java",
        value: ''
      },
      {
        label: "C",
        name: "index.c",
        language: "c",
        value: ''
      },
      {
        label: "C++",
        name: "index.c",
        language: "CPP",
        value: ''
      },
      {
        label: "Python",
        name: "index.cpp",
        language: "python2",
        value: ""
      },
      {
        label: "Sql",
        name: "index.cpp",
        language: "sql",
        value: ''
      },
      {
        label: "NodeJs",
        name: "index.js",
        language: "nodejs",
        value: ''
      },
      {
        label: "Swift",
        name: "",
        language: "swift",
        value: ''
      },
      {
        label: "Ruby",
        name: "",
        language: "ruby",
        value: ''
      }
      
]