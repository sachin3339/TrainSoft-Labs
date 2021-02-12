const someJSCodeExample = `

  const CANCELATION_MESSAGE = {
    type: 'cancelation',
    msg: 'operation is manually canceled',
  };

  function makeCancelable(promise) {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(val => hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val));
      promise.catch(reject);
    });

    return (wrappedPromise.cancel = () => (hasCanceled_ = true), wrappedPromise);
  }

  export default makeCancelable;
`;

const someCSSCodeExample = `

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  *::-webkit-scrollbar {
    display: none;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

const sql = ``

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
        label: "Python2",
        name: "index.cpp",
        language: "python2",
        value: python
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