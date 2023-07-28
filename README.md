# Capstone Project: Vue-Pod 💿

Hi there! Welcome to my final capstone project for the CodeSpace Software Development Program. Here, I've built a fully functional podcast app where you can browse various shows, play episodes, and keep track of your favourite episodes.

## Technology Stack
The tech stack of the project consists of Vue.js for the core frontend framework, with Vue Router for routing, Pinia for state management, and Swiper for mobile touch sliders. 

It also includes Flowbite for utility classes, Uniqolor for generating unique colors, and Vue Material Design Icons for the UI icons. 

The project utilizes Vite for the build tool, with plugins like Vite Vue and Vite Vue JSX for enhanced Vue support. 

For ensuring code quality and format, the project employs ESlint, Prettier, and plugins like Vue ESLint and ESLint Patch. It uses PostCSS and Autoprefixer for processing CSS, and Tailwind CSS as the utility-first CSS framework. The state persistence across sessions is handled by Pinia Plugin Persistedstate.


# Dependencies: 🧱
- flowbite: Version ^1.7.0
- pinia: Version ^2.1.4
- pinia-plugin-persistedstate: Version ^3.2.0
- swiper: Version ^7.4.1
- uniqolor: Version ^1.1.0
- vue: Version ^3.3.4
- vue-material-design-icons: Version ^5.2.0
- vue-router: Version ^4.2.4

## Development Dependencies: 👾
- @rushstack/eslint-patch: Version ^1.3.2
- @vitejs/plugin-vue: Version ^4.2.3
- @vitejs/plugin-vue-jsx: Version ^3.0.1
- @vue/eslint-config-prettier: Version ^8.0.0
- autoprefixer: Version ^10.4.14
- eslint: Version ^8.45.0
- eslint-plugin-vue: Version ^9.15.1
- postcss: Version ^8.4.27
- prettier: Version 3.0.0
- tailwindcss: Version ^3.3.3
- vite: Version ^4.4.6

## Data Structure 📅

In the data context, we're dealing with three basic semantic units: `EPISODE`, `SEASON`, and `SHOW`. You'll also notice a `PREVIEW` object that contains a summarized version of a `SHOW`. The data is fetched from two endpoints and contains detailed relationships between these units, like:

- One or more `EPISODE` make up a `SEASON`
- One or more `SEASON` make up a `SHOW`
- `SHOW` and `PREVIEW` are different forms of the same data, related by the `id` property
- Both `SHOW` and `PREVIEW` have a property named `GENRE`
- `GENRE` inside `PREVIEW` is an array of numbers called the `id`
- `GENRE` inside `SHOW` is an array of strings called the `title`

## API Endpoints 🖇️

The app interacts with the following two endpoints to fetch the necessary data:

- `https://podcast-api.netlify.app/shows`: Returns an array of `PREVIEW` objects.
- `https://podcast-api.netlify.app/id/<ID>`: Returns a single `SHOW` object with several `SEASON` objects and `EPISODE` objects directly embedded within.

## User Stories & Functionalities 🫂🙂

The app successfully meets 50 user stories with diverse requirements ranging from basic functionalities like viewing shows, playing episodes, and marking favourites to complex features like filtering shows based on fuzzy string matching, remembering user progress, and synchronizing favourites across devices. The app also has Supabase authentication for user log-in functionality. For more details, please refer to the User Stories file in the repository.

✅Project is deployed to a custom Netlify URL

✅ All views in the app display correctly on the smallest mobile device available, “iPhone SE”. This can be emulated in Chrome Dev tools.

✅ All favicon information has been created an added correctly via https://realfavicongenerator.net/ (you are welcome to use any free PNG image you find on https://www.flaticon.com/)

✅ All metatag information has been created and added via https://metatags.io/ (You are welcome to use any free image on https://unsplash.com/). Be mindful to manually replace all URL values (especially image URL) to absolute Netlify URL values (you will need to deploy to Netlify first)

✅ All show data loaded via a fetch call from the https://podcast-api.netlify.app/shows

✅ When viewing a specific show, data is loaded via fetch from individual show endpoint

✅ There is a loading state while initial data is being loaded

✅ There is a loading state while new data is being loaded

✅ User can view the details of a show broken down into seasons, sorted by number

✅ User can listen to any episode in a season of a show

✅ User can see a view where only episodes for a specifically selected season are shown

✅ User can toggle between different seasons for the same show

✅ User can see the name of all available shows on the platform

✅ User sees preview image of shows when browsing

✅ User sees the amount of seasons per show as a number when browsing

✅ User sees a human-readable date as to when a show was last updated

✅ User sees what genres (as genre titles) a show is associated with when browsing

✅ User sees a preview image of seasons for a specific show

✅ User sees the amount of episodes in a season as a number

✅ User can go back to a show view from a season-specific view

✅ User can mark specific episodes as favourites to find them again

✅ User can visit a view where they see all their favourites

✅ User can see the show and season of any episode in their favourites list

✅ Episodes related by season/show are grouped in favourites

✅ User is able to remove episodes from their favourites

✅ User can arrange the list of shows by title from A-Z

✅ User can arrange the list of shows by title from Z-A

✅ User can arrange the list of shows by date updated in ascending order

✅ User can arrange the list of shows by date updated in descending order

✅ User can filter shows by title through a text input

✅ User can find shows based on fuzzy matching of strings (you can use something like https://fusejs.io/)

✅ Automatically filter shows by genre if the genre label is clicked on

✅ User sees the date and time that an episode was added to their favourites list

✅ User can arrange favourites by show titles from A-Z

✅ User can arrange favourites by show titles from Z-A

✅ User can arrange favourites by date updated in ascending order

✅ User can arrange favourites by date updated in descending order

✅ Audio player shows current progress and episode length as timestamps

✅ Audio player is always visible, so the user can listen to episodes while they browse

✅ User is prompted to confirm they want to close the page when audio is playing

✅ App remembers which show and episode the user listened to last when returning to the platform

✅ App remembers which shows and episodes the user listened to all the way through

✅ App remembers the timestamp where the user stopped listening within a 10-second accuracy period of closing

✅ App remembers and shows the timestamp progress of any episode the user has started listening to

✅ User can "reset" all their progress, effectively removing their listening history

✅ User is presented with a sliding carousel of possible shows they might be interested in on the landing page

✅ User can log in via https://app.supabase.com authentication

✅ User favourites are stored in the https://app.supabase.com database

✅ User favourites are automatically synced when logged in, ensuring that they share favourites between devices

✅ Users can share their favourites as a publicly accessible URL


## Deployment 👷🏽‍♀️

I've deployed this project on Netlify. You can check it out [here](link-to-netlify-deployment).

## How to Use ❓

After cloning the repository, you need to:

## Recommended IDE Setup 💻

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration 📐

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup 📽️

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## How to Contribute 

I'm always open to contributions. Please feel free to open an issue or submit a pull request if you'd like to improve this project!

## Final Thoughts 🧠

It was quite a journey building this podcast app, and I'm thrilled to have it as my capstone project. I hope you enjoy browsing the code and using the app as much as I enjoyed building it. Happy coding!

