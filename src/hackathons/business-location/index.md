---
layout: layout.hbs
---

# Hackathon - Business Locations

You are approached by a business developer to get advice on where to build a
new store in Phoenix, AZ. There are currently six candidates. Use the Yelp
dataset and come up with your own scoring scheme to identify the best location
to recommend.

## Report

[Read the Report](report.html)

## Business Types
As a team, choose one of the following business types to work on:

- A new full-service daycare center
- A new full-service car wash
- A new 24-hours gym
- A new 24-hours diner
- A new swimming pool
- A new organic food store
- A new sushi buffet

## Scoring Method

For this hackathon, you will use a scoring method that is based on a series of
20 Yes/No questions that can be applied to each candidate location. The candidate
location that has the most number of Yes's is the most viable location.

Each Yes/No question generally should take on the form of

  _Does the location have X nearby?_

where X is a feature that you think would be useful for the business to be viable.

Two examples of such questions are:
1. Does the location have _at least one McDonald's within one mile_?
1. Does the location have _at least ten businesses with 100 or more reviews within one mile_?

## Coding

Implement scoring functions and visualize how these candidate locations are
scored. The skeleton code is provided for you in [report.html](report.html).

## Grading

Each person must implement at least two questions to receive credits for this
hackathon.

## Submissions

### Business Type

Our team chose to analyze candidate locations for a new 24-hours diner.

### Contributors

The team members who contributed to this hackathon are:

- (Name)
- (Name)
- (Name)
- (Name)
- (Name)
- (Name)

### 20 Questions

Our team came up with the following relevant questions for a new 24-hours diner

1. Are there other 24 hours diners within 2km?
2. Are there any 24-hour non restaurant businesses within 2km?
3. Any clubs within 2 km?
4. Any bars within 2km?
5. Any music venues within 2km?
6. Any movie theatres within 2km?
7. Are there any 3 star or lower establishments within 2km?
9. Are there any low price (1star) establishments within 2km?
10. Any thrift stores within 2km?
11. Dive bars, but no wine bars within 2km?
12. Hospitals within 2km? 
13. Are there "Colleges & Universities" within 2km? - Denis
14. Hotels within 2km?
15. Any trendy/upscale restaurant within 2lm? - Denis
16. Places that serve alcohol within 2km? - Denis
17. Any laundromats within 2km?
18. Any non casual attire within 2km?
19. Any elementary/high school within 2km?
20. Any nightlife places nearby?


### Conclusion

Our team collectively has implemented (N) scoring functions. Based on
the scores, our team recommends location (1, 2, 3, 4, 5, or 6 from west to east),
because it receives (m) out of (N) possible scores.
