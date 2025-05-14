# Automated Documentation Workflow

This project uses a GitHub Actions workflow to automatically update documentation when code changes are pushed to the repository.

## Workflow Overview

The `auto-update-docs.yml` workflow is triggered on any push to the repository. It uses Devin AI to:

1. Clone the repository at the specific commit
2. Review the changes made in the commit
3. Update the documentation in the `docs/` directory and `README.md` to reflect the code changes
4. Commit the documentation updates with a message that includes `[skip docs]` to prevent infinite loops

## Workflow Details

The workflow includes several key features:

- **Skip Conditions**: The workflow is skipped if:
  - The commit is from `github-actions[bot]`
  - The commit author is `Devin AI`
  - The commit author email contains `devin-ai-integration`
  - The commit message contains `[skip docs]`

- **Changed Files Detection**: The workflow uses `git diff-tree` to identify files changed in the commit and passes this information to Devin.

- **Devin API Integration**: The workflow uses the Devin API to create a session that updates documentation based on the code changes.

- **Asynchronous Processing**: The workflow initiates the Devin session but doesn't wait for completion, allowing the GitHub Action to finish while Devin continues to work in the background.

## Recent Updates

The workflow was recently updated to:

- Fix JQ parsing issues when handling file lists
- Improve session handling to prevent GitHub Actions from timing out
- Enhance prompt formatting for better Devin API integration

## Pre-push Hook

A pre-push Git hook is installed to prevent pushes by:
- User named 'Devin AI'
- Emails containing 'devin-ai-integration'

This prevents the automated documentation system from accidentally pushing changes directly.
