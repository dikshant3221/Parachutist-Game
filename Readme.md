# Parachute Game

Parachute Game is a simple browser-based game where you control a boat to catch parachutists falling from the sky. The objective is to catch as many parachutists as possible while avoiding them from hitting the water. The game ends when you miss too many parachutists and run out of lives.

## How to Play

1. **Controls**: 
   - Use the **left arrow key** to move the boat left.
   - Use the **right arrow key** to move the boat right.

2. **Objective**:
   - Move the boat to catch the parachutists falling from the sky.
   - Each time you catch a parachutist, your score increases.
   - If a parachutist hits the water without being caught, you lose a life.
   - The game ends when you run out of lives.

3. **Scoring**:
   - Catching a parachutist increases your score.
   - The game keeps track of your highest score.

## Installation

1. For clone the repository:


2. **Install Dependencies**:

- Ensure you have Node.js installed on your machine. If not, you can download and install it from [Node.js website](https://nodejs.org/).

- Install TypeScript globally if you haven't already:

  ```
  npm install -g typescript
  ```

- Install a local server for hosting the game. For example, you can use `http-server`:

  ```
  npm install -g http-server
  ```

## Building and Running

1. **Compile TypeScript**:

- Compile TypeScript files to JavaScript using the TypeScript compiler (`tsc`):

  ```
  tsc
  ```

This will generate JavaScript files in the `dist` directory.

2. **Run the Local Server**:

- Start the local server in the project directory:

  ```
  http-server
  ```

This will start a server at `http://localhost:8080`.

## Customization

You can customize various aspects of the game by modifying the constants and images in the `constants.js` and `images.js` files.

## Credits

This game is created by Dikshant Sahani.

## License

This project is licensed under the [MIT License](LICENSE).