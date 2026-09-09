# Student Information App

A deliberately simple Student Information web application, built as the vehicle for a
**collaborative Git workflow** lab exercise. The goal of the project is not the application —
it is the branching, pull-request and conflict-resolution workflow used to build it.

**Live files:** `index.html`, `style.css`, `script.js` — no database, no backend, no build step.

---

## Team Members

| Student | Register No. | Role | Responsibility |
|---------|--------------|------|----------------|
| Arpan Mukherjee ([@Arpan7125](https://github.com/Arpan7125)) | 2547116 | Team Lead / Developer | Repository creation, base application, reviews, integration |
| Team Member 2 | _to be added_ | UI Developer | HTML structure and CSS styling |
| Team Member 3 | _to be added_ | JavaScript Developer | Client-side interactivity |

> Replace the placeholder names before submission — in this table and in the Project Team
> cards in `index.html` (search for `To be added`).

---

## Project Description

The application displays one student record as a digital campus ID card, reveals additional
details on demand, and lists the project team:

```
Student Management System – MCA
  Name             Arpan Mukherjee
  Register Number  2547116
  Programme        MCA
  [Show Details]   →  Semester 5 · Section A · Mentor Dr. Cynthia T
  Contact          Email, Phone
  Project Team     three developer cards
```

---

## Technologies Used

- **HTML5** — semantic structure (`<dl>` record rows, inline SVG icons)
- **CSS3** — design tokens as custom properties, flexbox and grid, keyframe animation,
  automatic dark mode via `prefers-color-scheme`, `prefers-reduced-motion` support
- **Vanilla JavaScript** — details toggle and a pointer-tracked card sheen; no libraries
- **Git** 2.55 and **GitHub** — remote repository, Pull Requests, code review
- **GitHub CLI** 2.100, **VS Code**

---

## Git Branching Strategy

`main` is protected by team convention: **nobody commits to it directly.** All work happens on
a short-lived feature branch, merged back through a reviewed Pull Request. Every new branch is
created from a freshly pulled `main`.

```
main ●─────●──────●───────●────────●─────────●
     │     ↑      ↑       ↑        ↑         ↑
     │   PR #1  PR #2   PR #3    PR #4     PR #5 ── PR #6
     ├─ feature/ui ─┘     │        │         │
     ├─ feature/javascript ┘       │         │
     ├─ feature/contact ───────────┘         │
     ├─ feature/student-name ────────────────┘
     ├─ feature/app-title ── CONFLICT ── resolved ──┘
     └─ feature/redesign ───────────────────────────┘
```

Branch naming convention: `feature/<short-description>`.

| Branch | Author | Purpose |
|--------|--------|---------|
| `main` | — | Always-working integration branch |
| `feature/ui` | Team Member 2 | Card layout, spacing, typography, button styling |
| `feature/javascript` | Team Member 3 | Show/Hide details behaviour |
| `feature/contact` | Team Member 2 | Contact information section |
| `feature/student-name` | Team Member 2 | Heading → "Student Management System" |
| `feature/app-title` | Team Member 3 | Heading → "MCA Student Information Portal" |
| `feature/redesign` | Team Member 2 | Campus ID-card redesign and Project Team cards |

---

## Commits

```
Initial student information app
Improve student information UI
Add student details functionality
Add contact information
Update application heading
Update application title
Resolve merge conflict in application title
Redesign the interface as an animated campus ID card
```

Every message states **what changed** — never `update`, `changes`, `final` or `latest`.

---

## Pull Requests Created

| PR | Source → Target | Author | Reviewer | Result |
|----|-----------------|--------|----------|--------|
| [#1](https://github.com/Arpan7125/student-info-app/pull/1) | `feature/ui` → `main` | Team Member 2 | Team Lead | Merged |
| [#2](https://github.com/Arpan7125/student-info-app/pull/2) | `feature/javascript` → `main` | Team Member 3 | Team Lead | Merged |
| [#3](https://github.com/Arpan7125/student-info-app/pull/3) | `feature/contact` → `main` | Team Member 2 | Team Lead | Merged |
| [#4](https://github.com/Arpan7125/student-info-app/pull/4) | `feature/student-name` → `main` | Team Member 2 | Team Lead | Merged |
| [#5](https://github.com/Arpan7125/student-info-app/pull/5) | `feature/app-title` → `main` | Team Member 3 | Team Lead | Merged **after conflict resolution** |
| [#6](https://github.com/Arpan7125/student-info-app/pull/6) | `feature/redesign` → `main` | Team Member 2 | Team Lead | Merged |

Review checklist applied to every PR:

1. Does the application work in the browser?
2. Is the code understandable by someone who did not write it?
3. Is the change relevant to the branch's stated purpose?
4. Is the commit message meaningful?

---

## Merge Conflict

### What caused the conflict?

`feature/student-name` and `feature/app-title` were both created from the **same commit** on
`main` (`bf45ea7`), and both edited **the same line** of `index.html`:

| Branch | Line 11 of `index.html` |
|--------|--------------------------|
| `feature/student-name` | `<h1>Student Management System</h1>` |
| `feature/app-title` | `<h1>MCA Student Information Portal</h1>` |

PR #4 was merged first, so `main` moved forward. When PR #5 was then merged, Git had two
different changes to the same line sharing one common ancestor and no rule for deciding which
is correct — so it stopped and asked a human. GitHub showed
*"This branch has conflicts that must be resolved"*, and locally:

```
$ git merge main
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.

$ git status --short
UU index.html
```

with markers written into the file:

```html
<<<<<<< HEAD
    <h1>MCA Student Information Portal</h1>
=======
    <h1>Student Management System</h1>
>>>>>>> main
```

- `<<<<<<< HEAD` … `=======` — the version on **your current branch**
- `=======` … `>>>>>>> main` — the version coming in from **main**

### How was it resolved?

Both intentions were combined rather than either being discarded:

```bash
git checkout main
git pull origin main
git checkout feature/app-title
git merge main               # conflict reported here

# edit index.html, keep the combined heading, delete every conflict marker
git add index.html
git commit -m "Resolve merge conflict in application title"
git push origin feature/app-title
```

Final result:

```html
<h1>Student Management System – MCA</h1>
```

The Pull Request became mergeable and the team lead merged it.

> **A conflict is not an error.** It is Git refusing to guess when two developers disagree
> about the same line, and handing the decision back to the team.

---

## Documentation

| File | Contents |
|------|----------|
| [`docs/Git-Workflow-Lab-Report.pdf`](docs/Git-Workflow-Lab-Report.pdf) | Full 12-page lab report with screenshots |
| [`docs/conflict-evidence.md`](docs/conflict-evidence.md) | Terminal capture of the conflict and its resolution |
| [`docs/lab-steps.md`](docs/lab-steps.md) | Every command used, in order |
| [`docs/screenshots/`](docs/screenshots) | Application screenshots, light and dark, desktop and mobile |

---

## How to Run the Application

No server, no dependencies, no build step:

```bash
git clone https://github.com/Arpan7125/student-info-app.git
cd student-info-app
```

Then open `index.html` in any browser — double-click it, or:

```bash
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux
```

Click **Show Details** to expand the additional student information. The page follows your
operating system's light or dark theme automatically.

---

## Viewing the Project History

```bash
git log --oneline --graph --all
```
