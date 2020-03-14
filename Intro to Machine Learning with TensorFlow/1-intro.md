# Welcome to Machine learning

* Recommend log in to account at least twice a week
* Use "Mentor Help" (bottom left corner of classroom)

# Get Help with Your Account
* Report any harassment, discrimination, bullying, defamation, etc to `report@udacity.com`
* If you have reviewed our [FAQ](https://udacity.zendesk.com/hc/en-us) and still have a question, you can submit a support ticket from our [Udacity Help Center](https://udacity.zendesk.com/hc/en-us).

# Career Services
* Career Portal contains a suite of Career Services
* You’ll be able to join the Udacity Talent Program once you graduate and share your profile with employers
* Free to contact at `career-support@udacity.com`
* To participate in [Udacity Talent Program](https://www.udacity.com/careers/get-hired):
  - Graduate from a Nanodegree program
  - Complete your Udacity Profile (Career Portal > Edit Profile)
  - Upload your resume to your Udacity Profile.
  - Toggle the share status of your profile to Public.

# Setting Up Your Computer
* `conda` is package & environment manager (similar to `virtualenv` and `pyenv`); **Anaconda** is distribution that includes conda, Python, and >150 scientific packages
* Unlike pip, conda is *not* Python-specific
* Not all Python packages available in conda; you'll use pip, too

| Command | Description |
| ------- | ----------- |
| `conda install numpy=1.10 scipy panda` | Install package(s) |
| `conda update <package>` | Update specific package. Note `upgrade` is an alias. |
| `conda remove <package>` | Remove package(s) |
| `conda list` | List installed packages |
| `conda update conda && conda update --all` | Update all packages in default environment |
| `conda search *beautifulsoup*` | Search for package |

| Command | Description |
| ------- | ----------- |
| `pip freeze > requirements.txt` | Save installed packages list |
