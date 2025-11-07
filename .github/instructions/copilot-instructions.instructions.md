---
applyTo: '**'
---

# Project scope

Simple PayloadCMS site for a coffe shop. No ecom but table booking module with email auto reply. 

# Previous tasks

I will start simple by adding a simple collection for the opening hours. It should be a general information collection. Not a Page or post or any specific block type. I want to centralize the management of the opening hours to one place and add a page level block later potentially. 

So the collection will need some input fields per row. 

Field 1: Day range (simple text) e.g. Mon-Fri, Sat-Sun
Field 2: Opening time (time picker)
Field 3: Closing time (time picker)
Field 4: Is Closed (checkbox)

These 4 fields are one entry in the opening hours collection.
The collection should allow multiple entries to be created.
 
New collection. This time contact info and social media links. This is also intended to be potentially used more than one place on the site so a general collection makes sense.

Field 1: Phone number (text)
Field 2: Email address (text)
Field 3: Facebook URL (text)
Field 4: Instagram URL (text)
Field 5: Street address (text)
Field 6: City (text)
Field 7: Postal code (text)

# New task

Now its time to try and add the input data to the front-end. First up is the footer output for the opening hours. It seems like the footer is a self contained global. It doesn stack "block builder like" components inside. So we will keep this approach for the global footer. I intend this footer component to be a three column layout. Logo on the left, opening hours in the middle and contact info on the right. Lets start with the opening hours in the middle column. Each opening hour will have a row with a clock icon input via :before styling and then the day range and opening hours text next to it. THe day range should be on its own row within the item row and the opening hours at the bottom of the item row. If the is closed checkbox is ticked for an entry, we should output "Closed" instead of opening and closing time. 