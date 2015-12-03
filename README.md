Google Form Insert Edit Response URLs
=====================================

A google sheet script to collect google form edit response urls.

This script, when bound to a google spreadsheet linked to a google form,
will collect the edit response urls for the form responses.
It will collect the edit response urls from past responses,
as long as those responses are still in the form (not deleted).

The edit response urls will be listed in a new sheet in the spreadsheet.

Installation
------------

* create a google form.
* collect responses in a spreadsheet.
* open spreadsheet.
* open script editor from sheet.
* copy the code of the script and paste it in the script editor.
* save the script under some sensible name.

now either close and reopen the spreadsheet
or run the onOpen() function manually.
it will install a menu item under the addons menu.

the name of the script will be the name of the menu item.

Usage
-----

invoke the menu item or open the script editor
and run the function insertEditResponseUrls() manually.

this will create a new sheet named "Edit Response URLs".
the edit response urls will be in the new sheet.
if the sheet already existed then the previous content is cleared.

note that for the moment there is no update mechanism.
edit response urls from new responses will not be listed.
to list the new edit response urls the script has to be invoked again.

License
-------

Copyright (C) 2015 Lesmana Zimmer <lesmana@gmx.de>

This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.

