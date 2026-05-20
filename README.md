# Data Visualization Dashboard

A static front-end dashboard for displaying student employment data. The project includes authentication pages, an overview dashboard with charts, and a student management page with CRUD interactions.

## Live Demo

The project has been deployed on GitHub Pages and is available at:

```text
https://u7663394.github.io/data-visualization-platform/
```

## Features

- User registration and login
- Token-based login state stored in `localStorage`
- Dashboard overview cards for salary, student count, average age, and group count
- ECharts visualizations:
  - Annual salary trend line chart
  - Class salary distribution pie chart
  - Group salary comparison bar chart
  - Gender salary distribution charts
  - China province distribution map
- Student list management:
  - View all students
  - Add a student
  - Edit student information
  - Delete a student
  - Province, city, and area cascading selectors

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Bootstrap Icons
- Axios
- ECharts

All dependencies are included locally in the repository under `bootstrap/` and `lib/`, so no package installation is required.

## Project Structure

```text
.
├── index.html              # Dashboard overview page
├── student.html            # Student management page
├── login.html              # Login page
├── register.html           # Registration page
├── css/                    # Page and shared styles
├── js/                     # Page logic and shared utilities
├── lib/                    # Third-party JavaScript libraries
├── bootstrap/              # Bootstrap CSS, JS, icons, and fonts
├── imgs/                   # Static images
├── LICENSE
└── README.md
```

## Getting Started

Because this is a static front-end project, you can run it with any local static file server.

Using Python:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/login.html
```

## Usage

1. Open `register.html` and create an account.
2. Open `login.html` and sign in.
3. After login, the app stores the returned token and username in `localStorage`.
4. Visit `index.html` to view the dashboard.
5. Visit `student.html` to manage student records.

## API

The project uses the remote API configured in `js/common.js`:

```js
axios.defaults.baseURL = "https://hmajax.itheima.net";
```

Main API areas used by the app:

- `POST /register`
- `POST /login`
- `GET /dashboard`
- `GET /students`
- `POST /students`
- `GET /students/:id`
- `PUT /students/:id`
- `DELETE /students/:id`
- `GET /api/province`
- `GET /api/city`
- `GET /api/area`

An internet connection is required because the app depends on this remote API.

## Notes

- Usernames must be 8 to 30 characters.
- Passwords must be 6 to 30 characters.
- Protected pages redirect to `login.html` when no token is found.
- Expired or invalid tokens are cleared automatically, and the user is redirected to the login page.

## License

This project is licensed under the GNU General Public License v3.0. See `LICENSE` for details.
