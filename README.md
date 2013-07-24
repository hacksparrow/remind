remind
======

**remind** is a distraction-free and straightforward reminder tool specially created for software developers. Instead of using fancy GUI-based reminders, just type in the task to be reminded on the commandline and forget about it. When the time comes, your reminder pops up in the default text editor on your system. How cool is that?

## Installation

    $ [sudo] npm install remind -g

## Usage

    $ remind <time> <task>

**time** is in `NhNmNs` format. Eg: `1h30m`, `30m5s`, `15m`, `10s`, etc.  
**time** can also be in `HH:mmam/pm` format. Eg: `5:25pm`, `6:20am`, etc.  
**task** a description of whatever you would like to remind yourself with.

## Examples

Remind after 1 hours, 30 minutes:

    $ remind 1h30 Get ready to go out
    -------------------------
    Wed Jul 24 2013, 00:30:13
    -------------------------
    Get ready to go out

Remind in 30 minutes:

    $ remind 30m Turn off the stove
    -------------------------
    Wed Jul 24 2013, 00:11:12
    -------------------------
    Turn off the stove

Remind at 11:45am:

    $ remind 11:45am Start testing
    -------------------------
    Wed Jul 24 2013, 11:45:00
    -------------------------
    Start testing

Remind at 5:30pm:

    $ remind 5:30pm Restart the server
    -------------------------
    Wed Jul 24 2013, 17:30:00
    -------------------------
    Restart the server

## Note

1. Edge cases not handled, so don't screw yourself
2. Reminders are stored in the system's temporary directory
3. Best used for short duration reminders

## To-Do

1. Run in the background and handle multiple reminders from a single interface

## Testimony

> "The best reminder system in the history of mankind since the beginning of the Industrial Revolution and the inception of the institution of reminding." - Anonymous

## License (MIT)

Copyright (c) 2013 Hage Yaapa [http://www.hacksparrow.com](http://www.hacksparrow.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.