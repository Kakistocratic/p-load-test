---
applyTo: '**'
---

# Project scope

Simple PayloadCMS site for a coffe shop. No ecom but table booking module with email auto reply. 

# Instructions

- Use PayloadCMS best practice.
- Use NextJS best practice.

# Next task

I see that Payload CMS adds my-16 to all blocks as padding between blocks. This for the most part looks great, but some blocks depending on design and placement should have different or no padding. It would be nice for the blocks to have a padding option in the block settings so that I can adjust the padding on a per block basis. A value needs to potentially be a rande of styling to be injected because of breakpoint specific padding needs. So for the default value we can have my-16 and lg:my-18 for larger screens. A dropdown for block margin should abstract these to "None", "Small", "Medium". I dont think larger is needed at the moment.
