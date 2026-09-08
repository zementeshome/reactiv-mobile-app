# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Requirements

● Framework: React, with Vite (recommended) or a similar modern setup.
● Language: TypeScript (preferred) or JavaScript.
● State management: React Context and Hooks, or an equivalent idiomatic approach.

Preview Screen Components
● Carousel Section:
● Should scroll horizontally, you can use a third-party plugin for the carousel
features.
● Allow adding, editing, and removing image URLs from the carousel.
● Provide options to display the carousel in portrait, landscape, or square view.
● Textarea Section:
● Display a title and a description.
● Allow changing the text of the title and description.
● Allow changing the hex color value for the title and description.
● Call to Action Section:
● Display a button with a label.
● Allow changing the button label and link.
● Allow changing the hex color value of the button and the label text

Editor Behaviour
● Changes should be reflected in real-time in the preview.
● Provide a user interface to input and modify the required fields for each section.
● Allow the user to add multiple sections of each type to the screen (e.g. more than one
carousel), and reorder sections on the screen.
● Ensure the UI is responsive and user-friendly

Import / Export
● Support exporting the current configuration as a JSON file and importing a valid
configuration file to restore a previous state.
● Handle invalid or malformed files gracefully
● Verify this
