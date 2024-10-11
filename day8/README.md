# Thoughts on day 8

Beware, spoilers maybe?!

Part 1 on day 8 was quite straightforward, check the code for details. 

With part 2, it got strange: We are working exactly 6 start poins in parallel.

I chose an ineffeient approach that involves

- Picking the move
- Iterating it through all the "starts"
- matching the result-array (size 6) against a regex to check if it is 6

This approach does not benefit from any patterns, it does not split the input into subsets, and is basically never benefits from any information of previous runs. It is essentially just brute force by iteration.

I tried running part 2 for 24h on my machine with no results. I then startet it on my server, running single threded thus using one core. It has run for 3 days, not yet complete.

After a few more days, i will either consider a more streamlined implementation or the brute force method will have worked.