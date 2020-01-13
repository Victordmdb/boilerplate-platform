/**
 * Function to pre populate some Users and Todos. Not touched by code, but you can
 * manually run this in the console:
 *
 *    $ # In the root directory of the project
 *    $ ./server/scripts/seeddb.ts
 */
import Models from "api/models";

const seedTodos = [
  {
    author: 'vincent',
    name: 'Build some unicorns',
    description: 'Do it!!!@!@!@',
  },
  {
    author: 'vincent',
    name: 'Set up projects',
    description: 'It\'s time to start working',
  },
].map(t => new Models.Asset(t));

seedTodos.forEach(t => t.save((err) => {
  if (err) {
    console.error(err);
  }
}));

const seedUsers = [
  {
    username: 'vincent',
    password: 'password!!',
  },
].map(u => new Models.User(u));

seedUsers.forEach(u => u.save((err) => {
  if (err) {
    console.error(err);
  }
}));
