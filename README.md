# Google HashCode 2020

This repository can be used on the day of the Google HashCode event to solve the question(s).
Just add the dataset files (.in) to the data/input/ directory, the files of each question should be in their own folder, e.g.:

**data/input/more-pizza/a_example.in**

The input file can processes through the processor that you will write yourself on the day of the event. This processor file should be created in the src/processors folder e.g.:

**src/processors/more-pizza.js**

Run the following command to run a certain dataset file through your processor:

**npm run go -- --question more-pizza --input a_example**

Each processor has a parameter input which will consist of the dataset file already split into an array split by lines, each line consists of another array split by spaces., e.g.: 

**[ [ '17', '4' ], [ '2', '5', '6', '8' ] ]**

The output file be opened in code and will be written to data/output, e.g.:

 **data/output/more-pizza/a_example.out**

This output file can then be uploaded to the Judge System: (https://hashcodejudge.withgoogle.com/)

To make sure the output file opens in VS Code, add the code command to your path:

- **CMD + SHIFT + P** in VS Code
- Search for **'shell'**
- Pick **'Shell Command: Install 'code' command in PATH'**

Optionally you can also add the --open if you want to manually disable the opening of the output file, e.g.:

**npm run go -- --question more-pizza --input a_example --open false**

And lastly, for convenience I've already added lodash the package.json, which you can of course use for certain utility functions. Feel free to fork this repository and add your own public libraries.