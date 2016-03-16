Collect Google Form Edit Response Links
=======================================

A google sheet script to collect google form edit response links.

This script is meant to be put in a google sheet linked to a google form.
It will collect the edit response links of all form responses.
The collected links will be put in a new sheet in the spreadsheet.

How to install
--------------

* create a google form.
* collect responses in a sheet.
* open sheet.
* open script editor from sheet.
* copy the code of the script and paste it in the script editor.
* save the script under some sensible name.

How to use
----------

* open script editor from sheet.
* run the function insertEditResponseUrls().

This will create a new sheet with the name "Edit Response URLs".
The collected links will be put in that sheet.
If a sheet with that name already exists
then the previous content is cleared.

Notes
-----

The process is a one time process. There is no update mechanism.
To collect the edit links from new responses
the function has to invoked again.

Under certain circumstances the responses in the sheet
can deviate from the responses in the form.
This script only looks at the responses stored in the form.

Todo
----

* collect name and email if field exists in form.
* replace spreadsheet.getFormUrl() with getFormId() if available.

License
-------

Copyright 2015 Lesmana Zimmer <lesmana@gmx.de>

This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.

