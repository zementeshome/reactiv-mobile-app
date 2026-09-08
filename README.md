# Reactiv Home Screen Editor

React web application that lets users preview and modify an example mobile app
home screen in real time, with the ability to configure three elements: a carousel, a text section and CTA section.

## Getting Started

1. Clone this repository to your local machine:

```bash
git clone https://github.com/zementeshome/reactiv-mobile-app.git
```

2. Navigate into the project directory:

```bash
cd my-app
```

3. Install dependencies

```bash
npm install
```

4. Run the app

```bash
npm run dev
```

5. Default browser should automatically open the app at

```url
http://localhost:5173/
```

### Approach

I found some mockups online so that I could visually map out the layout of the app. Once I did that I wrote down my features and what components I would need to build them. I used shadcn/ui and radix ui for the component library because they're accessible and easily customizable.

Next I thought about how to manage state. I made everything live in one Context - add/edit/delete/reorder to make it easier to digest and convenient for the export/import JSON requirement.

Lastly I focused on CSS, making sure the app is easy to use, intuitive, responsive and accessible. Component libraries sometimes have dependencies that are buddy (e.g. the carousel), so a lot of time was focused on trying to fix those bugs. Instead of wasting anymore time on that I decided it would be best to just build a dependency free carousel.

## Built With

- [React](https://react.dev/) - Frontend library
- [Vite](https://vite.dev) - Build tool and development server
