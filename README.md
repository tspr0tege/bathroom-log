# Bathroom Log
## Description
This was a project put together for a teacher on a bare bones budget. He wanted a page he could load on a Chromebook that would allow his students to scan in and out, and track their time. As there was no way to save or create files from within the limitations of the app, it uses local storage to save, and checks student names against an array list in a js file.

## Usage
This project is primarily listed here for demonstration purposes. To see it working, I have "students" Ellen Ripley and Jason Voorhees. Type one of their names into the text box and hit enter. Input is case sensitive.

## Point of interest
I had some concern about the app constantly creating more and more timer function, without terminating them, but there was also the issue of needing two autonomous timers to keep track of each bathroom so that one logout wouldn't accidentally terminate the other one. To solve both conflicts, I created seperate timer functions that will instantiate an IIFE, with a closure reference to itself that will 'clearInterval' as soon as the checked out name no longer matches (ie: when there is no student, or a different student name registered as checked out).
