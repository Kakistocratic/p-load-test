---
applyTo: '**'
---

# Project scope

Simple PayloadCMS site for a coffe shop. No ecom but table booking module with email auto reply. 

# Instructions

- Use PayloadCMS best practice.

# Next task

Booking logic so that the client can define opening hours, max party size, and blackout dates for holidays.
This should be a global config object for all the settings the admin needs. We will get opening hours from the already defined OpeningHours global object. a booking will block availability for that time slot. This timeslot should be adjustable in the global config as well as max party size. The booking form should not allow bookings outside opening hours or on blackout dates.