# Activity Points Management System

A React front end with two roles, sharing one login screen:

- **Students** log in, view a dashboard of activity points earned toward
  their target, browse and filter their logged activities, submit new
  ones, and see a breakdown by category.
- **Admins** (faculty coordinators) log in to an admin console: an
  overview of pending work, a Review Activities page to approve or
  reject each submission (optionally adjusting the points awarded), and
  a Students page listing everyone's progress toward their target.

Built for the Web Programming "Activity Points Management System"
assignment.

No backend or database is used: student, admin, activity and category
data live in JSON files under `src/data/`. Activities a student adds, and
approve/reject decisions an admin makes, are kept in the browser's
`localStorage` for the session (since a static site can't write back to
the JSON files) — an admin's approval is reflected immediately on the
matching student's dashboard.

## Tech

- React 18 + Vite
- React Router (HashRouter, so routing works on GitHub Pages)
- Plain CSS (no framework)

## Project structure

```
src/
  data/            students.json, admins.json, activities.json, categories.json
  context/         AuthContext.jsx – login/logout, current user (student or admin)
  hooks/           useActivities.js – merges JSON data with locally added
                    activities and admin approve/reject overrides
  components/      Login, ProtectedRoute (role-aware),
                    Layout, Dashboard, ActivityList, ActivityDetails,
                    AddActivity, Categories, Profile          (student side)
                    AdminLayout, AdminDashboard,
                    AdminActivityReview, AdminStudents         (admin side)
```

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL. Demo logins (same sign-in form for both):

- Student — UID `AD24037`, password `joel2026`
  (a second demo student with different data: UID `AD24012`, password `demo1234`)
- Admin — UID `ADMIN01`, password `admin2026`

Logging in routes you to `/dashboard` (student) or `/admin/dashboard`
(admin) based on which JSON file the UID matched.

## Deploy to GitHub Pages

1. Create a GitHub repo and push this project to it.
2. In `vite.config.js`, set `base: '/<your-repo-name>/'` to match your
   repo's name exactly (it's currently set to `/activity-points-app/`).
3. Install the deploy helper and publish:

   ```bash
   npm install
   npm run deploy
   ```

   This builds the app and pushes the `dist/` folder to a `gh-pages`
   branch using the `gh-pages` package (already in `devDependencies`).
4. In your repo's Settings → Pages, set the source to the `gh-pages`
   branch (this is usually configured automatically the first time you
   run `npm run deploy`).
5. Your app will be live at `https://<your-username>.github.io/<repo-name>/`.

## Adding your own sample data

Edit `src/data/students.json`, `src/data/admins.json`,
`src/data/activities.json` and `src/data/categories.json` — each activity
needs a `uid` matching a student, a `category` id matching a category,
and a `status` of `Approved`, `Pending` or `Rejected`. You can add more
admin accounts the same way you'd add students, just with `"role":
"admin"` and no `department`/`semester`/`targetPoints` fields.
