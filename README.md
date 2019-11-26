# PB-Game vulnerability exploitation

[PB-Game.com](http://www.pb-game.com)

## Explanation

This is a platform managed by a group of fraudsters in China. They are trying to impersonate to business people which profit a lot of money in the platform, by trading in the BlockChain market.  
They do it by video chat applications.  
Since they have tried to do it on me, I decided to stop it and find a vulnerability in their platform - in order to extract all the users' information and warn them to avoid from remit money to their bank account.

## Usage

### Fetch Users' data

1. Enter into `script` directory: `cd script`
2. Enter `fetch-users-data.js` file
3. Edit the following vars:  
`start_from_id` - The first ID to start the loop from  
`const stop_on_id` - The last ID to stop the loop on  
`const estimated_max_user_id` - Estimated number of users to prevent unexpected stop of the loop
4. Run on terminal: `node fetch-users-data.js`
5. Finally, a `files` directory will be created with a `users-data.csv` file within it

### Edit Users' data

1. Enter into `script` directory: `cd script`
2. Enter `edit-users.js` file
3. Edit the file's data as desired.
4. Run on terminal: `node edit-users.js`

### Filter emails

This will log all users' email addresses available in users-data.csv file.