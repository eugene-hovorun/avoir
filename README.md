## Setup

```bash
# Install dependencies
yarn

# Run shop for development
yarn dev:shop

# Run admin for development
yarn dev:admin
```

## Structure

- apps
  - **admin** - admin dashboard
  - **shop** - shop
- libs
  - **app** - reusable UI component, helpers etc.
  - **back** - reusable backend stuff

## Git flow

Main branch **master** is created at the start of a project and is maintained throughout the development process.
Newly-created features should be based off the **master** branch, and then merged back in when ready for testing.

While working with the GitHub flow branching strategy:

1. Create new descriptively-named branch off the main branch for new work, such as _feature/product-service_
2. Commit new work to your local branch and push work to the remote.
3. To request work review open a pull request.
4. After your work has been reviewed and approved, it can be merged into the **master** branch.
5. Once your work has been merged into the **master** branch, delete feature branch.
