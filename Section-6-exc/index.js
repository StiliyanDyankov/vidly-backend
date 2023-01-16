const getUser = (id, callback) => {
    setTimeout(() => {
        console.log("Reading a user from db");
        callback({ id: id, gitHubUsername: "mosh" });
    }, 2000);
};

const getRepositories = (username, callback) => {
    setTimeout(() => {
        console.log(`Fetching repos of ${username}...`);
        callback(["repo1", "repo2", "repo3"]);
    }, 2000);
};

console.log("1");
getUser(1, (user) => {
    console.log('User', user);

    getRepositories(user.gitHubUsername, (repos) => {
        console.log(repos);
    });
});
console.log("2");

