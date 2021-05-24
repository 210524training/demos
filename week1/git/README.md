# Instructions

1. Create a new branch, specific to you
  - e.g. `extended-greeting-matt-oberlies`
2. Modify the `greeting.txt` file to include your name and something about you
3. Commit the changes
4. Push the changes to a remote branch
5. Open a Pull Request to merge into the `main` branch

## Possible Results

I will personally review your Pull Requests, and merge them one at a time.

### If I merge your PR

You are done

### If I merged someone else's PR

Your Pull Request will become outdated, as you no longer have the new changes on the `main` branch.

You will need to run `git pull origin main` to update your local `extended-greeting` branch with the new changes.

This step *might* result in what is called a "Merge Conflict". If this occurs, I will show everyone how to deal with the situation together.

In general, it will require you to manually modify the conflicted file with the changes it is supposed to have.

Then run `git push` to update your own remote `extended-greeting` branch.
This will update your Pull Request to once again be synchronized with the changes.

## Conclusion

This cyclical process will continue to repeat until everyone successfully merges their own Pull Requests.

Keep in mind that many of you will have to repeat this process _multiple times_. Don't worry, this is expected.

Those of you who successfully have their Pull Request merged should help others.