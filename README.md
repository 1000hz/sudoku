# Sudoku

### View the app: https://1000hz.github.io/sudoku

This project was a pre-interview screening test I completed for a major tech company in San Francisco.
The requirements were to build a Sudoku app in a week with the following features:
* Looks appealing
* Mobile-friendly
* Cross-browser support (Chrome/FF/IE10)
* No frameworks like Backbone or Bootstrap (libraries like jQuery are ok)

## Run it Locally
You can run the app at http://localhost:8000 with `grunt server`.
Also, you can run the test suite with `grunt test`.

## Technical Details
The app is broken up into several modules.
* The main App module takes care of loading up the puzzle, setting up Persistence, showing it to the screen, game actions, etc.
* The Puzzle module sets up all of the 9 grid Regions and instantiates up the Validator module.
* The Region module handles instantiating its 9 Squares and creating its element
* Squares take care of receiving/filtering input, raising value change events, and creating their element
* Validator makes sure each of your rows/columns/regions don't have any duplicate values, and adds error classes if so
* Persistence handles storing puzzle state to the browser's localStorage
* Sidebar handles showing/hiding the sliding menu

The CSS is written in Sass, broken up into several partials for each concern. It uses media queries for a mobile-first responsive design that scales up when the browser width gets past a certain breakpoint.

### Tools
* RequireJS to break the JavaScript up into easily-digestable modules and easily manage dependencies.
* Jasmine to unit test each of the JS modules
* Bower to handle frontend package management
* Grunt to handle running tasks such as running a livereloading server, Sass-compilation, project building, executing the test suite.

I opted not to use any client-side templates since there was a minimum amount of markup necessary. The Puzzle/Region/Square modules all create their single elements with jQuery, which is simple enough. Had the requirements for the contents of these elements been more dynamic or complex, I definitely would have gone with a templating engine (either Underscore or Handlebars).

### Planned features that didn't make it
* Randomly generating new puzzles
* Puzzle-solver to give hints a square at a time
* Push-state routing, allowing players to bookmark their progress, and navigate backwards and forwards through moves
* A more exciting winning screen
* Improved animations on input, puzzle loading, etc.
* Improved mobile performance
